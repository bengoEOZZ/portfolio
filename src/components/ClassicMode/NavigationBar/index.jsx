/**
 * NAVIGATION BAR COMPONENT
 * ========================
 * 
 * Renders a sophisticated navigation header for the ClassicMode interface.
 * Features a craftmanship logo and an elegant briefcase menu icon.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './NavigationBar.module.css';
import emblemImage from '../../../assets/emblem.png'; // Import the emblem image

/**
 * ClassicNavigationBar Component
 * ==============================
 */
const NavigationBar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/classic');
  };

  return (
    <header className={classes.header}>
      
      {/* LOGO SECTION - ENHANCED */}
      <div className={classes.logo} onClick={handleLogoClick}>
        
        {/* LUXURY CRAFTMANSHIP EMBLEM - ENHANCED */}
        <div className={classes.craftsmanLogo}>
          
          {/* INNER SHIMMER RING */}
          <div className={classes.shimmerRing}></div>
          
          {/* MAIN CREST WITH ENHANCED EFFECTS */}
          <div className={classes.outerCrest}>
            {/* RADIAL LUXURY BACKDROP */}
            <div className={classes.luxuryBackdrop}></div>
            
            {/* MAIN EMBLEM */}
            <img src={emblemImage} alt="Craftsman Emblem" className={classes.craftSymbol} />
            
            {/* FLOATING SPARKLES */}
            <div className={classes.sparkleEffect}>
              <div className={classes.sparkle} style={{'--delay': '0s', '--duration': '3s'}}></div>
              <div className={classes.sparkle} style={{'--delay': '1s', '--duration': '4s'}}></div>
              <div className={classes.sparkle} style={{'--delay': '2s', '--duration': '3.5s'}}></div>
            </div>
          </div>
        </div>
        
        {/* LOGO TEXT - ORIGINAL WITH UNDERLINE */}
        <div className={classes.logoText}>
          <div>classic</div>
          <div className={classes.primaryText}>
            <div className={classes.textUnderline}></div>
          </div>
          <div>craftmanship</div>
        </div>
      </div>
      
      {/* BRIEFCASE */}
      <div className={classes.briefcase}>
        
        {/* BRIEFCASE HANDLE */}
        <div className={classes.briefcaseHandle}></div>
        
        {/* BRIEFCASE BODY */}
        <div className={classes.briefcaseBody}>
          
          {/* BRIEFCASE BODY: TOP SECTION */}
          <div className={classes.briefcaseTop}>
            <div className={classes.briefcaseLock}>⧫</div>
            <div className={classes.briefcaseLabel}>PORTFOLIO</div>
          </div>
          
          {/* BRIEFCASE BODY: BOTTOM SECTION */}
          <div className={classes.briefcaseBottom}>
            <div className={classes.briefcaseCorners}></div>
          </div>
          
        </div>
        
        {/* BRIEFCASE: PORTFOLIO PAPERS */}
        <div className={classes.portfolioPaper} style={{ 
          '--paper-index': 0, '--paper-angle': '8deg', '--paper-offset': '-15px', '--z-index': 12
        }}></div>
        <div className={classes.portfolioPaper} style={{ 
          '--paper-index': 1, '--paper-angle': '-12deg', '--paper-offset': '-5px', '--z-index': 15
        }}></div>
        <div className={classes.portfolioPaper} style={{ 
          '--paper-index': 2, '--paper-angle': '15deg', '--paper-offset': '8px', '--z-index': 11
        }}></div>
        <div className={classes.portfolioPaper} style={{ 
          '--paper-index': 3, '--paper-angle': '-8deg', '--paper-offset': '18px', '--z-index': 14
        }}></div>
        
      </div>

    </header>
  );
};

export default NavigationBar;