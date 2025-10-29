/**
 * ABOUT PAGE COMPONENT - CLASSICMODE
 * ==================================
 * Openable wallet revealing interior card slots with 3D cursor tracking
 */

import React, { useState, useRef, useEffect } from 'react';
import classes from './About.module.css';
import IDCard from '../Contact/IDCard';
import TriFoldIDCard from '../../TriFoldIDCard';
import GymMembershipCard from '../../GymMembershipCard';
import hollowKnightIcon from '../../../../assets/hollowNit.png';

const About = () => {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [hoverItem, setHoverItem] = useState(null);
  const walletRef = useRef(null);
  const walletContainerRef = useRef(null);

  const toggleWallet = () => {
    setIsWalletOpen(!isWalletOpen);
  };

  // Hover item data - Updated with expanded stats
  const hoverData = {
    gymCard: {
      type: 'card',
      component: GymMembershipCard,
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
      component: TriFoldIDCard,
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

  const handleItemHover = (itemKey) => {
    if (isWalletOpen) {
      setHoverItem(itemKey);
    }
  };

  const handleItemLeave = () => {
    setHoverItem(null);
  };

  // 3D Mouse Tracking Effect (from Contact page)
  useEffect(() => {
    const wallet = walletRef.current;
    const walletContainer = walletContainerRef.current;
    
    if (!wallet || !walletContainer) return;

    const handleMouseMove = (e) => {
      const rect = wallet.getBoundingClientRect();
      
      // Greatly reduced intensity when wallet is open
      const intensity = isWalletOpen ? 5 : 15;
      
      const mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width * intensity;
      const mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height * -intensity;
      
      // Fixed: No base transform when open, neutral position
      const baseTransform = isWalletOpen ? '' : '';
      walletContainer.style.transform = `${baseTransform} rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
    };

    const handleMouseLeave = () => {
      // Fixed: Return to neutral position when mouse leaves
      walletContainer.style.transform = isWalletOpen ? '' : '';
    };

    wallet.addEventListener('mousemove', handleMouseMove);
    wallet.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      wallet.removeEventListener('mousemove', handleMouseMove);
      wallet.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isWalletOpen]);

  // Personal data
  const personalInfo = [
    { label: "Name", value: "Benjamin Tiong" },
    { label: "Education", value: "Computer Science Graduate" },
    { label: "Focus", value: "Software Development" },
    { label: "Location", value: "Ontario, Canada" },
    { label: "Status", value: "Available for Opportunities" }
  ];

  return (
    <div className={classes.aboutPage}>
      {/* ENHANCED HOVER OVERLAY WITH CARD COMPONENTS */}
      <div className={`${classes.hoverOverlay} ${hoverItem ? classes.active : ''}`}>
        {hoverItem && (
          <div className={`${classes.hoverPopup} ${hoverData[hoverItem].type === 'card' ? classes.cardPopup : classes.infoPopup}`}>
            {hoverData[hoverItem].type === 'card' ? (
              // CARD DISPLAY MODE - NOW WITH STATS
              <div className={classes.cardPopupContainer}>
                <div className={classes.cardDisplay}>
                  {React.createElement(hoverData[hoverItem].component, {
                    scale: hoverData[hoverItem].scale,
                    className: classes.popupCard
                  })}
                </div>
                <div className={classes.cardInfo}>
                  <h3 className={classes.cardTitle}>{hoverData[hoverItem].title}</h3>
                  <p className={classes.cardSubtitle}>{hoverData[hoverItem].subtitle}</p>
                  <p className={classes.cardDescription}>{hoverData[hoverItem].description}</p>
                  {/* ADDED: Stats section for cards */}
                  <div className={classes.cardStats}>
                    {Object.entries(hoverData[hoverItem].stats).map(([key, value]) => (
                      <div key={key} className={classes.cardStat}>
                        <span className={classes.cardStatLabel}>{key}:</span>
                        <span className={classes.cardStatValue}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // INFO DISPLAY MODE (for Hollow Knight)
              <>
                <div className={classes.hoverPopupHeader}>
                  <div className={classes.hoverPopupIcon}>
                    <img src={hoverData[hoverItem].icon} alt={hoverData[hoverItem].title} />
                  </div>
                  <div>
                    <h3 className={classes.hoverPopupTitle}>{hoverData[hoverItem].title}</h3>
                    <p className={classes.hoverPopupSubtitle}>{hoverData[hoverItem].subtitle}</p>
                  </div>
                </div>
                <div className={classes.hoverPopupContent}>
                  <p className={classes.hoverPopupDescription}>{hoverData[hoverItem].description}</p>
                  <div className={classes.hoverPopupStats}>
                    {Object.entries(hoverData[hoverItem].stats).map(([key, value]) => (
                      <div key={key} className={classes.hoverPopupStat}>
                        <span className={classes.hoverPopupStatLabel}>{key}:</span>
                        <span className={classes.hoverPopupStatValue}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
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
        
        {/* LEFT COLUMN - PERSONAL INFO */}
        <div className={`${classes.leftColumn} ${isWalletOpen ? classes.fadeOut : classes.fadeIn}`}>
          <div className={classes.infoSection}>
            <h3 className={classes.sectionTitle}>Personal Information</h3>
            <div className={classes.infoList}>
              {personalInfo.map((info, index) => (
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
              <div 
                ref={walletRef}
                className={classes.walletWrapper}
              >
                <div 
                  ref={walletContainerRef}
                  className={`${classes.walletContainer} ${isWalletOpen ? classes.walletOpen : ''}`}
                  onClick={toggleWallet}
                >
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

                  <div className={classes.walletLeftInterior}>
                    {/* ENHANCED: Outstanding Premium Collection title */}
                    <div className={classes.premiumHeader}>Premium Collection</div>
                    
                    <div className={classes.idWindowContainer}>
                      <div className={classes.idWindow}>
                        <div className={classes.idWindowFrame}></div>
                        <IDCard className={classes.walletIDCard} />
                      </div>
                    </div>
                    
                    <div className={classes.interiorEmbroidery}>IDENTIFICATION</div>
                  </div>

                  <div className={classes.walletRightInterior}>
                    <div className={classes.cardSlotsContainer}>
                      <div className={classes.cardSlot}>
                        <GymMembershipCard 
                          scale={0.85} 
                          className={classes.slotCard}
                        />
                        <div className={classes.pocketLabel}>FITNESS</div>
                      </div>
                      <div className={classes.cardSlot}>
                        <TriFoldIDCard 
                          scale={0.9} 
                          className={classes.slotCard}
                        />
                        <div className={classes.pocketLabel}>CREDENTIALS</div>
                      </div>
                    </div>

                    {/* ADD: Cat embroidery */}
                    <div className={classes.catEmbroidery}></div>
                    
                    {/* PRECISE HOVER ZONES - Only over visible card parts */}
                    
                    {/* Gym Card Hover Zone - Top visible portion */}
                    <div 
                      className={`${classes.preciseHoverZone} ${classes.gymHoverZone}`}
                      data-target="gym"
                      onMouseEnter={() => {
                        handleItemHover('gymCard');
                        // Add class to parent container
                        document.querySelector(`.${classes.walletRightInterior}`).classList.add(classes.gymHover);
                      }}
                      onMouseLeave={() => {
                        handleItemLeave();
                        // Remove class from parent container
                        document.querySelector(`.${classes.walletRightInterior}`).classList.remove(classes.gymHover);
                      }}
                      style={{
                        position: 'absolute',
                        top: '45px',
                        left: '35px',
                        width: '475px',
                        height: '60px',
                        zIndex: 30,
                        cursor: 'pointer',
                      }}
                      title="Elite Fitness Club - Full Card View"
                    ></div>

                    {/* Credentials Card Hover Zone - Visible portion */}
                    <div 
                      className={`${classes.preciseHoverZone} ${classes.credentialsHoverZone}`}
                      data-target="credentials"
                      onMouseEnter={() => {
                        handleItemHover('credentialsCard');
                        document.querySelector(`.${classes.walletRightInterior}`).classList.add(classes.credentialsHover);
                      }}
                      onMouseLeave={() => {
                        handleItemLeave();
                        document.querySelector(`.${classes.walletRightInterior}`).classList.remove(classes.credentialsHover);
                      }}
                      style={{
                        position: 'absolute',
                        top: '140px',
                        left: '25px',
                        width: '500px',
                        height: '60px',
                        zIndex: 30,
                        cursor: 'pointer',
                      }}
                      title="Professional Credentials - Full Card View"
                    ></div>
                    
                    {/* Hollow Knight Hover Zone - Exact emblem size */}
                    <div 
                      className={`${classes.preciseHoverZone} ${classes.hollowKnightHoverZone}`}
                      data-target="hollowknight"
                      onMouseEnter={() => {
                        handleItemHover('hollowKnight');
                        document.querySelector(`.${classes.walletRightInterior}`).classList.add(classes.hollowKnightHover);
                      }}
                      onMouseLeave={() => {
                        handleItemLeave();
                        document.querySelector(`.${classes.walletRightInterior}`).classList.remove(classes.hollowKnightHover);
                      }}
                      style={{
                        position: 'absolute',
                        bottom: '25px',
                        right: '25px',
                        width: '80px',
                        height: '80px',
                        zIndex: 30,
                        cursor: 'pointer',
                      }}
                      title="Hollow Knight Mastery"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - PHILOSOPHY */}
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