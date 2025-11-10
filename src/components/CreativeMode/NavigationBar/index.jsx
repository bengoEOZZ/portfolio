/**
 * NAVIGATION BAR COMPONENT
 * ========================
 * This component renders a cosmic-themed navigation header for the CreativeMode interface.
 * Features a constellation logo with twinkling stars, animated home page logo, and an 
 * orbital menu system with rotating planets around a central sun.
 * 
 * VISUAL STRUCTURE:
 * -----------------
 * 1. Logo Section (Left):
 *    - Constellation: 5 twinkling stars with random animation delays
 *    - Title Text: "cosmic creativity" with glow effect
 * 2. Orbital Menu (Right):
 *    - Central Sun: Pulsing glow with radial gradient
 *    - 4 Orbiting Planets: Circular orbit paths with staggered delays
 * 
 * INTERACTIVE FEATURES:
 * ---------------------
 * Logo Click: Navigate back to home/landing page (under construction)
 * Orbital Menu Click: Opens settings or navigation panel (under construction)
 * Hover Effects: Brighter and more visually engaging animations for the orbital menu on hover
 */

import classes from './NavigationBar.module.css';

/**
 * SpaceNavigationBar Component
 * ===========================
 */
const NavigationBar = () => {
  /**
   * Temporary click handler for under construction features
   */
  const handleUnderConstruction = () => {
    alert('🚧 Under Construction 🚧\n\nThis feature is currently being developed!');
  };

  return (
    <header className={classes.header}>
      
      {/* LOGO SECTION */}
      <div className={classes.logoContainer}>
        {/* LOGO: CONSTELLATION */}
        <div className={classes.logoConstellation}>
          {/* STAR CLUSTER */}
          <div className={classes.star}></div>
          <div className={classes.star}></div>
          <div className={classes.star}></div>
          <div className={classes.star}></div>
          <div className={classes.star}></div>
        </div>
        {/* LOGO: TITLE TEXT */}
        <div className={classes.logoText}>
          cosmic<br/>creativity
        </div>
      </div>
      
      {/* ORBITAL MENU SYSTEM */}
      <div className={classes.orbitalMenu} onClick={handleUnderConstruction}> {/* Temporary alert handler */}
        {/* SUN */}
        <div className={classes.orbitalSun}></div>
        {/* ORBITING PLANETS */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className={classes.orbitingPlanet} style={{ '--orbit-delay': `${i * 0.5}s` }}></div>
        ))}
      </div>

    </header>
  );
};

export default NavigationBar;