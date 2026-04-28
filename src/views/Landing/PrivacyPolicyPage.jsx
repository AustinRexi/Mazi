import {
  ArrowLeftOutlined,
  FileTextOutlined,
  GlobalOutlined,
  LockOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const policySections = [
  {
    id: "introduction",
    title: "1. Introduction",
    paragraphs: [
      "This Privacy Policy sets out how Mazi International (Pty) Ltd (\"Mazi\", \"we\", \"us\", or \"our\") collects, processes, stores, and protects Personal Information in connection with the use of the Mazi Platform.",
      "This Policy is issued in compliance with the Protection of Personal Information Act 4 of 2013 (\"POPIA\") and must be read together with the Mazi Terms of Use.",
    ],
  },
  {
    id: "definitions",
    title: "2. Definitions",
    paragraphs: ["Unless otherwise defined:"],
    bullets: [
      "\"Personal Information\", \"Special Personal Information\", and \"Processing\" bear the meanings assigned under POPIA.",
      "\"User\", \"you\", or \"your\" refers to any person accessing or using the Platform.",
    ],
  },
  {
    id: "collection",
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
    id: "purpose",
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
    id: "legal-basis",
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
    id: "disclosure",
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
    id: "cross-border-transfers",
    title: "7. Cross-Border Transfers",
    paragraphs: [
      "Where Personal Information is transferred outside South Africa, Mazi ensures that appropriate safeguards are implemented in accordance with POPIA.",
    ],
  },
  {
    id: "retention",
    title: "8. Data Retention",
    paragraphs: ["Personal Information is retained only for as long as necessary to:"],
    bullets: [
      "Fulfil the purposes set out in this Policy.",
      "Comply with legal and regulatory obligations.",
      "Resolve disputes and enforce agreements.",
    ],
  },
  {
    id: "security",
    title: "9. Information Security",
    paragraphs: [
      "Mazi implements appropriate technical and organisational measures to protect Personal Information against unauthorised access, loss, or misuse.",
    ],
  },
  {
    id: "data-subject-rights",
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
    id: "children-information",
    title: "11. Children's Information",
    paragraphs: [
      "Personal Information relating to minors is processed only with the consent of a parent or legal guardian, in compliance with POPIA.",
    ],
  },
  {
    id: "data-breaches",
    title: "12. Data Breaches",
    paragraphs: [
      "In the event of a security breach affecting Personal Information, Mazi will comply with its notification obligations under POPIA.",
    ],
  },
  {
    id: "third-party-services",
    title: "13. Third-Party Services",
    paragraphs: [
      "The Platform may contain links to third-party services. Mazi is not responsible for the privacy practices of such third parties.",
    ],
  },
  {
    id: "amendments",
    title: "14. Amendments",
    paragraphs: [
      "Mazi reserves the right to amend this Policy at any time. Updated versions will be published on the Platform and will take effect upon publication.",
    ],
  },
];

const highlights = [
  {
    icon: <LockOutlined />,
    title: "Protected Data Handling",
    text: "Personal information is collected, processed, and stored with technical and organisational safeguards.",
  },
  {
    icon: <SafetyCertificateOutlined />,
    title: "POPIA Compliance",
    text: "This policy is framed around the Protection of Personal Information Act 4 of 2013.",
  },
  {
    icon: <GlobalOutlined />,
    title: "Cross-Border Safeguards",
    text: "Transfers outside South Africa are subject to appropriate protections under applicable law.",
  },
];

export default function PrivacyPolicyPage() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
              Mazi International (Pty) Ltd explains here how personal information is
              collected, used, disclosed, protected, and retained when users access the Mazi
              Platform.
            </p>
          </div>

          <div className="mazi-policy-summary" aria-label="Privacy policy highlights">
            <div className="mazi-policy-summary-card">
              <span className="mazi-policy-summary-label">Document</span>
              <strong>MAZI Platform Privacy Policy</strong>
            </div>
            <div className="mazi-policy-summary-card">
              <span className="mazi-policy-summary-label">Published</span>
              <strong>April 28, 2026</strong>
            </div>
            <div className="mazi-policy-summary-card">
              <span className="mazi-policy-summary-label">Jurisdiction</span>
              <strong>South Africa / POPIA</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="mazi-policy-body">
        <div className="mazi-wrap mazi-policy-layout">
          <article className="mazi-policy-card">
            <div className="mazi-policy-meta">
              <span>
                <FileTextOutlined />
                <span>MAZI PLATFORM PRIVACY POLICY</span>
              </span>
              <span>Effective publication: April 28, 2026</span>
              <span>Company: Mazi International (Pty) Ltd</span>
            </div>

            <div className="mazi-policy-intro">
              <p>
                This page presents the privacy policy content provided by Mazi in a web-ready
                format for public access from the landing page.
              </p>
            </div>

            {policySections.map((section) => (
              <section key={section.id} id={section.id} className="mazi-policy-section">
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
              <div className="mazi-policy-sideblock">
                <h2>On This Page</h2>
                <nav aria-label="Privacy policy section navigation">
                  <ul className="mazi-policy-toc">
                    {policySections.map((section) => (
                      <li key={section.id}>
                        <button
                          type="button"
                          className="mazi-policy-toc-link"
                          onClick={() => scrollToSection(section.id)}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="mazi-policy-sideblock">
                <h2>Key Principles</h2>
                <div className="mazi-policy-highlight-list">
                  {highlights.map((item) => (
                    <div key={item.title} className="mazi-policy-highlight-item">
                      <span className="mazi-policy-highlight-icon">{item.icon}</span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mazi-policy-sideblock">
                <h2>Contact Details</h2>
                <p>Mazi International (Pty) Ltd</p>
                <p>Registration Number: K2025417073</p>
                <a href="mailto:Support@maziinternational.com">
                  <MailOutlined />
                  <span>Support@maziinternational.com</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
