/* eslint-disable react/prop-types */
import {
  ArrowLeftOutlined,
  FileTextOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const policyLinks = [
  ["Terms and Conditions", "/terms-and-conditions"],
  ["Privacy Policy", "/privacy-policy"],
  ["Refund Policy", "/refund-policy"],
  ["Shipping Policy", "/shipping-policy"],
  ["Delivery Policy", "/delivery-policy"],
  ["Cancellation Policy", "/cancellation-policy"],
];

export default function PolicyPage({ policy }) {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
            <h1>{policy.title}</h1>
            <p>{policy.summary}</p>
          </div>

          <div className="mazi-policy-summary" aria-label={`${policy.title} summary`}>
            <div className="mazi-policy-summary-card">
              <span className="mazi-policy-summary-label">Document</span>
              <strong>{policy.title}</strong>
            </div>
            <div className="mazi-policy-summary-card">
              <span className="mazi-policy-summary-label">Effective</span>
              <strong>October 15, 2026</strong>
            </div>
            <div className="mazi-policy-summary-card">
              <span className="mazi-policy-summary-label">Jurisdiction</span>
              <strong>South Africa</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="mazi-policy-body">
        <div className="mazi-wrap mazi-policy-layout">
          <article className="mazi-policy-card">
            <div className="mazi-policy-meta">
              <span><FileTextOutlined /> <span>{policy.title.toUpperCase()}</span></span>
              <span>Company: Mazi International (Pty) Ltd</span>
              <span>Registration Number: K2025417073</span>
            </div>

            <div className="mazi-policy-intro">
              <p>{policy.introduction}</p>
            </div>

            {policy.sections.map((section) => (
              <section key={section.id} id={section.id} className="mazi-policy-section">
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? (
                  <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                ) : null}
                {section.steps ? (
                  <ol>{section.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                ) : null}
              </section>
            ))}
          </article>

          <aside className="mazi-policy-aside">
            <div className="mazi-policy-contact">
              <div className="mazi-policy-sideblock">
                <h2>On This Page</h2>
                <nav aria-label={`${policy.title} section navigation`}>
                  <ul className="mazi-policy-toc">
                    {policy.sections.map((section) => (
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
                <h2>All Policies</h2>
                <nav aria-label="All legal policies">
                  <ul className="mazi-policy-toc">
                    {policyLinks.map(([label, path]) => (
                      <li key={path}><Link to={path}>{label}</Link></li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="mazi-policy-sideblock">
                <h2>Customer Support</h2>
                <p><SafetyCertificateOutlined /> Include your order number for order-related requests.</p>
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
