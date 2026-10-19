import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME, LOGO_DATA_URL } from '../constants';
import BrandNetworkBar from './BrandNetworkBar';

const Navbar: React.FC = () => <header className="journey-header">
  <BrandNetworkBar />
  <div className="journey-header-inner">
    <a href="https://healthandtravels.com/" className="journey-brand" aria-label="Health and Travels home">
      <img src={LOGO_DATA_URL} alt="" width="48" height="48" />
      <span><span className="journey-brand-name">{BRAND_NAME}</span><span className="journey-brand-subtitle">Arizona family adventures</span></span>
    </a>
    <nav className="journey-navigation" aria-label="Primary navigation">
      <a href="https://healthandtravels.com/arizona-adventures-with-kids">Start Here</a>
      <a href="https://healthandtravels.com/arizona">Explore Arizona</a>
      <a href="https://healthandtravels.com/arizona-family-hiking-safety-guide">Trail Safety</a>
      <Link to="/my-trips">My Trips</Link>
      <Link to="/plan" className="journey-primary">Plan My Day</Link>
    </nav>
  </div>
</header>;
export default Navbar;
