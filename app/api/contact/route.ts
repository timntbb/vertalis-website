import { NextResponse } from "next/server";
import { Resend } from "resend";

const DEFAULT_FROM_EMAIL = "Vertalis <onboarding@resend.dev>";
const DEFAULT_TO_EMAIL = "tim@vertalislegal.com";

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  return {
    resend: new Resend(apiKey),
    from:
      process.env.RESEND_FROM_EMAIL?.trim() ||
      DEFAULT_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO_EMAIL,
  };
}

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const company = body.company?.trim() || "";
    const message = body.message?.trim() || "";
    const website = body.website?.trim() || "";

    // Honeypot check (bots will fill this)
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailConfig = getEmailConfig();

    if (!emailConfig) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const { error } = await emailConfig.resend.emails.send({
      from: emailConfig.from,
      to: [emailConfig.to],
      replyTo: email,
      subject: `New Vertalis inquiry from ${name}`,
      text: `New Vertalis inquiry

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}

Message:
${message}`,
    });

    if (error) {
      const errorMessage =
        typeof error.message === "string" && error.message.trim()
          ? error.message
          : "Email failed to send.";

      console.error("Resend email send failed", {
        error: errorMessage,
      });

      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}