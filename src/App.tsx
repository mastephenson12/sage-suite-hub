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
import FamilyConfidencePanel from './components/FamilyConfidencePanel';
import TripBuilderResultEnhancer from './components/TripBuilderResultEnhancer';
import NewsletterConversionPanel from './components/NewsletterConversionPanel';
import HowItWorks from './components/HowItWorks';
import StartHere from './components/StartHere';
import GroupRealityCheckPanel from './components/GroupRealityCheckPanel';
import FreedomBridge from './components/FreedomBridge';
import SEOJsonLd from './components/SEOJsonLd';
import HomeFAQ from './components/HomeFAQ';
import PopularArizonaGuides from './components/PopularArizonaGuides';
import SeasonalPlanningPanel from './components/SeasonalPlanningPanel';
import AuthorityTrustPanel from './components/AuthorityTrustPanel';
import BrandNetworkBar from './components/BrandNetworkBar';

import Archive from './pages/Archive';
import AdventureChooser from './pages/AdventureChooser';
import PlanArizonaAdventure from './pages/PlanArizonaAdventure';
import Explore from './pages/Explore';
import TrailGuides from './pages/TrailGuides';
import About from './pages/About';
import EditorialStandards from './pages/EditorialStandards';
import AuthorMarkStephenson from './pages/AuthorMarkStephenson';
import AffiliateDisclosure from './pages/AffiliateDisclosure';
import Community from './pages/Community';
import ChatPage from './pages/ChatPage';
import SuiteDashboard from './pages/SuiteDashboard';
import ArticlePage from './pages/ArticlePage';
import TrailPage from './pages/TrailPage';
import Arizona from './pages/Arizona';
import ArizonaDestinationPage from './pages/ArizonaDestinationPage';
import ArizonaAdventureFinder from './pages/ArizonaAdventureFinder';
import ArizonaFirstTripGuide from './pages/ArizonaFirstTripGuide';
import ArizonaPlanBySituation from './pages/ArizonaPlanBySituation';
import ArizonaDayTripsFromPhoenix from './pages/ArizonaDayTripsFromPhoenix';
import ArizonaWeekendTrips from './pages/ArizonaWeekendTrips';
import ArizonaSeasonalFamilyAdventures from './pages/ArizonaSeasonalFamilyAdventures';
import ArizonaHikesWithKids from './pages/ArizonaHikesWithKids';
import EasyArizonaFamilyHikes from './pages/EasyArizonaFamilyHikes';
import DesertHikingSafety from './pages/DesertHikingSafety';
import FlashFloodGoNoGo from './pages/FlashFloodGoNoGo';
import PaysonRimCountryWithKids from './pages/PaysonRimCountryWithKids';
import FlagstaffWithKids from './pages/FlagstaffWithKids';
import CoolArizonaSummerTripsWithKids from './pages/CoolArizonaSummerTripsWithKids';
import GilaBendWithKids from './pages/GilaBendWithKids';
import SpanishArizonaHub from './pages/SpanishArizonaHub';
import SpanishPlanBySituation from './pages/SpanishPlanBySituation';
import SpanishPhoenixHeatPage from './pages/SpanishPhoenixHeatPage';
import SpanishCoolArizonaSummerTrips from './pages/SpanishCoolArizonaSummerTrips';
import SpanishArizonaHikesWithKids from './pages/SpanishArizonaHikesWithKids';
import SpanishEasyArizonaFamilyHikes from './pages/SpanishEasyArizonaFamilyHikes';
import SpanishDayTripsFromPhoenix from './pages/SpanishDayTripsFromPhoenix';
import SpanishPaysonRimCountryWithKids from './pages/SpanishPaysonRimCountryWithKids';
import SpanishFirstArizonaTripGuide from './pages/SpanishFirstArizonaTripGuide';
import SpanishArizonaWeekendTrips from './pages/SpanishArizonaWeekendTrips';
import SpanishSedonaWithKids from './pages/SpanishSedonaWithKids';
import SpanishFlagstaffWithKids from './pages/SpanishFlagstaffWithKids';
import SpanishGrandCanyonWithKids from './pages/SpanishGrandCanyonWithKids';
import SpanishPapagoParkWithKids from './pages/SpanishPapagoParkWithKids';
import RussianArizonaHub from './pages/RussianArizonaHub';
import RussianPlanBySituation from './pages/RussianPlanBySituation';
import RussianCoolArizonaSummerTrips from './pages/RussianCoolArizonaSummerTrips';
import RussianArizonaHikesWithKids from './pages/RussianArizonaHikesWithKids';
import RussianDayTripsFromPhoenix from './pages/RussianDayTripsFromPhoenix';
import RussianFirstArizonaTripGuide from './pages/RussianFirstArizonaTripGuide';
import RussianSedonaWithKids from './pages/RussianSedonaWithKids';
import RussianGrandCanyonWithKids from './pages/RussianGrandCanyonWithKids';
import RussianPapagoParkWithKids from './pages/RussianPapagoParkWithKids';
import GermanDayTripsFromPhoenix from './pages/GermanDayTripsFromPhoenix';
import GermanGrandCanyonWithKids from './pages/GermanGrandCanyonWithKids';
import GermanSedonaWithKids from './pages/GermanSedonaWithKids';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import TripBuilder from './pages/TripBuilder';
import MyTrips from './pages/MyTrips';
import NotFound from './pages/NotFound';

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
      <FamilyConfidencePanel />
      <StartHere />
      <GroupRealityCheckPanel />
      <PopularArizonaGuides />
      <SeasonalPlanningPanel />
      <AuthorityTrustPanel />
      <HowItWorks />
      <NewsletterConversionPanel />
      <FreedomBridge />
      <HomeFAQ />
    </>
  );
}

function TripBuilderPage() {
  return (
    <>
      <TripBuilder />
      <TripBuilderResultEnhancer />
      <NewsletterConversionPanel />
    </>
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

  React.useEffect(() => {
    const pagePath = `${location.pathname}${location.search}`;
    const gaWindow = window as Window & {
      __SAGE_GA_MEASUREMENT_ID?: string;
      gtag?: (...args: unknown[]) => void;
      dataLayer?: Array<Record<string, unknown>>;
    };
    const pagePayload = {
      page_path: pagePath,
      page_location: `${window.location.origin}${pagePath}`,
      page_title: document.title,
    };
    if (
      typeof gaWindow.gtag === 'function' &&
      typeof gaWindow.__SAGE_GA_MEASUREMENT_ID === 'string'
    ) {
      gaWindow.gtag('config', gaWindow.__SAGE_GA_MEASUREMENT_ID, pagePayload);
    }
    if (Array.isArray(gaWindow.dataLayer)) {
      gaWindow.dataLayer.push({ event: 'page_view', ...pagePayload });
    }
  }, [location.pathname, location.search]);

  const hideSiteChrome =
    location.pathname === '/chat' || location.pathname.startsWith('/suite');

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {hideSiteChrome ? <BrandNetworkBar /> : <Navbar />}
      <main className="flex-grow pb-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/start-here" element={<AdventureChooser />} />
          <Route path="/plan" element={<PlanArizonaAdventure />} />
          <Route path="/trip-builder" element={<TripBuilderPage />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/my-trips/:tripId" element={<MyTrips />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/suite/*" element={<SuiteDashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/archive/:id" element={<ArticlePage />} />
          <Route path="/es/archive/phoenix-con-ninos-cuando-hace-calor" element={<SpanishPhoenixHeatPage />} />
          <Route path="/es/archive/phoenix-things-to-do-with-kids-when-hot" element={<SpanishPhoenixHeatPage />} />
          <Route path="/es/arizona" element={<SpanishArizonaHub />} />
          <Route path="/es/arizona/primer-viaje-a-arizona-con-ninos" element={<SpanishFirstArizonaTripGuide />} />
          <Route path="/es/arizona/planificar-por-situacion" element={<SpanishPlanBySituation />} />
          <Route path="/es/arizona/viajes-frescos-verano-con-ninos" element={<SpanishCoolArizonaSummerTrips />} />
          <Route path="/es/arizona/caminatas-con-ninos" element={<SpanishArizonaHikesWithKids />} />
          <Route path="/es/arizona/caminatas-faciles-con-ninos" element={<SpanishEasyArizonaFamilyHikes />} />
          <Route path="/es/arizona/viajes-de-un-dia-desde-phoenix" element={<SpanishDayTripsFromPhoenix />} />
          <Route path="/es/arizona/payson-y-mogollon-rim-con-ninos" element={<SpanishPaysonRimCountryWithKids />} />
          <Route path="/es/arizona/escapadas-fin-de-semana-con-ninos" element={<SpanishArizonaWeekendTrips />} />
          <Route path="/es/arizona/sedona-con-ninos" element={<SpanishSedonaWithKids />} />
          <Route path="/es/arizona/flagstaff-con-ninos" element={<SpanishFlagstaffWithKids />} />
          <Route path="/es/arizona/gran-canon-con-ninos" element={<SpanishGrandCanyonWithKids />} />
          <Route path="/es/arizona/papago-park-con-ninos" element={<SpanishPapagoParkWithKids />} />
          <Route path="/ru" element={<RussianArizonaHub />} />
          <Route path="/ru/arizona/first-trip-with-kids" element={<RussianFirstArizonaTripGuide />} />
          <Route path="/ru/arizona/plan-by-situation" element={<RussianPlanBySituation />} />
          <Route path="/ru/arizona/cool-summer-trips-with-kids" element={<RussianCoolArizonaSummerTrips />} />
          <Route path="/ru/arizona/hikes-with-kids" element={<RussianArizonaHikesWithKids />} />
          <Route path="/ru/arizona/day-trips-from-phoenix" element={<RussianDayTripsFromPhoenix />} />
          <Route path="/ru/arizona/sedona-with-kids" element={<RussianSedonaWithKids />} />
          <Route path="/ru/arizona/grand-canyon-with-kids" element={<RussianGrandCanyonWithKids />} />
          <Route path="/ru/arizona/papago-park-with-kids" element={<RussianPapagoParkWithKids />} />
          <Route path="/de/arizona/tagesausfluege-ab-phoenix" element={<GermanDayTripsFromPhoenix />} />
          <Route path="/de/arizona/grand-canyon-mit-kindern" element={<GermanGrandCanyonWithKids />} />
          <Route path="/de/arizona/sedona-mit-kindern" element={<GermanSedonaWithKids />} />
          <Route path="/trail-guides" element={<TrailGuides />} />
          <Route path="/trail-guides/:id" element={<TrailPage />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/editorial-standards" element={<EditorialStandards />} />
          <Route path="/author/mark-stephenson" element={<AuthorMarkStephenson />} />
          <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
          <Route path="/arizona" element={<Arizona />} />
          <Route path="/arizona/adventure-finder" element={<ArizonaAdventureFinder />} />
          <Route path="/arizona/first-trip" element={<ArizonaFirstTripGuide />} />
          <Route path="/arizona/plan-by-situation" element={<ArizonaPlanBySituation />} />
          <Route path="/arizona/day-trips-from-phoenix" element={<ArizonaDayTripsFromPhoenix />} />
          <Route path="/arizona/weekend-trips" element={<ArizonaWeekendTrips />} />
          <Route path="/arizona/family-adventures-by-season" element={<ArizonaSeasonalFamilyAdventures />} />
          <Route path="/arizona/hikes-with-kids" element={<ArizonaHikesWithKids />} />
          <Route path="/arizona/easy-family-hikes" element={<EasyArizonaFamilyHikes />} />
          <Route path="/arizona/desert-hiking-safety" element={<DesertHikingSafety />} />
          <Route path="/arizona/flash-flood-go-no-go" element={<FlashFloodGoNoGo />} />
          <Route path="/arizona/payson-rim-country-with-kids" element={<PaysonRimCountryWithKids />} />
          <Route path="/arizona/flagstaff-with-kids" element={<FlagstaffWithKids />} />
          <Route path="/arizona/cool-summer-trips-with-kids" element={<CoolArizonaSummerTripsWithKids />} />
          <Route path="/arizona/gila-bend-with-kids" element={<GilaBendWithKids />} />
          <Route path="/arizona/:slug" element={<ArizonaDestinationPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
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
                <Link to="/start-here" className="transition-colors hover:text-black">Start Here</Link>
                <Link to="/explore" className="transition-colors hover:text-black">Explore</Link>
                <Link to="/archive" className="transition-colors hover:text-black">Archive</Link>
                <Link to="/trail-guides" className="transition-colors hover:text-black">Trails</Link>
                <Link to="/arizona" className="transition-colors hover:text-black">Arizona Guides</Link>
                <Link to="/arizona/first-trip" className="transition-colors hover:text-black">First Trip</Link>
                <Link to="/arizona/plan-by-situation" className="transition-colors hover:text-black">Plan by Situation</Link>
                <Link to="/arizona/adventure-finder" className="transition-colors hover:text-black">Adventure Finder</Link>
                <Link to="/es/arizona" className="transition-colors hover:text-black">Espanol</Link>
                <Link to="/ru" className="transition-colors hover:text-black">Русский</Link>
                <Link to="/de/arizona/sedona-mit-kindern" className="transition-colors hover:text-black">Deutsch</Link>
                <Link to="/arizona/weekend-trips" className="transition-colors hover:text-black">Weekend Trips</Link>
                <Link to="/arizona/hikes-with-kids" className="transition-colors hover:text-black">Kids Hikes</Link>
                <Link to="/arizona/easy-family-hikes" className="transition-colors hover:text-black">Easy Hikes</Link>
                <Link to="/arizona/flash-flood-go-no-go" className="transition-colors hover:text-black">Flash-Flood Safety</Link>
                <Link to="/arizona/family-adventures-by-season" className="transition-colors hover:text-black">Seasons</Link>
                <Link to="/arizona/day-trips-from-phoenix" className="transition-colors hover:text-black">Phoenix Trips</Link>
                <Link to="/community" className="transition-colors hover:text-black">Community</Link>
                <Link to="/about" className="transition-colors hover:text-black">About</Link>
                <Link to="/editorial-standards" className="transition-colors hover:text-black">Editorial Standards</Link>
                <Link to="/author/mark-stephenson" className="transition-colors hover:text-black">Author</Link>
                <Link to="/affiliate-disclosure" className="transition-colors hover:text-black">Affiliate Disclosure</Link>
                <Link to="/trip-builder" className="transition-colors hover:text-black">Trip Builder</Link>
                <Link to="/my-trips" className="transition-colors hover:text-black">My Trips</Link>
                <Link to="/privacy-policy" className="transition-colors hover:text-black">Privacy Policy</Link>
                <Link to="/terms-of-service" className="transition-colors hover:text-black">Terms of Service</Link>
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
