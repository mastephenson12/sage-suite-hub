import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import { Hero } from './components/Hero';
import HowItWorks from './components/HowItWorks';
import StartHere from './components/StartHere';
import FreedomBridge from './components/FreedomBridge';
import SEOJsonLd from './components/SEOJsonLd';
import HomeFAQ from './components/HomeFAQ';

import Archive from './pages/Archive';
import TrailGuides from './pages/TrailGuides';
import About from './pages/About';
import Community from './pages/Community';
import ChatPage from './pages/ChatPage';
import SuiteDashboard from './pages/SuiteDashboard';
import ArticlePage from './pages/ArticlePage';
import TrailPage from './pages/TrailPage';
import Arizona from './pages/Arizona';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import TripBuilder from './pages/TripBuilder';

const homeFaqs = [
  {
    question: 'What is Sage Health and Travels?',
    answer:
      'Sage Health and Travels is a family adventure planning tool that helps people explore Arizona hikes, road trips, outdoor destinations, and healthy travel ideas.',
  },
  {
    question: 'Who is Sage for?',
    answer:
      'Sage is built for families, friends, parents, and beginner adventurers who want easier ways to plan meaningful Arizona trips.',
  },
  {
    question: 'Can Sage help plan Arizona hikes with kids?',
    answer:
      'Yes. Sage focuses on family-friendly Arizona adventures, including beginner hikes, scenic stops, and road trip ideas that work well for kids and groups.',
  },
  {
    question: 'Does Sage only cover Arizona?',
    answer:
      'Sage currently focuses heavily on Arizona family adventures while also supporting broader healthy travel and trip planning ideas.',
  },
  {
    question: 'How does Sage connect with Health and Travels?',
    answer:
      'Sage is part of Health and Travels, a family-focused travel brand that helps people plan healthier adventures and discover outdoor destinations.',
  },
];

function HomePage() {
  return (
    <>
      <SEOJsonLd
        title="Sage | Family Trip Planning for Arizona and Beyond"
        description="Sage helps families and friends plan Arizona adventures, discover beginner-friendly hikes, explore road trip ideas, and build healthier travel memories together."
        url="https://sage.healthandtravels.com/"
        faqs={homeFaqs}
      />

      <Hero />
      <StartHere />
      <HowItWorks />
      <FreedomBridge />
      <HomeFAQ />
    </>
  );
}

function LoginPage() {
  return (
    <section className="min-h-[70vh] bg-gradient-to-b from-emerald-50 to-white px-6 py-20">
      <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-sm md:p-12">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-emerald-600">
          Sage Account
        </p>

        <h1 className="mb-5 text-3xl font-black tracking-tight text-zinc-950 md:text-5xl">
          Save your Arizona adventure plans soon.
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
          Sage accounts will let you save trip ideas, favorite hikes, build
          weekend plans, and come back later without starting over like a poor
          soul trapped in tab chaos.
        </p>

        <div className="mb-8 rounded-2xl border border-zinc-100 bg-zinc-50 p-5 text-left">
          <p className="mb-3 text-sm font-black uppercase tracking-widest text-zinc-500">
            Coming next
          </p>

          <ul className="space-y-3 text-sm font-medium leading-6 text-zinc-700">
            <li>• Save trip plans</li>
            <li>• Favorite Arizona hikes</li>
            <li>• Build family-friendly weekend ideas</li>
            <li>• Connect free Sage accounts to Arizona Hikers Association later</li>
          </ul>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/trip-builder"
            className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-emerald-700"
          >
            Use Trip Builder
          </Link>

          <Link
            to="/community"
            className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-black uppercase tracking-widest text-zinc-700 transition hover:border-zinc-400 hover:text-black"
          >
            See Community
          </Link>
        </div>
      </div>
    </section>
  );
}

function AppContent() {
  const location = useLocation();

  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const timeoutId = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, location.hash]);

  const hideSiteChrome =
    location.pathname === '/chat' || location.pathname.startsWith('/suite');

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {!hideSiteChrome && <Navbar />}

      <main className="flex-grow pb-24">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Keep this public until Google/Firebase login works */}
          <Route path="/trip-builder" element={<TripBuilder />} />

          {/* Temporary login page. No Firebase protection yet. */}
          <Route path="/login" element={<LoginPage />} />

          <Route path="/chat" element={<ChatPage />} />
          <Route path="/suite/*" element={<SuiteDashboard />} />

          <Route path="/archive" element={<Archive />} />
          <Route path="/archive/:id" element={<ArticlePage />} />

          <Route path="/trail-guides" element={<TrailGuides />} />
          <Route path="/trail-guides/:id" element={<TrailPage />} />

          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/arizona" element={<Arizona />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {!hideSiteChrome && (
        <footer className="mt-auto border-t border-zinc-100 bg-white py-16">
          <div className="mx-auto max-w-6xl px-6 text-center md:text-left">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div>
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                  © {new Date().getFullYear()} Health & Travels Journal
                </p>

                <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-300">
                  Trip planning powered by Sage • Health & Travels
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 md:justify-end">
                <Link to="/archive" className="transition-colors hover:text-black">
                  Archive
                </Link>

                <Link
                  to="/trail-guides"
                  className="transition-colors hover:text-black"
                >
                  Trails
                </Link>

                <Link
                  to="/community"
                  className="transition-colors hover:text-black"
                >
                  Community
                </Link>

                <Link
                  to="/login"
                  className="transition-colors hover:text-black"
                >
                  My Sage
                </Link>

                <Link
                  to="/privacy-policy"
                  className="transition-colors hover:text-black"
                >
                  Privacy Policy
                </Link>

                <Link
                  to="/terms-of-service"
                  className="transition-colors hover:text-black"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      )}

      {!hideSiteChrome && <ChatWidget />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
