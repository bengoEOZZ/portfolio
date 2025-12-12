/**
 * NAVIGATION BAR COMPONENT
 * ========================
 * Luxury navigation header for the ClassicMode interface with animated briefcase menu.
 * 
 * COMPONENT ARCHITECTURE:
 * -----------------------
 * Logo Section: Craftmanship emblem with shimmer effects and text
 * Briefcase Menu: Interactive luxury briefcase that opens to reveal navigation items
 * 
 * INTERACTIONS:
 * -------------
 * Logo Click: Navigate to home page with page transition
 * Briefcase Click: Shake animation followed by menu open/close
 * Menu Items: Navigate to respective pages (About, Coding, Projects, Contact)
 * Click Outside: Automatically closes menu when clicking outside briefcase area
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from './NavigationBar.module.css';
import emblemImage from '../../../assets/ClassicMode/dustinessEmblem.png';
import Briefcase from './Briefcase';

/**
 * NavigationBar Component
 * =======================
 */
const NavigationBar = ({ startTransition }) => {
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
      });
    } else {
      navigate('/classic');
    }
  };

  /**
   * COMPONENT OUTPUT
   * ================
   */
  return (
    <header className={classes.header}>
      
      {/* LOGO SECTION */}
      <div className={classes.logo} onClick={handleLogoClick}>
        
        {/* LUXURY CRAFTMANSHIP EMBLEM */}
        <div className={classes.luxuryLogo}>
          <div className={classes.shimmerRing}></div>
          
          <div className={classes.outerCrest}>
            <div className={classes.luxuryBackdrop}></div>
            <img src={emblemImage} className={classes.emblem} />
            
            <div className={classes.sparkleEffect}>
              <div className={classes.sparkle} style={{'--delay': '0s', '--duration': '3s'}}></div>
              <div className={classes.sparkle} style={{'--delay': '1s', '--duration': '4s'}}></div>
              <div className={classes.sparkle} style={{'--delay': '2s', '--duration': '3.5s'}}></div>
            </div>
          </div>
        </div>
        
        {/* LOGO TEXT */}
        <div className={classes.logoText}>
          <div>classic</div>
          <div className={classes.primaryText}>
            <div className={classes.textUnderline}></div>
          </div>
          <div>craftmanship</div>
        </div>
      </div>
      
      {/* BRIEFCASE NAVIGATION */}
      <Briefcase startTransition={startTransition} />

    </header>
  );
};

export default NavigationBar;