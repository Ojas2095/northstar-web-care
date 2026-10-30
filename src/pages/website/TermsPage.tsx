import { Helmet } from 'react-helmet-async';

const LAST_UPDATED = 'January 1, 2025';

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service — Northstar Web Care</title>
        <meta
          name="description"
          content="Terms of service for Northstar Web Care. Understand the terms governing our website maintenance services."
        />
      </Helmet>

      <section className="bg-[#101B2D] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Terms of Service
          </h1>
          <p className="mt-4 text-gray-300">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Template Notice */}
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 mb-10">
            <p className="text-sm text-amber-800">
              <strong>⚠️ Template Notice:</strong> This is a template terms of
              service document. Please review and customize it with legal counsel
              before publishing. Placeholder values are marked with square
              brackets.
            </p>
          </div>

          <div className="prose prose-gray max-w-none prose-headings:text-[#101B2D] prose-headings:font-semibold prose-p:text-gray-600 prose-li:text-gray-600 prose-a:text-[#16C7B0] prose-a:no-underline hover:prose-a:underline">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the services provided by [COMPANY_NAME]
              (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms
              of Service. If you do not agree to these terms, please do not use our
              services.
            </p>

            <h2>2. Description of Services</h2>
            <p>
              [COMPANY_NAME] provides website maintenance, technical support, and
              related services as described on our website and in your selected
              service plan. Services are limited to the scope outlined in your
              chosen plan and may include:
            </p>
            <ul>
              <li>Website health checks and monitoring</li>
              <li>Bug fixes and minor technical changes</li>
              <li>Performance optimization</li>
              <li>Deployment assistance</li>
              <li>Technical documentation</li>
            </ul>
            <p>
              Services explicitly excluded are listed on our Services page and
              include, but are not limited to: hosting services, domain
              registration, major website redesigns, 24/7 emergency support, and
              guaranteed uptime SLAs.
            </p>

            <h2>3. Payment Terms</h2>
            <p>
              Services are billed on a monthly subscription basis. By subscribing
              to a plan, you agree to pay the applicable fees as posted on our
              pricing page.
            </p>
            <ul>
              <li>Payments are due at the beginning of each billing cycle.</li>
              <li>All fees are in [CURRENCY] and are non-refundable except as described in Section 7.</li>
              <li>We reserve the right to change our prices with 30 days&apos; notice.</li>
              <li>
                Failure to pay may result in suspension or termination of services.
              </li>
            </ul>

            <h2>4. Service Limitations</h2>
            <p>
              Our maintenance services are provided on a best-effort basis within
              agreed working hours. We do not guarantee:
            </p>
            <ul>
              <li>
                Specific uptime percentages — uptime depends on your hosting
                provider.
              </li>
              <li>Immediate response to issues outside of agreed business hours.</li>
              <li>Compatibility with all third-party services or platforms.</li>
              <li>Resolution of issues caused by factors outside our control.</li>
            </ul>
            <p>
              The hours included in each plan represent the maximum allocation for
              that billing period. Unused hours do not roll over to the next period.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
              You retain all ownership rights to your website content, code, and
              assets. Any work we perform on your website as part of our
              maintenance services becomes your property upon payment.
            </p>
            <p>
              We retain the right to use general knowledge, techniques, and
              experience gained during the provision of services. We may reference
              our working relationship in our portfolio unless you request
              otherwise in writing.
            </p>

            <h2>6. Confidentiality</h2>
            <p>
              We treat all access credentials, proprietary code, and business
              information shared with us as confidential. We will not disclose your
              confidential information to third parties except as required by law or
              with your written consent.
            </p>

            <h2>7. Termination</h2>
            <p>
              Either party may terminate the service agreement at any time with
              written notice. Upon termination:
            </p>
            <ul>
              <li>
                Services will continue until the end of the current billing period.
              </li>
              <li>
                We will return or securely delete any credentials and proprietary
                data within 30 days.
              </li>
              <li>
                No refunds are issued for the remaining portion of a billing period
                unless otherwise agreed upon.
              </li>
              <li>
                We will provide reasonable assistance in transitioning maintenance
                to you or another provider.
              </li>
            </ul>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, [COMPANY_NAME] shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including but not limited to loss of profits, data,
              use, or goodwill, arising out of or related to your use of our
              services.
            </p>
            <p>
              Our total liability for any claim arising out of or related to these
              terms or our services shall not exceed the total amount paid by you
              to us in the three months preceding the claim.
            </p>

            <h2>9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless [COMPANY_NAME] from
              and against any claims, liabilities, damages, losses, and expenses
              arising from your use of the services or violation of these terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the
              laws of [JURISDICTION], without regard to its conflict of law
              provisions. Any disputes shall be resolved in the courts of
              [JURISDICTION].
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will
              provide notice of material changes by updating the &quot;Last updated&quot;
              date and, where possible, sending an email notification. Your
              continued use of our services after changes constitutes acceptance of
              the new terms.
            </p>

            <h2>12. Contact</h2>
            <p>
              If you have questions about these terms, please contact us:
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
