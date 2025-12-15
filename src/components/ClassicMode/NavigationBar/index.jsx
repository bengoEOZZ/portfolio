/**
 * NAVIGATION BAR COMPONENT
 * ========================
 * Luxury navigation header for the ClassicMode interface with animated briefcase menu.
 * 
 * COMPONENT ARCHITECTURE:
 * -----------------------
 * Logo Section: Luxury emblem with sparkle/shimmer effects and text
 * Briefcase Menu: Interactive luxury briefcase that opens to reveal navigation items
 * 
 * INTERACTIONS:
 * -------------
 * Logo Click: Navigate to home page with page transition
 * Briefcase Click: Shake animation followed by menu open/close
 * Click Menu Items: Navigate to respective pages (About, Coding, Projects, Contact)
 * Click Outside: Automatically closes menu when clicking outside briefcase area
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from './NavigationBar.module.css';
import emblemImage from '../../../assets/ClassicMode/dustinessEmblem.png';
import Briefcase from './Briefcase';
import Sparkle from '../Sparkle';

/**
 * NavigationBar Component
 * =======================
 */
const NavigationBar = ({ startTransition, transitioning }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  /**
   * LOGO CLICK HANDLER
   * ==================
   * Navigates to home page if user is on a different page.
   * Uses page transition hook if available for smooth fade effects.
   */
  const handleLogoClick = () => {
    // Prevent navigation if already on home page
    if (location.pathname === '/classic' || location.pathname === '/classic/') {
      return;
    }
    
    // Use transition hook if provided, otherwise navigate directly
    if (startTransition) {
      startTransition(() => {
        navigate('/classic');
      }, 1500);
    } else {
      navigate('/classic');
    }
  };

  /**
   * COMPONENT OUTPUT
   * ================
   */
  return (
    <header className={`${classes.header} ${transitioning ? classes.transitioning : ''}`}>
      
      {/* LOGO SECTION */}
      <div className={classes.logo} onClick={handleLogoClick}>
        
        {/* LUXURY CRAFTMANSHIP EMBLEM */}
        <div className={classes.luxuryLogo}>
          <div className={classes.shimmerRing}></div>
          
          <div className={classes.outerCrest}>
            <img src={emblemImage} className={classes.emblem} />
            
            <div className={classes.sparkleEffect}>
              <Sparkle animationDelay="0s" duration="1.5s" />
              <Sparkle animationDelay="0.3s" duration="1.5s" />
              <Sparkle animationDelay="0.6s" duration="1.5s" />
            </div>
          </div>
        </div>
        
        {/* LOGO TEXT */}
        <div className={classes.logoText}>
          <div>classic</div>
            <div className={classes.textUnderline}></div>
          <div>craftmanship</div>
        </div>
      </div>
      
      {/* BRIEFCASE NAVIGATION */}
      <Briefcase startTransition={startTransition} />

    </header>
  );
};

export default NavigationBar;