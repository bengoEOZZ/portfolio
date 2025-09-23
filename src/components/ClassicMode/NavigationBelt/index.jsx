/**
 * BELT NAVIGATION COMPONENT - SIMPLIFIED VERSION
 * ==============================================
 */

import React from 'react';
import classes from './NavigationBelt.module.css';

const NavigationBelt = ({ onNavigationStart }) => {

  const handleCardClick = (cardType) => {
    // Trigger HelloText fade-out immediately
    if (onNavigationStart) {
      onNavigationStart(cardType);
    }
  };

  return (
    <div className={classes.navCards}>
      {/* DIAMOND SHIMMER EFFECT */}
      <div className={classes.diamondShimmerEffect}></div>
      
      <div 
        className={classes.navCard}
        onClick={() => handleCardClick('about')}
      >
        <div className={classes.cardAbbrev}>Ab</div>
        <div className={classes.cardLabel}>about</div>
      </div>
      <div 
        className={classes.navCard}
        onClick={() => handleCardClick('coding')}
      >
        <div className={classes.cardAbbrev}>Co</div>
        <div className={classes.cardLabel}>coding</div>
      </div>
      
      {/* Belt buckle in center */}
      <div className={classes.navBuckle}></div>
      
      <div 
        className={classes.navCard}
        onClick={() => handleCardClick('projects')}
      >
        <div className={classes.cardAbbrev}>Pr</div>
        <div className={classes.cardLabel}>projects</div>
      </div>
      <div 
        className={classes.navCard}
        onClick={() => handleCardClick('contact')}
      >
        <div className={classes.cardAbbrev}>Ct</div>
        <div className={classes.cardLabel}>contact</div>
      </div>
    </div>
  );
};

export default NavigationBelt;