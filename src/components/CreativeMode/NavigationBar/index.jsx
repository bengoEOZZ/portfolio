/**
 * NAVIGATION BAR COMPONENT
 * ========================
 * This component renders a cosmic-themed navigation header with the CreativeMode interface.
 * Features a constellation logo with twinkling stars, home page name, and an orbital menu system.
 * 
 * Currently Under Construction, doesnt lead to anything
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