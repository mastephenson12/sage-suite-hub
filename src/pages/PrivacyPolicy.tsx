import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-black text-zinc-900">Privacy Policy</h1>
        <p className="mt-3 text-sm text-zinc-500">
          Effective Date: March 30, 2026
        </p>

        <div className="prose prose-zinc mt-8 max-w-none">
          <p>
            Cooperante LLC, doing business as Health and Travels (“Company,”
            “we,” “our,” or “us”), respects your privacy and is committed to
            protecting it through this Privacy Policy.
          </p>

          <p>
            This policy explains how we collect, use, and share information when
            you visit our website, use our tools, including Sage, or otherwise
            interact with our services.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>a. Information You Provide</h3>
          <ul>
            <li>Name, if you provide it</li>
            <li>Email address</li>
            <li>Messages, trip requests, or other inputs you submit</li>
          </ul>

          <h3>b. Automatically Collected Information</h3>
          <ul>
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Pages visited and usage behavior</li>
          </ul>

          <h3>c. Third-Party Data</h3>
          <p>
            We may receive information from analytics providers, affiliate
            partners, or other service providers that support our website and
            business operations.
          </p>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>Provide and improve our services</li>
            <li>Respond to requests and inquiries</li>
            <li>Send requested information, including trip plans</li>
            <li>Improve website functionality and user experience</li>
            <li>Analyze traffic and usage trends</li>
            <li>Track affiliate referrals and performance</li>
          </ul>

          <h2>3. Affiliate Disclosure</h2>
          <p>
            Health and Travels participates in affiliate marketing programs. This
            means we may earn commissions when you click certain links or make
            purchases through them.
          </p>
          <p>
            These links may use cookies, tracking parameters, or similar
            technologies to attribute referrals. You are not charged extra for
            using affiliate links.
          </p>

          <h2>4. Cookies and Tracking Technologies</h2>
          <p>
            We may use cookies and similar technologies to improve site
            functionality, understand website usage, and track affiliate link
            activity.
          </p>
          <p>
            You can usually disable cookies through your browser settings, though
            some parts of the site may not function properly if you do.
          </p>

          <h2>5. How We Share Information</h2>
          <p>We do not sell your personal information.</p>
          <p>We may share information with:</p>
          <ul>
            <li>Hosting, analytics, and email service providers</li>
            <li>Affiliate and advertising partners for referral tracking</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2>6. Data Security</h2>
          <p>
            We take reasonable steps to protect your information. However, no
            internet-based service is completely secure, and we cannot guarantee
            absolute security.
          </p>

          <h2>7. Your Rights</h2>
          <p>
            Depending on where you live, you may have rights to access, correct,
            or request deletion of your personal information.
          </p>
          <p>
            To make a request, contact us at{' '}
            <a href="mailto:helpme@healthandtravels.com">
              helpme@healthandtravels.com
            </a>
            .
          </p>

          <h2>8. Children’s Privacy</h2>
          <p>
            Our services are not directed to children under 13, and we do not
            knowingly collect personal information from children under 13.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any updates will
            be posted on this page with a revised effective date.
          </p>

          <h2>10. Contact</h2>
          <p>
            Cooperante LLC
            <br />
            d/b/a Health and Travels
            <br />
            <a href="mailto:helpme@healthandtravels.com">
              helpme@healthandtravels.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
