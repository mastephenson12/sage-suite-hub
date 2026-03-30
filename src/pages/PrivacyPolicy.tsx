import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Health & Travels
          </Link>
        </div>

        <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
            Legal
          </p>
          <h1 className="mt-2 text-3xl font-black text-zinc-950 md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Effective Date: March 30, 2026
          </p>

          <div className="prose prose-zinc mt-8 max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Cooperante LLC, doing business as Health and Travels (“Company,” “we,” “our,” or “us”),
              respects your privacy and is committed to protecting it through this Privacy Policy.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, share, and protect information when
              you visit our website, use our tools, interact with Sage, subscribe to updates, or
              otherwise engage with our services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following categories of information:</p>

            <h3>a. Information You Provide</h3>
            <ul>
              <li>Name, if you choose to provide it</li>
              <li>Email address</li>
              <li>Messages, trip requests, and other content you submit</li>
              <li>Information you provide when contacting us</li>
            </ul>

            <h3>b. Automatically Collected Information</h3>
            <ul>
              <li>IP address</li>
              <li>Browser type and device information</li>
              <li>Pages visited and site activity</li>
              <li>Referral source and session data</li>
            </ul>

            <h3>c. Information from Third Parties</h3>
            <p>
              We may receive information from third-party platforms, analytics providers, email tools,
              or affiliate partners in connection with our website and services.
            </p>

            <h2>3. How We Use Information</h2>
            <p>We may use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and improve our website and services</li>
              <li>Respond to requests and provide trip-planning assistance</li>
              <li>Send requested trip plans or related information</li>
              <li>Improve site performance and user experience</li>
              <li>Track affiliate referrals and related performance</li>
              <li>Send updates, newsletters, or marketing communications if you opt in</li>
              <li>Protect against fraud, abuse, or misuse</li>
            </ul>

            <h2>4. Affiliate Disclosure</h2>
            <p>
              Health and Travels participates in affiliate marketing programs. This means we may earn
              commissions if you click certain links or make purchases through linked third-party
              websites.
            </p>
            <p>
              These links may use cookies, tracking pixels, or similar technologies to attribute
              referrals. You generally do not pay extra by using affiliate links.
            </p>

            <h2>5. Cookies and Tracking Technologies</h2>
            <p>
              We may use cookies and similar technologies for site functionality, analytics, user
              experience improvements, and affiliate tracking.
            </p>
            <p>
              You can usually control cookies through your browser settings, though disabling them may
              affect some features of the site.
            </p>

            <h2>6. How We Share Information</h2>
            <p>We do not sell your personal information. We may share information with:</p>
            <ul>
              <li>Service providers that support our website, hosting, analytics, or communications</li>
              <li>Affiliate and advertising partners for referral attribution</li>
              <li>Legal or regulatory authorities if required by law</li>
              <li>Successors in the event of a merger, sale, or business transfer</li>
            </ul>

            <h2>7. Data Retention</h2>
            <p>
              We retain information for as long as reasonably necessary to operate our services,
              fulfill requests, comply with legal obligations, resolve disputes, and enforce our
              agreements.
            </p>

            <h2>8. Data Security</h2>
            <p>
              We use reasonable administrative, technical, and organizational safeguards to help
              protect your information. However, no transmission or storage system is guaranteed to be
              fully secure.
            </p>

            <h2>9. Your Rights and Choices</h2>
            <p>
              Depending on where you live, you may have rights to access, update, delete, or request
              information about your personal data. You may also unsubscribe from marketing emails at
              any time using the unsubscribe link in those emails.
            </p>
            <p>
              To make a request, contact us at{' '}
              <a href="mailto:helpme@healthandtravels.com">helpme@healthandtravels.com</a>.
            </p>

            <h2>10. Children’s Privacy</h2>
            <p>
              Our services are not directed to children under 13, and we do not knowingly collect
              personal information directly from children under 13.
            </p>

            <h2>11. Third-Party Links</h2>
            <p>
              Our site may contain links to third-party websites and services. We are not responsible
              for the privacy practices, content, or policies of those third parties.
            </p>

            <h2>12. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any updated version will be posted
              on this page with a revised effective date.
            </p>

            <h2>13. Contact</h2>
            <p>
              Cooperante LLC
              <br />
              d/b/a Health and Travels
              <br />
              Email: <a href="mailto:helpme@healthandtravels.com">helpme@healthandtravels.com</a>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
