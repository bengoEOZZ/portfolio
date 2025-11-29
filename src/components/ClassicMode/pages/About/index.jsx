/**
 * ABOUT PAGE COMPONENT - CLASSICMODE (OPTIMIZED)
 * ==============================================
 */

import React, { useState, useRef, useEffect, useMemo } from 'react';
import classes from './About.module.css';
import IDCard from '../Contact/IDCard';
import CredentialsCard from './CredentialsCard';
import GymCard from './GymCard';
import hollowKnightIcon from '../../../../assets/hollowNit.png';

/**
 * HOVER DATA CONFIGURATION
 */
const HOVER_DATA = {
  gymCard: {
    type: 'card',
    component: GymCard,
    title: "Elite Fitness Club",
    subtitle: "Premium Membership Card",
    description: "Premium gym membership card that represents my commitment to fitness and personal growth. The place where I challenge myself, build discipline, and move heavy metal for fun.",
    scale: 1.2,
    stats: {
      "Status": "Active",
      "Level": "Elite",
      "Benefits": "Unlimited",
      "Since": "2022"
    }
  },
  credentialsCard: {
    type: 'card',
    component: CredentialsCard,
    title: "Professional Credentials",
    subtitle: "Academic & Work History",
    description: "Credentials card showcasing complete educational and professional background across multiple institutions and experiences.",
    scale: 1.1,
    stats: {
      "Education": "CS Graduate",
      "Institution": "Queen's University",
      "Experience": "Multi-Industry",
      "Companies": "Moneris + Manulife"
    }
  },
  hollowKnight: {
    type: 'info',
    title: "Hollow Knight Emblem",
    subtitle: "Gaming Mastery & Personal Achievement",
    description: "This emblem represents absolute mastery of one of the most challenging and acclaimed metroidvania games ever created. Hollow Knight, developed by Team Cherry, has earned its reputation as a punishingly difficult yet deeply rewarding experience. Whether this emblem signifies achieving the 112% completion rate (yes, there is a +12%), spending hours trying to beat a bug boss that I'm underleveled for, or completing all possible achievements in the game, it stands as a badge of honor that only the most dedicated (or stubborn) players can claim (me). Beyond the challenge, gaming in a general sense offers me rich worlds to explore, compelling stories to experience, and just a very enjoyable experience once you find the right game.",
    stats: {
      "Game": "Hollow Knight",
      "Difficulty": "Legendary",
      "Completion": "112%",
      "Mastery": "Elite"
    },
    icon: hollowKnightIcon
  }
};

/**
 * PERSONAL INFO DATA
 */
const PERSONAL_INFO = [
  { label: "Name", value: "Benjamin Tiong" },
  { label: "Education", value: "Computer Science Graduate" },
  { label: "Focus", value: "Software Development" },
  { label: "Location", value: "Ontario, Canada" },
  { label: "Status", value: "Available for Opportunities" }
];

/**
 * HOVER ZONE CONFIGURATION
 */
const HOVER_ZONES = {
  gymCard: { 
    position: { top: '45px', left: '35px', width: '475px', height: '60px' },
    hoverClass: 'gymHover'
  },
  credentialsCard: { 
    position: { top: '140px', left: '25px', width: '500px', height: '60px' },
    hoverClass: 'credentialsHover'
  },
  hollowKnight: { 
    position: { bottom: '25px', right: '25px', width: '80px', height: '80px' },
    hoverClass: 'hollowKnightHover'
  }
};

/**
 * HoverZone Component
 */
const HoverZone = ({ itemKey, onHover, onLeave }) => {
  const config = HOVER_ZONES[itemKey];
  
  const handleMouseEnter = () => {
    onHover(itemKey);
    const rightInterior = document.querySelector(`.${classes.walletRightInterior}`);
    if (rightInterior) {
      rightInterior.classList.add(classes[config.hoverClass]);
    }
  };

  const handleMouseLeave = () => {
    onLeave();
    const rightInterior = document.querySelector(`.${classes.walletRightInterior}`);
    if (rightInterior) {
      rightInterior.classList.remove(classes[config.hoverClass]);
    }
  };

  return (
    <div
      className={classes.preciseHoverZone}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'absolute', zIndex: 30, cursor: 'pointer', ...config.position }}
      title={HOVER_DATA[itemKey].title}
    />
  );
};

/**
 * About Component
 */
const About = () => {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [hoverItem, setHoverItem] = useState(null);
  const walletContainerRef = useRef(null);

  const toggleWallet = () => setIsWalletOpen(!isWalletOpen);
  const handleItemHover = (itemKey) => isWalletOpen && setHoverItem(itemKey);
  const handleItemLeave = () => setHoverItem(null);

  /**
   * 3D MOUSE TRACKING EFFECT
   */
  useEffect(() => {
    const walletContainer = walletContainerRef.current;
    if (!walletContainer) return;

    const handleMouseMove = (e) => {
      const rect = walletContainer.getBoundingClientRect();
      const intensity = isWalletOpen ? 5 : 15;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = (e.clientX - centerX) / rect.width * intensity;
      const mouseY = (e.clientY - centerY) / rect.height * -intensity;
      walletContainer.style.transform = `rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
    };

    const handleMouseLeave = () => {
      walletContainer.style.transform = '';
    };

    const parentElement = walletContainer.parentElement;
    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isWalletOpen]);

  // Memoize hover popup content to prevent recreation
  const hoverPopupContent = useMemo(() => {
    if (!hoverItem) return null;
    
    const data = HOVER_DATA[hoverItem];
    
    if (data.type === 'card') {
      return (
        <div className={classes.cardPopupContainer}>
          <div className={classes.cardDisplay}>
            {React.createElement(data.component, {
              scale: data.scale,
              className: classes.popupCard
            })}
          </div>
          <div className={classes.cardInfo}>
            <h3 className={classes.cardTitle}>{data.title}</h3>
            <p className={classes.cardSubtitle}>{data.subtitle}</p>
            <p className={classes.cardDescription}>{data.description}</p>
            <div className={classes.cardStats}>
              {Object.entries(data.stats).map(([key, value]) => (
                <div key={key} className={classes.cardStat}>
                  <span className={classes.cardStatLabel}>{key}:</span>
                  <span className={classes.cardStatValue}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className={classes.hoverPopupHeader}>
          <div className={classes.hoverPopupIcon}>
            <img src={data.icon} alt={data.title} />
          </div>
          <div>
            <h3 className={classes.hoverPopupTitle}>{data.title}</h3>
            <p className={classes.hoverPopupSubtitle}>{data.subtitle}</p>
          </div>
        </div>
        <div className={classes.hoverPopupContent}>
          <p className={classes.hoverPopupDescription}>{data.description}</p>
          <div className={classes.hoverPopupStats}>
            {Object.entries(data.stats).map(([key, value]) => (
              <div key={key} className={classes.hoverPopupStat}>
                <span className={classes.hoverPopupStatLabel}>{key}:</span>
                <span className={classes.hoverPopupStatValue}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }, [hoverItem]);

  return (
    <div className={classes.aboutPage}>
      
      {/* HOVER OVERLAY */}
      <div className={`${classes.hoverOverlay} ${hoverItem ? classes.active : ''}`}>
        {hoverItem && (
          <div className={`${classes.hoverPopup} ${HOVER_DATA[hoverItem].type === 'card' ? classes.cardPopup : classes.infoPopup}`}>
            {hoverPopupContent}
          </div>
        )}
      </div>

      {/* PAGE HEADER */}
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>About Me</h1>
        <div className={classes.titleUnderline}></div>
        <p className={classes.pageSubtitle}>
          Personal background, values, and professional journey.
        </p>
      </div>

      {/* THREE-COLUMN LAYOUT */}
      <div className={classes.threeColumnLayout}>
        
        {/* LEFT COLUMN */}
        <div className={`${classes.leftColumn} ${isWalletOpen ? classes.fadeOut : classes.fadeIn}`}>
          <div className={classes.infoSection}>
            <h3 className={classes.sectionTitle}>Personal Information</h3>
            <div className={classes.infoList}>
              {PERSONAL_INFO.map((info, index) => (
                <div key={index} className={classes.infoItem}>
                  <div className={classes.infoLabel}>{info.label}</div>
                  <div className={classes.infoValue}>{info.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN - WALLET */}
        <div className={classes.centerColumn}>
          <div className={classes.contentContainer}>
            <div className={classes.walletSection}>
              <div className={classes.walletWrapper}>
                <div 
                  ref={walletContainerRef}
                  className={`${classes.walletContainer} ${isWalletOpen ? classes.walletOpen : ''}`}
                  onClick={toggleWallet}
                >
                  {/* WALLET EXTERIOR */}
                  <div className={classes.luxuryWallet}>
                    <div className={`${classes.walletCorners} ${classes.cornerTopRight}`}></div>
                    <div className={`${classes.walletCorners} ${classes.cornerBottomRight}`}></div>
                    <div className={classes.walletStitching}></div>
                    <div className={classes.btMonogram}>
                      <div className={classes.btContainer}>
                        <div className={classes.letterB}>B</div>
                        <div className={classes.letterT}>T</div>
                      </div>
                    </div>
                    <div className={classes.luxuryBranding}>HANDCRAFTED</div>
                  </div>

                  {/* WALLET LEFT INTERIOR */}
                  <div className={classes.walletLeftInterior}>
                    <div className={classes.premiumHeader}>Premium Collection</div>
                    <div className={classes.idWindowContainer}>
                      <div className={classes.idWindow}>
                        <div className={classes.idWindowFrame}></div>
                        <IDCard className={classes.walletIDCard} />
                      </div>
                    </div>
                    <div className={classes.interiorEmbroidery}>IDENTIFICATION</div>
                  </div>

                  {/* WALLET RIGHT INTERIOR */}
                  <div className={classes.walletRightInterior}>
                    <div className={classes.cardSlotsContainer}>
                      <div className={classes.cardSlot}>
                        <GymCard scale={0.85} className={classes.slotCard} />
                        <div className={classes.pocketLabel}>FITNESS</div>
                      </div>
                      <div className={classes.cardSlot}>
                        <CredentialsCard scale={0.9} className={classes.slotCard} />
                        <div className={classes.pocketLabel}>CREDENTIALS</div>
                      </div>
                    </div>
                    
                    {/* HOVER ZONES */}
                    {Object.keys(HOVER_ZONES).map(key => (
                      <HoverZone 
                        key={key}
                        itemKey={key}
                        onHover={handleItemHover}
                        onLeave={handleItemLeave}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={`${classes.rightColumn} ${isWalletOpen ? classes.fadeOut : classes.fadeIn}`}>
          <div className={classes.philosophySection}>
            <h3 className={classes.sectionTitle}>Philosophy</h3>
            <div className={classes.philosophyContent}>
              <p className={classes.philosophyText}>
                "Who decides what your limit is? Instead of just overthinking your setbacks,
                just focus on moving forward."
              </p>
              <div className={classes.philosophyAuthor}>- Saitama</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;