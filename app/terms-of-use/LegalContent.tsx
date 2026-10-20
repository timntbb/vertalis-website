type Paragraph = { text: string } | { list: string[] };
type LegalSection = { title: string; paragraphs: Paragraph[] };

const definitions: string[] = [
  "\"Vertalis,\" \"we,\" \"us,\" and \"our\" mean Vertalis Legal Counsel, PLLC.",
  "\"Website\" means vertalislegal.com and the pages, forms, content, and features we provide through that domain.",
  "\"You\" and \"your\" mean the individual visiting the Website or communicating with us, including an individual acting for a business or other organization.",
  "\"Personal Information\" means information that identifies, relates to, or can reasonably be linked to an identifiable individual. Business contact information is Personal Information when it identifies an individual.",
  "\"Cookies\" means small files stored on your device when you visit a website. References to Cookies in this Policy also include similar browser-storage technologies.",
  "\"Service Providers\" means third parties that process information to help us operate the Website, communicate with you, schedule consultations, or support our business."
];

const terms: LegalSection[] = [
  {
    "title": "No Legal Advice or Attorney-Client Relationship",
    "paragraphs": [
      {
        "text": "The Website and its articles, guides, calculators, interactive tools, and other materials provide general educational information only. They do not constitute legal advice and are not a substitute for advice from an attorney who has evaluated your circumstances. You should not act or refrain from acting based solely on information obtained through the Website."
      },
      {
        "text": "Visiting or using the Website, seeking advice through it, submitting a question or inquiry, or requesting or scheduling a consultation does not by itself create an attorney-client relationship. Sending information to Vertalis does not mean we have accepted your matter or agreed to take action on your behalf. Any representation must be separately agreed upon and confirmed in an engagement agreement."
      },
      {
        "text": "This section does not limit confidentiality duties or other professional obligations that may apply to communications with prospective clients."
      }
    ]
  },
  {
    "title": "Accuracy and Interactive Tools",
    "paragraphs": [
      {
        "text": "Laws change, vary by jurisdiction, and depend on the facts. Website materials may not reflect current developments. Calculators, examples, and interactive tools rely on limited inputs and assumptions and may omit information relevant to your situation. They do not determine your legal rights, obligations, or deadlines, and results are not guaranteed."
      }
    ]
  },
  {
    "title": "Confidentiality and Initial Inquiries",
    "paragraphs": [
      {
        "text": "Please keep your initial inquiry brief. Do not submit privileged documents, trade secrets, account credentials, Social Security numbers, payment-card details, or other sensitive information through the general inquiry form. If we need sensitive records, contact us about an appropriate way to provide them."
      },
      {
        "text": "We handle prospective-client information in accordance with applicable law and professional obligations, including duties that may arise before a formal engagement. General Website forms and ordinary email should not be treated as secure document-transfer channels."
      }
    ]
  },
  {
    "title": "Permitted Use and Intellectual Property",
    "paragraphs": [
      {
        "text": "Website content, branding, graphics, and original tools belong to Vertalis or their respective owners or licensors. You may view, download, and print content for personal or internal business reference while preserving ownership notices. This permission does not authorize commercial republication, distribution, or use of our branding. Other uses require permission unless allowed by law."
      }
    ]
  },
  {
    "title": "Acceptable Use",
    "paragraphs": [
      {
        "text": "Do not use the Website unlawfully, submit fraudulent information, impersonate another person, introduce malicious code, attempt unauthorized access, or interfere with the Website or other visitors. Do not bulk-extract content, republish it commercially, or use it to train commercial AI models without permission. Ordinary search-engine indexing is permitted, subject to our published technical controls. We may restrict access to address misuse or security threats."
      }
    ]
  },
  {
    "title": "External Services",
    "paragraphs": [
      {
        "text": "Links and third-party features are provided for convenience and do not imply endorsement. External services are governed by their own terms and privacy notices. We do not control their content, availability, or operation."
      }
    ]
  },
  {
    "title": "Website Availability and Liability",
    "paragraphs": [
      {
        "text": "The Website and its materials are provided as available, without warranties of accuracy, completeness, suitability, or uninterrupted or error-free operation, to the extent permitted by law. To the extent permitted by law, Vertalis is not liable for losses arising from use of the Website or reliance on its general information. This provision concerns Website use and does not limit duties or liability arising from an attorney-client relationship or rights that cannot lawfully be excluded."
      }
    ]
  },
  {
    "title": "Jurisdiction and Separate Engagements",
    "paragraphs": [
      {
        "text": "Vertalis provides legal services only where legally authorized. Website access from another jurisdiction does not mean we offer to practice law there. Separate engagement agreements govern any retained legal services. These Website Terms do not amend an engagement agreement."
      }
    ]
  },
  {
    "title": "Updates and Contact",
    "paragraphs": [
      {
        "text": "We may update these Terms by posting a revised version and effective date, with additional notice when required. For questions or permission requests, email tim@vertalislegal.com. The Privacy Policy below explains our information practices."
      }
    ]
  }
];

const privacy: LegalSection[] = [
  {
    "title": "Scope of this Policy",
    "paragraphs": [
      {
        "text": "This Privacy Policy explains how Vertalis collects, uses, discloses, and protects Personal Information when you visit the Website, submit an inquiry, schedule a consultation, or communicate with us about our services."
      },
      {
        "text": "Information provided during a legal engagement is also governed by applicable law, our professional obligations, and the engagement agreement. Nothing in this Policy waives attorney-client privilege or limits duties we owe to clients or prospective clients."
      }
    ]
  },
  {
    "title": "Information We Collect",
    "paragraphs": [
      {
        "text": "Information you provide. We collect your name, email address, and message when you submit the inquiry form. You may also provide your telephone number, company name, company website, general matter type, and other information you choose to include. We collect appointment details when you schedule a consultation and correspondence when you communicate with us. We may request party names and other information needed to evaluate your inquiry or check for conflicts."
      },
      {
        "text": "Information collected automatically. Our hosting, security, and analytics services may collect your IP address, browser and device information, referring website, pages visited, access times, approximate location derived from your IP address, and Website performance and interaction data. The information collected depends on the services and settings in use."
      },
      {
        "text": "Other sources. We may receive information relevant to your inquiry from a person who refers you, your authorized representative, public records, or other sources you identify. Please provide information about other people only when relevant and legally permitted."
      }
    ]
  },
  {
    "title": "How We Use Information",
    "paragraphs": [
      {
        "list": [
          "Respond to inquiries, evaluate whether we can assist, and check for potential conflicts.",
          "Schedule consultations and send confirmations, reminders, and related follow-up communications.",
          "Operate, secure, troubleshoot, and improve the Website and understand how visitors use it.",
          "Manage communications and business records and, if retained, provide and administer legal services.",
          "Prevent fraud, spam, and misuse; comply with legal and professional obligations; and establish or protect legal rights."
        ]
      },
      {
        "text": "Submitting an inquiry does not automatically subscribe you to a newsletter or promotional text-message program. We use inquiry information for follow-up and related service communications. If we introduce a marketing subscription, we will provide appropriate notice and any choices or consent required by law."
      }
    ]
  },
  {
    "title": "Cookies and Analytics",
    "paragraphs": [
      {
        "text": "We use Google Analytics to understand Website traffic and improve content and performance. Google Analytics and other service features may use Cookies or similar technologies. Technical identifiers used for these purposes may be Personal Information. The arcade feature also uses browser storage to remember game progress and scores."
      },
      {
        "text": "You can manage Cookies through your browser settings. Blocking or deleting Cookies may affect scheduling or other features and does not necessarily delete information already collected. Settings may need to be adjusted separately for each browser and device."
      },
      {
        "text": "We do not use advertising pixels or Personal Information for targeted advertising across unrelated websites. Where applicable law requires us to honor a recognized universal opt-out signal, we will do so. Browser Do Not Track settings may not control every technology used on the Website."
      }
    ]
  },
  {
    "title": "When We Share Information",
    "paragraphs": [
      {
        "text": "Service Providers. We share information as needed with providers supporting hosting, security, analytics, inquiry delivery, email, scheduling, calendars, and other business functions. Our use of these providers remains subject to applicable law and professional confidentiality duties. These include Resend for inquiry email delivery and Cal.com for consultation scheduling."
      },
      {
        "text": "Legal and professional purposes. We may disclose information as permitted or required by law, legal process, or professional rules; to protect legal rights or address misuse; or as you direct. Disclosures connected with legal services remain subject to our duties to clients and prospective clients."
      },
      {
        "text": "Firm transitions. Information may be transferred in connection with a lawful transfer or reorganization of the practice, subject to confidentiality duties and any required notice or consent."
      },
      {
        "text": "We do not sell Personal Information, rent contact lists, or share Personal Information for cross-context behavioral advertising."
      }
    ]
  },
  {
    "title": "Scheduling and External Services",
    "paragraphs": [
      {
        "text": "We use Cal.com for consultation scheduling. When you use that feature, Cal.com and connected calendar or communication services may process appointment information and relevant technical data. Cal.com's privacy notice is available at https://cal.com/privacy."
      },
      {
        "text": "The Website may link to or include features from other services. Their privacy notices govern information they collect through their services. A provider may receive technical information when an embedded feature loads or when you interact with it."
      }
    ]
  },
  {
    "title": "Initial Inquiries and Confidentiality",
    "paragraphs": [
      {
        "text": "Please keep your initial inquiry brief. Do not submit privileged documents, trade secrets, account credentials, Social Security numbers, payment-card details, or other sensitive information through the general inquiry form. If we need sensitive records, contact us about an appropriate way to provide them."
      },
      {
        "text": "We handle prospective-client information in accordance with applicable law and professional obligations, including duties that may arise before a formal engagement. General Website forms and ordinary email should not be treated as secure document-transfer channels."
      }
    ]
  },
  {
    "title": "Technology Assisted Tools",
    "paragraphs": [
      {
        "text": "We may use technology-assisted tools, including artificial intelligence, to support research, drafting, document review, and administration. Their use remains subject to professional judgment, attorney oversight, confidentiality duties, and applicable law."
      },
      {
        "text": "This Policy does not provide blanket consent to disclose confidential information to a public AI service or allow its use to train a general-purpose model. Any required notice or consent concerning a particular engagement is addressed separately."
      }
    ]
  },
  {
    "title": "Retention and Security",
    "paragraphs": [
      {
        "text": "We retain Personal Information for as long as reasonably needed for the purposes described in this Policy, considering the status of an inquiry or engagement, conflict-check needs, legal holds, and legal, accounting, and professional recordkeeping obligations. Different types of records may have different retention periods. Backup copies may remain until removed through ordinary retention cycles."
      },
      {
        "text": "We use reasonable safeguards appropriate to the information we handle. No website, email service, or transmission method is completely secure. We will provide any notices required by law if a security incident occurs."
      }
    ]
  },
  {
    "title": "Your Choices and Privacy Requests",
    "paragraphs": [
      {
        "text": "You may ask us to stop following up on an inquiry or request access to, correction of, or deletion of your Personal Information. Depending on your residence and whether a privacy law applies, you may also have rights to a portable copy, to opt out of certain processing, or to appeal a decision. Where processing relies on consent, you may withdraw that consent for future processing, subject to lawful retention and other applicable grounds for processing."
      },
      {
        "text": "Email tim@vertalislegal.com with the subject \"Privacy Request,\" or submit a message marked \"Privacy Request\" through https://vertalislegal.com/consultation. Describe your request without including sensitive identification documents. We may need to verify your identity or an agent's authority."
      },
      {
        "text": "We respond within the time required by applicable law. If the Texas Data Privacy and Security Act governs your request, its response period is generally 45 days, with a permitted additional 45-day extension and timely notice. You may appeal a denial by emailing us with the subject \"Privacy Appeal.\" Appeals governed by that Act receive a written response within 60 days. If an appeal is denied, you may complain to the Texas Attorney General at https://www.texasattorneygeneral.gov/consumer-protection/file-consumer-complaint."
      },
      {
        "text": "Requests may be limited by legal and professional obligations, privilege, other people's rights, and lawful retention needs. We do not unlawfully discriminate against people for exercising applicable privacy rights. We do not make solely automated decisions that produce legal or similarly significant effects about you."
      }
    ]
  },
  {
    "title": "Children and International Visitors",
    "paragraphs": [
      {
        "text": "The Website is intended for adults and is not directed to children under 13. We do not knowingly collect their Personal Information through the Website. Contact us if you believe a child has submitted information so we can investigate and take appropriate action."
      },
      {
        "text": "Vertalis is based in the United States. Information may be processed here or where our Service Providers operate. Where applicable law requires safeguards for an international transfer, we use the safeguards required for that transfer."
      }
    ]
  },
  {
    "title": "Changes to this Policy",
    "paragraphs": [
      {
        "text": "We may update this Policy as our practices, the Website, or legal requirements change. We will post the revised Policy with an updated effective date and provide additional notice or obtain consent when required by law."
      }
    ]
  },
  {
    "title": "Contact Us",
    "paragraphs": [
      {
        "text": "Vertalis Legal Counsel, PLLC Email: tim@vertalislegal.com Contact form: https://vertalislegal.com/consultation"
      },
      {
        "text": "Contact us with privacy questions, concerns, or requests for this Policy in an accessible format."
      }
    ]
  }
];

function Sections({ sections }: { sections: LegalSection[] }) {
  return sections.map((section) => (
    <section key={section.title} className="mt-8">
      <h3 className="text-xl font-semibold tracking-tight text-white">{section.title}</h3>
      {section.paragraphs.map((paragraph, index) =>
        "text" in paragraph ? <p key={index}>{paragraph.text}</p> : (
          <ul key={index} className="mt-5 list-disc space-y-2 pl-6">
            {paragraph.list.map((item) => <li key={item}>{item}</li>)}
          </ul>
        )
      )}
    </section>
  ));
}

export default function LegalContent() {
  return (
    <>
      <p>These Terms of Use govern your access to and use of the Website. The Privacy Policy explains how we handle Personal Information. Please review both before using the Website or submitting an inquiry.</p>
      <nav aria-label="Legal page sections" className="mt-6 flex flex-wrap gap-3">
        <a href="#defined-terms" className="rounded-full border border-white/20 px-4 py-2 text-sm text-white hover:border-[#d77938] focus-visible:outline-2 focus-visible:outline-[#d77938]">Defined Terms</a>
        <a href="#terms-of-use" className="rounded-full border border-white/20 px-4 py-2 text-sm text-white hover:border-[#d77938] focus-visible:outline-2 focus-visible:outline-[#d77938]">Terms of Use</a>
        <a href="#privacy-policy" className="rounded-full border border-white/20 px-4 py-2 text-sm text-white hover:border-[#d77938] focus-visible:outline-2 focus-visible:outline-[#d77938]">Privacy Policy</a>
      </nav>
      <section id="defined-terms" className="scroll-mt-32">
        <h2>Defined Terms</h2>
        {definitions.map((definition) => <p key={definition}>{definition}</p>)}
      </section>
      <section id="terms-of-use" className="scroll-mt-32">
        <h2>Terms of Use</h2>
        <Sections sections={terms} />
      </section>
      <section id="privacy-policy" className="scroll-mt-32">
        <h2>Privacy Policy</h2>
        <Sections sections={privacy} />
        <p>For more information about Google's practices, visit <a href="https://policies.google.com/privacy" className="text-[#e8a16c] underline underline-offset-4">Google's Privacy Policy</a>. Google also provides a <a href="https://tools.google.com/dlpage/gaoptout" className="text-[#e8a16c] underline underline-offset-4">Google Analytics opt-out browser add-on</a>.</p>
      </section>
    </>
  );
}
