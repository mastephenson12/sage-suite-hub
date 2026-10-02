import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOGO_DATA_URL } from '../constants';
import '../journey.css';

export function JourneyHeader() {
  const {pathname} = useLocation();
  return <><a className="skip-link" href="#main">Skip to content</a><header className="journey-header">
    <a className="journey-brand" href="https://healthandtravels.com/" aria-label="Health and Travels home"><img src={LOGO_DATA_URL} alt="" width="42" height="42"/><span>Health &amp; Travels<small>Arizona, together.</small></span></a>
    <nav className="journey-nav" aria-label="Main navigation"><a href="https://healthandtravels.com/arizona">Explore</a><Link to="/plan" aria-current={pathname==='/plan'||pathname==='/trip-builder'?'page':undefined}>Plan a Trip</Link><Link to="/my-trips" aria-current={pathname.startsWith('/my-trips')?'page':undefined}>Saved Trips</Link></nav>
  </header></>;
}

export function JourneyFooter() {
  return <footer className="journey-footer"><strong>Health &amp; Travels</strong> · Planning powered by Sage
    <nav aria-label="Footer"><a href="https://healthandtravels.com/about">About</a><a href="https://healthandtravels.com/arizona-family-hiking-safety-guide">Trail safety</a><Link to="/privacy-policy">Privacy</Link><Link to="/terms-of-service">Terms</Link><a href="https://newsletter.healthandtravels.com/">Weekly ideas</a></nav>
    <details><summary>More planning tools</summary><nav aria-label="More planning tools"><Link to="/chat">Ask Sage</Link><Link to="/explore">Explore Sage guides</Link><a href="https://healthandtravels.com/my-arizona-adventure">Saved places</a><Link to="/arizona/food-stop-finder">Food stops</Link></nav></details>
  </footer>;
}
