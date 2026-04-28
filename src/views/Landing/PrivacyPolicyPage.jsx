import { ArrowLeftOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const policySections = [
  {
    title: "1. Introduction",
    paragraphs: [
      "This Privacy Policy sets out how Mazi International (Pty) Ltd (\"Mazi\", \"we\", \"us\", or \"our\") collects, processes, stores, and protects Personal Information in connection with the use of the Mazi Platform.",
      "This Policy is issued in compliance with the Protection of Personal Information Act 4 of 2013 (\"POPIA\") and must be read together with the Mazi Terms of Use.",
    ],
  },
  {
    title: "2. Definitions",
    paragraphs: ["Unless otherwise defined:"],
    bullets: [
      "\"Personal Information\", \"Special Personal Information\", and \"Processing\" bear the meanings assigned under POPIA.",
      "\"User\", \"you\", or \"your\" refers to any person accessing or using the Platform.",
    ],
  },
  {
    title: "3. Collection of Personal Information",
    paragraphs: ["Mazi collects and processes Personal Information as follows:"],
    groups: [
      {
        title: "3.1 Information Provided by the User",
        bullets: [
          "Name, contact details, and delivery addresses.",
          "Account credentials.",
          "Payment information processed via secure third-party providers.",
        ],
      },
      {
        title: "3.2 Automatically Collected Information",
        bullets: [
          "Device and technical information.",
          "Usage data and interaction history.",
          "Location data, where permitted.",
        ],
      },
      {
        title: "3.3 Transactional Information",
        bullets: ["Order history and preferences.", "Delivery instructions."],
      },
    ],
  },
  {
    title: "4. Purpose of Processing",
    paragraphs: ["Personal Information is processed for legitimate business purposes, including:"],
    bullets: [
      "Provision and operation of the Platform.",
      "Order fulfilment, payment processing, and delivery coordination.",
      "Customer support and communication.",
      "Service improvement and analytics.",
      "Fraud prevention and risk management.",
      "Compliance with legal and regulatory obligations.",
    ],
  },
  {
    title: "5. Legal Basis for Processing",
    paragraphs: ["Processing is conducted in accordance with POPIA on the basis that it is:"],
    bullets: [
      "Necessary for the performance of a contract.",
      "Undertaken with the User's consent.",
      "Required to comply with legal obligations.",
      "Justified by legitimate business interests, subject to applicable safeguards.",
    ],
  },
  {
    title: "6. Disclosure of Personal Information",
    paragraphs: [
      "Mazi may disclose Personal Information to:",
      "Personal Information is not sold to third parties.",
    ],
    bullets: [
      "Merchants and delivery partners for order fulfilment.",
      "Payment service providers.",
      "Third-party service providers supporting Platform operations.",
      "Competent authorities where required by law.",
    ],
  },
  {
    title: "7. Cross-Border Transfers",
    paragraphs: [
      "Where Personal Information is transferred outside South Africa, Mazi ensures that appropriate safeguards are implemented in accordance with POPIA.",
    ],
  },
  {
    title: "8. Data Retention",
    paragraphs: ["Personal Information is retained only for as long as necessary to:"],
    bullets: [
      "Fulfil the purposes set out in this Policy.",
      "Comply with legal and regulatory obligations.",
      "Resolve disputes and enforce agreements.",
    ],
  },
  {
    title: "9. Information Security",
    paragraphs: [
      "Mazi implements appropriate technical and organisational measures to protect Personal Information against unauthorised access, loss, or misuse.",
    ],
  },
  {
    title: "10. Data Subject Rights",
    paragraphs: [
      "In accordance with the Protection of Personal Information Act 4 of 2013, Users have the right to:",
    ],
    bullets: [
      "Access their Personal Information.",
      "Request correction or deletion.",
      "Object to processing in certain circumstances.",
      "Withdraw consent where applicable.",
      "Lodge a complaint with the Information Regulator of South Africa.",
    ],
  },
  {
    title: "11. Children's Information",
    paragraphs: [
      "Personal Information relating to minors is processed only with the consent of a parent or legal guardian, in compliance with POPIA.",
    ],
  },
  {
    title: "12. Data Breaches",
    paragraphs: [
      "In the event of a security breach affecting Personal Information, Mazi will comply with its notification obligations under POPIA.",
    ],
  },
  {
    title: "13. Third-Party Services",
    paragraphs: [
      "The Platform may contain links to third-party services. Mazi is not responsible for the privacy practices of such third parties.",
    ],
  },
  {
    title: "14. Amendments",
    paragraphs: [
      "Mazi reserves the right to amend this Policy at any time. Updated versions will be published on the Platform and will take effect upon publication.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="mazi-policy-page">
      <section className="mazi-policy-hero">
        <div className="mazi-wrap">
          <Link to="/landing" className="mazi-policy-back">
            <ArrowLeftOutlined />
            <span>Back to landing page</span>
          </Link>

          <div className="mazi-policy-heading">
            <p className="mazi-policy-kicker">Legal</p>
            <h1>Privacy Policy</h1>
            <p>
              This page reflects the Mazi Platform privacy policy provided by Mazi International
              (Pty) Ltd.
            </p>
          </div>
        </div>
      </section>

      <section className="mazi-policy-body">
        <div className="mazi-wrap mazi-policy-layout">
          <article className="mazi-policy-card">
            <div className="mazi-policy-meta">
              <span>MAZI PLATFORM PRIVACY POLICY</span>
              <span>Effective publication: April 28, 2026</span>
            </div>

            {policySections.map((section) => (
              <section key={section.title} className="mazi-policy-section">
                <h2>{section.title}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}

                {section.groups?.map((group) => (
                  <div key={group.title} className="mazi-policy-group">
                    <h3>{group.title}</h3>
                    <ul>
                      {group.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            ))}
          </article>

          <aside className="mazi-policy-aside">
            <div className="mazi-policy-contact">
              <h2>Contact Details</h2>
              <p>Mazi International (Pty) Ltd</p>
              <p>Registration Number: K2025417073</p>
              <a href="mailto:Support@maziinternational.com">
                <MailOutlined />
                <span>Support@maziinternational.com</span>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
