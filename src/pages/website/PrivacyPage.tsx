import { Helmet } from 'react-helmet-async';

const LAST_UPDATED = 'January 1, 2025';

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — Northstar Web Care</title>
        <meta
          name="description"
          content="Privacy policy for Northstar Web Care. Learn how we collect, use, and protect your information."
        />
      </Helmet>

      <section className="bg-[#101B2D] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-300">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Template Notice */}
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 mb-10">
            <p className="text-sm text-amber-800">
              <strong>⚠️ Template Notice:</strong> This is a template privacy
              policy. Please review and customize it with legal counsel before
              publishing. Placeholder values are marked with square brackets.
            </p>
          </div>

          <div className="prose prose-gray max-w-none prose-headings:text-[#101B2D] prose-headings:font-semibold prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-[#16C7B0] prose-a:no-underline hover:prose-a:underline">
            <h2>1. Information We Collect</h2>
            <p>
              [COMPANY_NAME] (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects information
              you provide directly to us when you:
            </p>
            <ul>
              <li>Fill out our contact form (name, email, company, website URL, message)</li>
              <li>Subscribe to our services</li>
              <li>Communicate with us via email or other channels</li>
            </ul>
            <p>
              We may also automatically collect certain information when you visit
              our website, including your IP address, browser type, operating
              system, referring URLs, and pages viewed.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Provide, maintain, and improve our services</li>
              <li>Send you technical notices and updates related to your service plan</li>
              <li>Communicate about services, offers, and events (with your consent)</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent or unauthorized activity</li>
            </ul>

            <h2>3. Data Storage and Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect the security of your personal information. However, no method
              of transmission over the Internet or electronic storage is 100%
              secure. We store your data on [describe storage location/provider]
              and retain it for as long as necessary to provide our services or as
              required by law.
            </p>

            <h2>4. Third-Party Services</h2>
            <p>
              We may use third-party services that collect, monitor, and analyze
              information to improve our service. These third parties have their own
              privacy policies addressing how they use such information. Current
              third-party services may include:
            </p>
            <ul>
              <li>Analytics services (e.g., [analytics provider])</li>
              <li>Email service providers (e.g., [email provider])</li>
              <li>Payment processors (e.g., [payment provider])</li>
              <li>Hosting providers (e.g., [hosting provider])</li>
            </ul>

            <h2>5. Cookies</h2>
            <p>
              Our website may use cookies and similar tracking technologies to
              track activity and hold certain information. Cookies are files with a
              small amount of data that are sent to your browser from a website and
              stored on your device. You can instruct your browser to refuse all
              cookies or to indicate when a cookie is being sent.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              Depending on your location, you may have the following rights
              regarding your personal information:
            </p>
            <ul>
              <li>The right to access the personal information we hold about you</li>
              <li>The right to request correction of inaccurate information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at [COMPANY_EMAIL].
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We
              do not knowingly collect personal information from children.
            </p>

            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify
              you of any changes by posting the new privacy policy on this page and
              updating the &quot;Last updated&quot; date.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact
              us:
            </p>
            <ul>
              <li>Email: [COMPANY_EMAIL]</li>
              <li>Company: [COMPANY_NAME]</li>
              <li>Address: [COMPANY_ADDRESS]</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
