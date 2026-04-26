import { useState } from "react";
import {
  ThunderboltOutlined,
  ShopOutlined,
  RadarChartOutlined,
  RiseOutlined,
  TeamOutlined,
  BarChartOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CheckCircleFilled,
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
    text: "Get your food and groceries delivered quickly to your doorstep.",
  },
  {
    icon: <ShopOutlined />,
    title: "All-in-One Platform",
    text: "Order from restaurants and grocery stores in one place.",
  },
  {
    icon: <RadarChartOutlined />,
    title: "Easy Ordering",
    text: "Simple and smooth user experience for quick checkout.",
  },
  {
    icon: <ShopOutlined />,
    title: "Vendor Opportunities",
    text: "Grow your business by joining as a vendor.",
  },
  {
    icon: <EnvironmentOutlined />,
    title: "Real-Time Tracking",
    text: "Track your orders from preparation to delivery.",
  },
  {
    icon: <ClockCircleOutlined />,
    title: "Convenience First",
    text: "Built to save time and reduce stress.",
  },
];

const reviews = [
  {
    quote:
      '"Mazi has completely changed how I shop for groceries. The delivery is always on time and the products are fresh."',
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
      '"As someone with a hectic schedule, Mazi is a lifesaver. Fast delivery, great selection, and excellent service."',
    name: "Emma Williams",
    role: "Busy Professional",
  },
];

const faqs = [
  {
    q: "How does Mazi work?",
    a: "Simply download the Mazi app, browse restaurants and grocery stores in your area, add items to your cart, and checkout.",
  },
  {
    q: "How fast is delivery?",
    a: "Most orders arrive within 30–45 minutes depending on your location and the merchant.",
  },
  {
    q: "Can I track my order?",
    a: "Yes. Once confirmed, you can track your order in real time from preparation to delivery.",
  },
  {
    q: "How do I become a vendor?",
    a: "Click ‘Register as Vendor’, submit your business details, and our team reviews your application in 2–3 business days.",
  },
  {
    q: "Is the app free?",
    a: "Yes, downloading and using Mazi is free. You only pay for your orders and any delivery fee.",
  },
];

export default function LandingPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mazi-landing">
      <section className="mazi-hero">
        <div className="mazi-wrap">
          <h1>Mazi</h1>
          <p className="mazi-subtitle">Your one-stop shop for your food and groceries</p>
          <div className="mazi-store-row">
            <button className="mazi-store-btn">Download on iOS</button>
            <button className="mazi-store-btn">Get it on Google Play</button>
          </div>
          <span className="mazi-vendor-link">Become a Vendor →</span>
        </div>
      </section>

      <section className="mazi-section">
        <div className="mazi-wrap">
          <div className="mazi-heading">
            <h2>Partner with Mazi</h2>
            <p>
              Join our growing network of restaurants and grocery stores. Expand your reach and
              serve more customers with our seamless delivery platform.
            </p>
          </div>
          <div className="mazi-grid-3">
            {partnerItems.map((item) => (
              <div className="mazi-pill" key={item.text}>
                {item.icon} {item.text}
              </div>
            ))}
          </div>
          <div className="mazi-register">
            <button>Register as Vendor</button>
          </div>
        </div>
      </section>

      <section className="mazi-section mazi-section-alt">
        <div className="mazi-wrap">
          <div className="mazi-heading">
            <h2>Why Choose Mazi</h2>
            <p>Experience convenience and quality with every order</p>
          </div>
          <div className="mazi-grid-3">
            {whyItems.map((item) => (
              <article key={item.title} className="mazi-card">
                <div className="mazi-card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mazi-section mazi-section-alt">
        <div className="mazi-wrap mazi-about">
          <article className="mazi-about-copy">
            <h3>About Mazi</h3>
            <p>
              Mazi was created to make your life easier. We bring the best restaurants and grocery
              stores in your area together with fast delivery and a smooth ordering experience.
            </p>
          </article>
          <div className="mazi-about-visual">
            <div>
              <CheckCircleFilled style={{ fontSize: 72 }} />
              <div>Fresh. Fast. Convenient.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mazi-section mazi-section-alt mazi-reviews">
        <div className="mazi-wrap">
          <div className="mazi-heading">
            <h2>What Our Users Say</h2>
            <p>Join thousands of happy customers</p>
          </div>
          <div className="mazi-grid-3">
            {reviews.map((item) => (
              <article key={item.name} className="mazi-card">
                <div className="mazi-stars">★★★★★</div>
                <p>{item.quote}</p>
                <div className="mazi-review-name">{item.name}</div>
                <div className="mazi-review-role">{item.role}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mazi-section">
        <div className="mazi-wrap">
          <div className="mazi-heading">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about Mazi</p>
          </div>
          <div className="mazi-faq-list">
            {faqs.map((item, index) => {
              const open = openIndex === index;
              return (
                <div className="mazi-faq" key={item.q}>
                  <button onClick={() => setOpenIndex(open ? -1 : index)}>{item.q}</button>
                  {open ? <p>{item.a}</p> : null}
                </div>
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
            <button className="mazi-store-btn-light">Download on iOS</button>
            <button className="mazi-store-btn-light">Get it on Google Play</button>
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
              <h4>Quick Links</h4>
              <ul>
                <li>Home</li>
                <li>Features</li>
                <li>Become a Vendor</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4>Support</h4>
              <ul>
                <li>FAQ</li>
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4>Follow Us</h4>
              <p>Facebook · Twitter · Instagram · LinkedIn</p>
            </div>
          </div>
          <div className="mazi-footer-line">© 2026 Mazi. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
