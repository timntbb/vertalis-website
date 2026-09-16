import { NextResponse } from "next/server";
import { Resend } from "resend";

const DEFAULT_FROM_EMAIL = "Vertalis <onboarding@resend.dev>";
const DEFAULT_TO_EMAIL = "tim@vertalislegal.com";

type SignupPayload = { email?: string; website?: string };

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SignupPayload;
    const email = body.email?.trim() || "";

    if (body.website?.trim()) return NextResponse.json({ success: true });
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO_EMAIL],
      replyTo: email,
      subject: "New Vertalis Insights Signup",
      text: `A visitor requested Vertalis updates.\n\nEmail: ${email}`,
    });

    if (error) {
      console.error("Insights signup email failed", { error: error.message });
      return NextResponse.json({ error: "Email failed to send." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
