import React from 'react';
import { BRAND_NAME } from '../constants.ts';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-20 text-center">
          <h1 className="text-5xl font-black tracking-tighter mb-8 uppercase">Wellness. Adventure. <br/>Community.</h1>
          <div className="h-1 w-20 bg-[#0d47a1] mx-auto"></div>
        </header>

        <div className="serif-text space-y-8 text-xl text-zinc-700 leading-relaxed italic font-serif">
          <p>
            Health & Travels began as a simple observation: the desert is the ultimate healing ground, but it demands respect and navigation. 
          </p>
          <p>
            We created this journal to serve as a bridge between the wild beauty of Arizona's hiking trails and the sophisticated world of holistic wellness. We believe that a 6-mile trek through the Sedona red rocks is just as important to your health as a medical consultation.
          </p>
          <p className="not-italic font-bold text-black border-l-4 border-[#0d47a1] pl-6 my-12 text-2xl tracking-tight uppercase font-sans">
            Our mission is to help you find the space where adventure meets recovery.
          </p>
          <p>
            Through our partnership with <span className="text-[#0d47a1] font-bold not-italic">SageSuite</span>, we provide a vetted directory of wellness professionals who understand the high-desert lifestyle. Whether you're looking for a trail guide, a retreat, or a practitioner, you're in the right place.
          </p>
        </div>

        <div className="mt-20 p-12 bg-zinc-50 rounded-3xl border border-zinc-200 text-center">
          <h4 className="text-xs font-black uppercase tracking-widest text-[#0d47a1] mb-4">Want to contribute?</h4>
          <p className="text-zinc-600 mb-8 font-medium">We are always looking for trail scouts and wellness writers.</p>
          <a href="mailto:hello@healthandtravels.com" className="text-black font-black uppercase tracking-widest text-sm border-b-2 border-black hover:text-[#0d47a1] hover:border-[#0d47a1] pb-1 transition-all">
            Get in touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
  );
};

export default About;
