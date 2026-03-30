import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Effective Date: March 30, 2026
          </p>

          <div className="prose prose-zinc mt-8 max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Health and Travels website, tools, content, or services
              provided by Cooperante LLC (“Company,” “we,” “our,” or “us”), you agree to be bound by
              these Terms of Service. If you do not agree, do not use the site or services.
            </p>

            <h2>2. Services</h2>
            <p>We may provide:</p>
            <ul>
              <li>Travel planning tools and content</li>
              <li>AI-assisted trip planning through Sage and related tools</li>
              <li>Travel, health, and lifestyle information</li>
              <li>Affiliate links to third-party products and services</li>
            </ul>
            <p>
              All services and content are provided for informational and general planning purposes
              only.
            </p>

            <h2>3. No Professional Advice</h2>
            <p>
              We are not acting as your travel agent, attorney, accountant, financial advisor,
              physician, or other licensed professional unless explicitly stated otherwise.
            </p>
            <p>
              You are responsible for independently verifying important details such as pricing,
              availability, safety, weather, travel restrictions, health requirements, and suitability
              for your circumstances.
            </p>

            <h2>4. Affiliate Relationships</h2>
            <p>
              We may include affiliate links to third-party websites, services, lodging, tours, gear,
              or other products. If you click or purchase through certain links, we may earn a
              commission.
            </p>
            <p>
              We do not control third-party offers, pricing, availability, or fulfillment and are not
              responsible for those third-party services.
            </p>

            <h2>5. User Responsibilities</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the site or services for unlawful purposes</li>
              <li>Interfere with the operation or security of the site</li>
              <li>Attempt to gain unauthorized access to systems or data</li>
              <li>Submit false, misleading, abusive, or infringing content</li>
              <li>Use the site in a way that harms us or other users</li>
            </ul>

            <h2>6. Intellectual Property</h2>
            <p>
              Unless otherwise stated, all content on this site, including branding, text, graphics,
              layouts, and original materials, is owned by or licensed to Cooperante LLC.
            </p>
            <p>
              You may not copy, reproduce, republish, distribute, or create derivative works from our
              content without prior written permission, except as allowed by law.
            </p>

            <h2>7. AI-Generated Content</h2>
            <p>
              Some content and responses on this website may be generated or assisted by artificial
              intelligence. AI-generated content may be incomplete, inaccurate, or outdated.
            </p>
            <p>
              You are responsible for reviewing and verifying recommendations before relying on them.
            </p>

            <h2>8. Third-Party Services and Links</h2>
            <p>
              Our site may link to or reference third-party websites, booking platforms, tours,
              products, and services. We do not endorse or guarantee third-party content, policies,
              availability, or results.
            </p>

            <h2>9. Disclaimers</h2>
            <p>
              The site and services are provided on an “as is” and “as available” basis without
              warranties of any kind, express or implied, to the fullest extent permitted by law.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Cooperante LLC shall not be liable for any
              indirect, incidental, consequential, special, or punitive damages arising out of or
              related to your use of the site, services, third-party bookings, or reliance on content.
            </p>
            <p>
              Your use of the site and services is at your own risk.
            </p>

            <h2>11. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Cooperante LLC and its owners,
              affiliates, service providers, and representatives from claims, liabilities, damages,
              losses, and expenses arising out of your use of the site, your violation of these Terms,
              or your misuse of the services.
            </p>

            <h2>12. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. Updated terms will be posted on
              this page with a revised effective date. Continued use of the site after changes means
              you accept the updated Terms.
            </p>

            <h2>13. Governing Law</h2>
            <p>
              These Terms are governed by and interpreted under the laws of the State of Arizona,
              without regard to conflict of law principles.
            </p>

            <h2>14. Contact</h2>
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

export default TermsOfService;
