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
      
      {/* LOGO SECTION */}
      <div className={classes.logo} onClick={handleLogoClick}>
        
        {/* LOGO: LUXURY CRAFTMANSHIP EMBLEM */}
        <div className={classes.craftsmanLogo}>
          <div className={classes.outerCrest}>
            <div className={classes.innerCrest}>
              <div className={classes.craftSymbol}>⚜</div>
            </div>
          </div>
        </div>
        
        {/* LOGO: TEXT */}
        <div className={classes.logoText}>
          <div>classic</div>
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