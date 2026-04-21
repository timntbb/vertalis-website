import type { Metadata } from "next";
import { Header } from "../page";

export const metadata: Metadata = {
  title: "Terms of Use | Vertalis Legal Counsel",
  description:
    "Terms of Use for Vertalis Legal Counsel, PLLC website, tools, and content.",
};

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />

      <section className="px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2.1rem] border border-white/10 bg-[linear-gradient(170deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] shadow-[0_28px_90px_-56px_rgba(0,0,0,0.9)]">
            <div className="px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
              <div className="max-w-[780px]">
                <p className="inline-flex rounded-full border border-[#c06020]/25 bg-[#c06020]/10 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#d87a3b]">
                  Vertalis Legal
                </p>

                <h1 className="mt-6 text-[clamp(2.6rem,5vw,4.2rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-white">
                  Terms of Use
                </h1>

                <p className="mt-5 text-sm leading-7 text-neutral-400 md:text-base">
                  Effective Date: [Insert Date]
                </p>
              </div>

              <article className="mt-10 max-w-[780px] text-left text-[1.02rem] leading-[1.9] text-neutral-300 [&_h2]:mb-4 [&_h2]:mt-14 [&_h2]:border-t [&_h2]:border-white/10 [&_h2]:pt-8 [&_h2]:text-[1.95rem] [&_h2]:font-bold [&_h2]:tracking-[-0.035em] [&_h2]:text-white [&_h2:first-of-type]:mt-12 [&_h2:first-of-type]:border-t-0 [&_h2:first-of-type]:pt-0 [&_p]:mt-5 [&_p]:leading-[1.9]">
                <p>
                  Welcome to Vertalis Legal Counsel, PLLC. By accessing or using
                  this website, including its articles, insights, contact forms,
                  calculators, and other tools, you agree to these Terms of Use.
                  If you do not agree, you should not use this website.
                </p>

                <h2>No Attorney-Client Relationship</h2>
                <p>
                  Use of this website does not create an attorney-client
                  relationship between you and Vertalis Legal Counsel, PLLC.
                </p>
                <p>
                  No attorney-client relationship is formed unless and until
                  Vertalis Legal Counsel, PLLC expressly agrees in writing to
                  represent you through a signed engagement agreement.
                  Contacting the firm through this website, submitting a form,
                  sending an email, or using any calculator, tool, or
                  interactive feature does not create an attorney-client
                  relationship.
                </p>

                <h2>Educational Purposes Only</h2>
                <p>
                  All content on this website is provided for general educational
                  and informational purposes only.
                </p>
                <p>
                  This includes, without limitation, articles, insights,
                  commentary, legal discussions, business discussions,
                  calculators, simulations, and other materials. Nothing on this
                  website is legal advice, tax advice, financial advice, or a
                  substitute for advice from a qualified attorney who
                  understands your specific facts and circumstances.
                </p>
                <p>
                  You should not act, or refrain from acting, based on
                  information found on this website without first consulting an
                  attorney.
                </p>

                <h2>No Reliance</h2>
                <p>
                  The content on this website may not reflect the most current
                  legal, regulatory, or business developments. Laws vary by
                  jurisdiction, and outcomes depend on specific facts. Any
                  reliance on the content of this website is solely at your own
                  risk.
                </p>

                <h2>No Confidential Information</h2>
                <p>
                  You should not send confidential, sensitive, or privileged
                  information through this website, including through any contact
                  form or general inquiry submission.
                </p>
                <p>
                  Information sent to Vertalis Legal Counsel, PLLC through this
                  website will not be treated as confidential unless and until an
                  attorney-client relationship has been formally established
                  through a signed engagement agreement.
                </p>

                <h2>Third-Party Content and Tools</h2>
                <p>
                  This website may reference or incorporate third-party content,
                  software, links, or tools. Vertalis Legal Counsel, PLLC does
                  not control and is not responsible for the content, accuracy,
                  availability, or performance of any third-party resource.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Vertalis Legal Counsel,
                  PLLC disclaims liability for any loss or damage arising out of
                  or related to the use of this website or reliance on any
                  content provided on this website.
                </p>

                <h2>Intellectual Property</h2>
                <p>
                  All content on this website, including text, branding,
                  graphics, design, and original tools, is the property of
                  Vertalis Legal Counsel, PLLC unless otherwise stated. It may
                  not be copied, reproduced, distributed, or used without prior
                  written permission.
                </p>

                <h2>Changes to These Terms</h2>
                <p>
                  Vertalis Legal Counsel, PLLC may update these Terms of Use at
                  any time without notice. Your continued use of the website
                  after any changes are posted constitutes your acceptance of
                  the revised Terms.
                </p>

                <h2>Contact</h2>
                <p>
                  If you have questions about these Terms of Use, please contact
                  Vertalis Legal Counsel, PLLC through the contact information
                  provided on this website.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
