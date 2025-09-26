/**
 * BELT NAVIGATION COMPONENT - WITH REACT ROUTER NAVIGATION
 * ========================================================
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './NavigationBelt.module.css';

const NavigationBelt = ({ onNavigationStart, isBeltFading, startTransition }) => {
  const navigate = useNavigate();

  const handleCardClick = (cardType) => {
    // Don't start transition for home button
    if (cardType === 'home') {
      navigate('/classic');
      return;
    }

    // Use the unified transition hook
    startTransition(() => {
      switch(cardType) {
        case 'about':
          navigate('/classic/about');
          break;
        case 'coding':
          navigate('/classic/coding');
          break;
        case 'projects':
          navigate('/classic/projects');
          break;
        case 'contact':
          navigate('/classic/contact');
          break;
        default:
          navigate('/classic');
          break;
      }
    });

    // Trigger the fade animation callback
    if (onNavigationStart) {
      onNavigationStart(cardType);
    }
  };

  const handleHomeClick = () => {
    handleCardClick('home');
  };

  return (
    <div className={`${classes.navCards} ${isBeltFading ? classes.beltFading : ''}`}>
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
      <div className={classes.navBuckle} onClick={handleHomeClick}>
        <div className={classes.craftSymbol}>⚜</div>
      </div>
      
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