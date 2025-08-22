// app/privacy-policy/page.jsx
"use client";
import "./privacy.css";

import Footer from "../components/footer/page";
import Header from "../components/header/page";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>

        <section className="privacy-section">
          <h2>Collection of Personal Information</h2>
          <p>
            We may collect personal information, including but not limited to
            your name, email address, and location when you subscribe to our
            newsletter, register for an account, or interact with our website.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Use of Personal Information</h2>
          <p>
            Your personal information may be used to personalize your experience
            on our website, to send periodic emails regarding our content, or to
            improve our website based on the information and feedback we receive
            from you.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Third-Party Services</h2>
          <p>
            We may use third-party services, such as analytics tools or payment
            processors, that may collect, use, and share your information.
            Please review the privacy policies of these third-party services for
            more information.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your
            browsing experience on our website. You can choose to disable
            cookies through your browser settings, but this may affect your
            ability to access certain features of the site.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Security Measures</h2>
          <p>
            We implement reasonable security measures to protect the
            confidentiality and integrity of your personal information. However,
            we cannot guarantee the security of information transmitted over the
            internet.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Updates to the Privacy Policy</h2>
          <p>
            We reserve the right to update this privacy policy at any time.
            Changes will be effective immediately upon posting. It is your
            responsibility to review this policy periodically to stay informed
            about how we are protecting and using your personal information.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
