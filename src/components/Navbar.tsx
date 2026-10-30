import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND_NAME, LOGO_DATA_URL } from '../constants';
import BrandNetworkBar from './BrandNetworkBar';

const Navbar: React.FC = () => {
  const spanish = useLocation().pathname === '/es/arizona/flagstaff-con-ninos';
  return <header className="journey-header">
  <BrandNetworkBar />
  <div className="journey-header-inner">
    <a href="https://healthandtravels.com/" className="journey-brand" aria-label={spanish ? 'Inicio de Health & Travels (en inglés)' : 'Health and Travels home'}>
      <img src={LOGO_DATA_URL} alt="" width="48" height="48" />
      <span><span className="journey-brand-name">{BRAND_NAME}</span><span className="journey-brand-subtitle">{spanish ? 'Aventuras familiares en Arizona' : 'Arizona family adventures'}</span></span>
    </a>
    <nav className="journey-navigation" aria-label={spanish ? 'Navegación principal' : 'Primary navigation'}>
      {spanish ? <Link to="/es/arizona">Guías de Arizona</Link> : <a href="https://healthandtravels.com/arizona-adventures-with-kids">Start Here</a>}
      {!spanish && <a href="https://healthandtravels.com/arizona">Explore Arizona</a>}
      {spanish ? <a href="#seguridad">Antes de salir</a> : <a href="https://healthandtravels.com/arizona-family-hiking-safety-guide">Trail Safety</a>}
      {spanish ? <Link to="/arizona/flagstaff-with-kids" lang="en">English</Link> : <Link to="/my-trips">My Trips</Link>}
      {spanish ? <a href="#plan-familiar" className="journey-primary">Crear mi plan</a> : <Link to="/plan" className="journey-primary">Plan My Day</Link>}
    </nav>
  </div>
</header>;
};
export default Navbar;
