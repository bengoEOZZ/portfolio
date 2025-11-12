import React from 'react';
import classes from './GymCard.module.css';
import dumbbellIcon from '../../../../../assets/dumbell.png';

const GymCard = ({ scale = 1, className }) => {
  const wrapperStyle = {
    '--scale-factor': scale
  };

  return (
    <div 
      className={`${classes.cardWrapper} ${className || ''}`}
      style={wrapperStyle}
    >
      <div className={classes.gymCardRose}>
        <div className={classes.roseGoldGradient}></div>
        
        <div className={classes.minimalContent}>
          {/* Elite Badge */}
          <div className={classes.eliteBadge}>
            <span className={classes.eliteText}>ELITE</span>
          </div>
          
          {/* Regular Gym Brand */}
          <div className={classes.gymBrand}>
            <div className={classes.gymName}>FITNESS CLUB</div>
            <div className={classes.gymTagline}>HEALTH & WELLNESS</div>
          </div>
          
          {/* CENTERPIECE - Big Dumbbell Focus */}
          <div className={classes.centerpiece}>
            <div className={classes.dumbbellContainer}>
              <img src={dumbbellIcon} alt="Gym Member" className={classes.mainDumbbell} />
            </div>
            <div className={classes.membershipFocus}>
              <div className={classes.primaryStatus}>GYM MEMBER</div>
              <div className={classes.accessLevel}>FULL ACCESS</div>
            </div>
          </div>
          
        </div>
        
        <div className={classes.shimmerEffect}></div>
        <div className={classes.elegantAccents}></div>
      </div>
    </div>
  );
};

export default GymCard;