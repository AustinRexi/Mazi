import { useState } from "react";
import {
  AppleOutlined,
  AndroidOutlined,
  ThunderboltOutlined,
  ShopOutlined,
  AimOutlined,
  RiseOutlined,
  TeamOutlined,
  BarChartOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  UpOutlined,
  FacebookFilled,
  TwitterCircleFilled,
  InstagramFilled,
  LinkedinFilled,
} from "@ant-design/icons";
import "./LandingPage.css";

const partnerItems = [
  { icon: <RiseOutlined />, text: "Grow your customer base" },
  { icon: <TeamOutlined />, text: "Reach thousands of users" },
  { icon: <BarChartOutlined />, text: "Increase your revenue" },
];

const whyItems = [
  {
    icon: <ThunderboltOutlined />,
    title: "Fast Delivery",
    text: "Get your food and groceries delivered quickly to your doorstep",
  },
  {
    icon: <ShopOutlined />,
    title: "All-in-One Platform",
    text: "Order from restaurants and grocery stores in one place",
  },
  {
    icon: <AimOutlined />,
    title: "Easy Ordering",
    text: "Simple and smooth user experience for quick checkout",
  },
  {
    icon: <ShopOutlined />,
    title: "Vendor Opportunities",
    text: "Grow your business by joining as a vendor",
  },
  {
    icon: <EnvironmentOutlined />,
    title: "Real-Time Tracking",
    text: "Track your orders from preparation to delivery",
  },
  {
    icon: <ClockCircleOutlined />,
    title: "Convenience First",
    text: "Built to save time and reduce stress",
  },
];

const reviews = [
  {
    quote:
      '"Mazi has completely changed how I shop for groceries. The delivery is always on time and the products are fresh. I save so much time now!"',
    name: "Sarah Johnson",
    role: "Regular Customer",
  },
  {
    quote:
      '"I love that I can order from my favorite restaurants and get groceries in the same app. The interface is clean and super easy to use."',
    name: "Michael Chen",
    role: "Food Enthusiast",
  },
  {
    quote:
      '"As someone with a hectic schedule, Mazi is a lifesaver. Fast delivery, great selection, and excellent customer service. Highly recommend!"',
    name: "Emma Williams",
    role: "Busy Professional",
  },
];

const faqs = [
  {
    q: "How does Mazi work?",
    a: "Simply download the Mazi app, browse restaurants and grocery stores in your area, add items to your cart, and checkout. Our delivery partners will bring your order right to your doorstep.",
  },
  {
    q: "How fast is delivery?",
    a: "Delivery times vary depending on your location and the merchant, but most orders arrive within 30-45 minutes. You can track your order in real-time through the app.",
  },
  {
    q: "Can I track my order?",
    a: "Yes! Once your order is confirmed, you can track it in real-time from preparation to delivery. You'll receive notifications at each stage of the process.",
  },
  {
    q: "How do I become a vendor?",
    a: "Click the 'Register as Vendor' button on our website or app. Fill out the application form with your business details, and our team will review your application within 2-3 business days.",
  },
  {
    q: "Is the app free?",
    a: "Yes, downloading and using the Mazi app is completely free. You only pay for your orders, and delivery fees may apply depending on the merchant and your location.",
  },
];

function StoreButton({ platform, light = false }) {
  const isIos = platform === "iOS";

  return (
    <button className={`mazi-store-btn ${light ? "mazi-store-btn-light" : ""}`}>
      <span className="mazi-store-icon">{isIos ? <AppleOutlined /> : <AndroidOutlined />}</span>
      <span>
        <small>{isIos ? "Download on" : "Get it on"}</small>
        <strong>{isIos ? "iOS" : "Google Play"}</strong>
      </span>
    </button>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <header className="mazi-heading">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </header>
  );
}

export default function LandingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <div className="mazi-landing">
      <section className="mazi-hero">
        <div className="mazi-wrap">
          <h1>Mazi</h1>
          <p className="mazi-subtitle">Your one-stop shop for your food and groceries</p>

          <div className="mazi-store-row">
            <StoreButton platform="iOS" />
            <StoreButton platform="Android" />
          </div>

          <span className="mazi-vendor-link">Become a Vendor →</span>
        </div>
      </section>

      <section className="mazi-section">
        <div className="mazi-wrap">
          <SectionTitle
            title="Partner with Mazi"
            subtitle="Join our growing network of restaurants and grocery stores. Expand your reach and serve more customers with our seamless delivery platform."
          />

          <div className="mazi-partner-row">
            {partnerItems.map((item) => (
              <div className="mazi-pill" key={item.text}>
                <span className="mazi-pill-icon">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <div className="mazi-register-wrap">
            <button type="button" className="mazi-register-btn">
              Register as Vendor
            </button>
          </div>
        </div>
      </section>

      <section className="mazi-section">
        <div className="mazi-wrap">
          <SectionTitle
            title="Why Choose Mazi"
            subtitle="Experience convenience and quality with every order"
          />

          <div className="mazi-grid-3">
            {whyItems.map((item) => (
              <article className="mazi-feature-card" key={item.title}>
                <span className="mazi-feature-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mazi-section mazi-about-section">
        <div className="mazi-wrap mazi-about">
          <article className="mazi-about-copy">
            <h3>About Mazi</h3>
            <p>
              Mazi was created to make your life easier. We understand that your time is valuable,
              and getting quality food and groceries should not be a hassle.
            </p>
            <p>
              Our platform brings together the best restaurants and grocery stores in your area,
              offering fast delivery, transparent pricing, and an exceptional user experience.
              Whether you are craving a meal or stocking up your pantry, Mazi has you covered.
            </p>
          </article>

          <div className="mazi-about-visual">
            <ShoppingCartOutlined />
            <span>Fresh. Fast. Convenient.</span>
          </div>
        </div>
      </section>

      <section className="mazi-section mazi-review-section">
        <div className="mazi-wrap">
          <SectionTitle
            title="What Our Users Say"
            subtitle="Join thousands of happy customers"
          />

          <div className="mazi-grid-3">
            {reviews.map((item) => (
              <article key={item.name} className="mazi-review-card">
                <div className="mazi-stars">★★★★★</div>
                <p>{item.quote}</p>
                <hr />
                <h4>{item.name}</h4>
                <span>{item.role}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mazi-section">
        <div className="mazi-wrap">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about Mazi"
          />

          <div className="mazi-faq-list">
            {faqs.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <article key={item.q} className="mazi-faq-item">
                  <button
                    type="button"
                    className="mazi-faq-trigger"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                  >
                    <span>{item.q}</span>
                    {isOpen ? <UpOutlined /> : <DownOutlined />}
                  </button>
                  {isOpen ? <p className="mazi-faq-content">{item.a}</p> : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mazi-cta">
        <div className="mazi-wrap">
          <h3>
            Start ordering smarter with Mazi
            <br />
            today
          </h3>
          <p>Join thousands of users enjoying fast, convenient delivery</p>
          <div className="mazi-store-row">
            <StoreButton platform="iOS" light />
            <StoreButton platform="Android" light />
          </div>
        </div>
      </section>

      <footer className="mazi-footer">
        <div className="mazi-wrap">
          <div className="mazi-footer-grid">
            <div>
              <h4>Mazi</h4>
              <p>Your one-stop shop for food and groceries</p>
            </div>

            <div>
              <h5>Quick Links</h5>
              <ul>
                <li>Home</li>
                <li>Features</li>
                <li>Become a Vendor</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h5>Support</h5>
              <ul>
                <li>FAQ</li>
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>

            <div>
              <h5>Follow Us</h5>
              <div className="mazi-socials">
                <span>
                  <FacebookFilled />
                </span>
                <span>
                  <TwitterCircleFilled />
                </span>
                <span>
                  <InstagramFilled />
                </span>
                <span>
                  <LinkedinFilled />
                </span>
              </div>
            </div>
          </div>

          <div className="mazi-footer-bottom">© 2026 Mazi. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
