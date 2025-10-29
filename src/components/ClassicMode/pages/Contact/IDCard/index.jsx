import React from 'react';
import classes from './IDCard.module.css';
import BenMoonAvatar from '../../../../../assets/CreativeMode/moonDayAvatar.svg';

const IDCard = ({ 
  name = "BENJAMIN TIONG", 
  title = "SOFTWARE DEVELOPER", 
  subtitle = "PREMIUM CODER",
  profileImage = BenMoonAvatar,
  className = "" 
}) => {
  return (
    <div className={`${classes.idCard} ${className}`}>
      <div className={classes.goldBackground}></div>
      <div className={classes.cardContent}>
        <h1 className={classes.memberName}>{name}</h1>
        <div className={classes.memberTitle}>{title}</div>
        <div className={classes.memberSubtitle}>{subtitle}</div>
        <div className={classes.blackCircle}>
          <img src={profileImage} alt="Profile Avatar" className={classes.avatarImage} />
        </div>
      </div>
    </div>
  );
};

export default IDCard;