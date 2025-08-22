// app/terms/page.jsx
"use client";
import Footer from "../components/footer/page";
import Header from "../components/header/page";
import "./terms.css";

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className="terms-container">
        <h1>Terms and Conditions</h1>

        <section>
          <h2>Content Ownership</h2>
          <p>
            All content on this website, including text, images, and multimedia,
            is the property of HubHawks India. Unauthorized use is prohibited.
          </p>
        </section>

        <section>
          <h2>Use of Information</h2>
          <p>
            Information provided on this website is for general informational
            purposes. It should not be considered as professional or expert
            advice.
          </p>
        </section>

        <section>
          <h2>User Conduct</h2>
          <p>
            Users are expected to engage in respectful behavior on the website.
            Any activity that could harm the website’s integrity or interfere
            with its functionality is strictly prohibited. Users are responsible
            for the security of their accounts and must not share login
            credentials.
          </p>
        </section>

        <section>
          <h2>Copyright</h2>
          <p>
            All intellectual property rights, including copyrights, in the
            content of this website are owned by HubHawks India. You may not
            reproduce or distribute any content without permission.
          </p>
        </section>

        <section>
          <h2>Intellectual Property Permissions</h2>
          <p>
            Users are permitted to share website content on social media with
            proper attribution. Permission must be sought for the use of any
            copyrighted material on the website. Users cannot copy, modify or
            distribute the content without explicit permission.
          </p>
        </section>

        <section>
          <h2>External Links</h2>
          <p>
            This website may contain links to external websites. HubHawks India
            is not responsible for the content or practices of any linked site.
          </p>
        </section>

        <section>
          <h2>Comments and User Content</h2>
          <p>
            Users are encouraged to engage respectfully. HubHawks India reserves
            the right to remove comments that are deemed inappropriate or
            violate these terms.
          </p>
        </section>

        <section>
          <h2>Privacy Policy</h2>
          <p>
            Please refer to our Privacy Policy for information on how personal
            data is collected, used, and protected.
          </p>
        </section>

        <section>
          <h2>Book Purchases</h2>
          <p>
            Any transactions related to the purchase of books listed are subject
            to terms specified during the checkout process.
          </p>
        </section>

        <section>
          <h2>Disclaimer</h2>
          <p>
            HubHawks India makes no representations or warranties of any kind,
            express or implied, about the completeness, accuracy, reliability,
            or suitability of the information contained on the website.
          </p>
        </section>

        <section>
          <h2>Liability Limitations</h2>
          <p>
            HubHawks India makes no representations or warranties of any kind,
            express or implied, about the completeness, accuracy, reliability,
            or suitability of the information contained on the website.
          </p>
        </section>

        <section>
          <h2>Indemnification</h2>
          <p>
            Users agree to indemnify and hold the website and its owner harmless
            from any claims, damages, losses, or liabilities arising from their
            use of the website or any violation of the terms.
          </p>
        </section>

        <section>
          <h2>Accessibility</h2>
          <p>
            The website is committed to making its content as accessible as
            possible to users with disabilities. Users are encouraged to report
            accessibility issues via the provided contact information.
          </p>
        </section>

        <section>
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            [If applicable, provide information on the use of cookies and
            tracking technologies and explain how user data is handled in
            accordance with privacy laws.]
          </p>
        </section>

        <section>
          <h2>Termination of Access</h2>
          <p>
            The website reserves the right to terminate or suspend a user’s
            access to the website if they violate the terms. Conditions for
            termination will be outlined, and an appeals or reinstatement
            process may be specified.
          </p>
        </section>

        <section>
          <h2>Notification of Changes</h2>
          <p>
            Users will be notified of any significant changes to the terms and
            conditions.
          </p>
        </section>

        <section>
          <h2>Effective Date</h2>
          <p>
            These terms and conditions are effective as of [Specify the
            effective date]. Continued use of the website implies acceptance of
            any updates.
          </p>
        </section>

        <section>
          <h2>Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws of [jurisdiction].
          </p>
        </section>

        <section>
          <h2>Contact Information</h2>
          <p>
            For any questions regarding these terms, please contact{" "}
            <a href="mailto:tanvi@hubhawks.com">tanvi@hubhawks.com</a>.
          </p>
        </section>

        <p className="terms-final">
          By using HubHawks’s website, you acknowledge that you have read,
          understood, and agree to these terms and conditions.
        </p>
      </div>
      <Footer />
    </>
  );
}
