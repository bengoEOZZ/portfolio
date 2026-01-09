/**
 * LUXURY WALLET COMPONENT
 * =======================
 * Interactive luxury wallet with 3D mouse tracking, ID card display,
 * credential card slots, and hover popups.
 * 
 * COMPONENT STRUCTURE:
 * -------------------
 * 1. WALLET EXTERIOR (Closed State)
 *    • Leather texture background (fine grain dot patterns)
 *    • BT monogram (overlapping B and T letters with gold gradient)
 *    • Golden stitching border (animated pulsing effect)
 *    • Corner accents (top-right and bottom-right gold pieces)
 *    • "HANDCODED" branding text (bottom-left)
 * 
 * 2. WALLET LEFT INTERIOR (Opens Left)
 *    • "Premium Collection" header (gold animated text)
 *    • ID card (from Contact page) inside window
 *    • ID card window (plastic cover effect with frame)
 *    • "IDENTIFICATION" label (bottom)
 * 
 * 3. WALLET RIGHT INTERIOR (Opens Right)
 *    • Card slots container with fabric pockets
 *    • First pocket: Gym membership card (FITNESS label)
 *    • Second pocket: Credentials card (CREDENTIALS label)
 *    • Hollow Knight emblem (bottom-right corner with glow)
 *    • Invisible hover zones for interactive popups
 * 
 * INTERACTIVE FEATURES:
 * --------------------
 * • Click wallet exterior → Opens wallet (left/right interiors slide out)
 * • Click again → Closes wallet (interiors slide back, exterior returns)
 * • Mouse move over wallet → 3D tilt effect follows cursor
 * • Hover over gym card zone → Card lifts up, shows detailed popup with gym info
 * • Hover over credentials zone → Card lifts up, shows popup with work/education
 * • Hover over Hollow Knight → Icon scales up, shows popup with game achievements
 * • Mouse leave → All hover effects reset, popups disappear
 */

import React, { useState, useMemo, useRef, useCallback } from 'react';
import classes from './LuxuryWallet.module.css';
import IDCard from '../../Contact/IDCard';
import CredentialsCard from '../CredentialsCard';
import GymCard from '../GymCard';
import hollowKnightIcon from '../../../../../assets/ClassicMode/hollowKnightEmblem.png';
import use3DMouseTracking from '../../../../../hooks/ClassicMode/use3DMouseTracking';

/**
 * HOVER DATA CONFIGURATION
 * ========================
 * Content for each hoverable wallet item.
 */
const HOVER_DATA = {
  // Gym membership card popup
  gymCard: {
    type: 'card',
    component: GymCard,
    title: "Elite Fitness Club",
    subtitle: "Premium Membership Card",
    description: "Premium gym membership card that represents my commitment to fitness and personal growth. The place where I challenge myself, build discipline, and move heavy metal for fun.",
    stats: {
      "Status": "Active",
      "Level": "Elite",
      "Benefits": "Unlimited",
      "Since": "2022"
    }
  },
  // Professional credentials card popup
  credentialsCard: {
    type: 'card',
    component: CredentialsCard,
    title: "Professional Credentials",
    subtitle: "Academic & Work History",
    description: "Credentials card showcasing complete educational and professional background across multiple institutions and experiences.",
    stats: {
      "Education": "CS Graduate",
      "Institution": "Queen's University",
      "Experience": "Multi-Industry",
      "Companies": "Moneris + Manulife"
    }
  },
  // Hollow Knight emblem popup (info type, not card)
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
 * HOVER ZONE CONFIGURATION
 * ========================
 * Position and styling configuration for each interactive hover zone.
 */
const HOVER_ZONES = {
  gymCard: { 
    position: { top: '2.34vw', left: '16vw', width: '24.74vw', height: '3.13vw' },  /* 45px, 35px, 475px, 60px → vw */
    mobilePosition: { top: '-1vw', left: '16vw', width: '24.74vw', height: '3.13vw' },  /* Adjust as needed */
    hoverClass: 'gymCardHover'
  },
  credentialsCard: { 
    position: { top: '7.29vw', left: '15.5vw', width: '26.04vw', height: '3.13vw' },   /* 140px, 25px, 500px, 60px → vw */
    mobilePosition: { top: '4vw', left: '15.5vw', width: '26.04vw', height: '3.13vw' },  /* Adjust as needed */
    hoverClass: 'credentialsCardHover'
  },
  hollowKnight: { 
    position: { bottom: '1.3vw', left: '36vw', width: '4.17vw', height: '4.17vw' }, /* 25px, 25px, 80px, 80px → vw */
    mobilePosition: { bottom: '1.3vw', left: '36.5vw', width: '4.17vw', height: '4.17vw' },  /* Adjust as needed */
    hoverClass: 'hollowKnightHover'
  }
};

/**
 * HoverZone Component
 * ===================
 * Invisible interactive zone that triggers hover effects.
 */
const HoverZone = React.memo(({ itemKey, onHover, onLeave, isOpen }) => {
  // Get hover configuration for this zone
  const config = HOVER_ZONES[itemKey];
  
  // Detect mobile to use appropriate positioning
  const isMobile = useMemo(() => {
    return window.matchMedia('(max-height: 600px) and (orientation: landscape)').matches;
  }, []);
  
  // Use mobile position if available and on mobile, otherwise use desktop position
  const position = isMobile && config.mobilePosition ? config.mobilePosition : config.position;
  
  // Handle mouse entering the hover zone
  const handleMouseEnter = useCallback(() => {
    // Only trigger hover if wallet is open
    if (!isOpen) return;
    
    // Notify parent component to show popup
    onHover(itemKey);
    // Find the wallet's right interior element in the DOM
    const rightInterior = document.querySelector(`.${classes.walletRightInterior}`);
    if (rightInterior) {
      // Add hover-specific class to trigger card lift animation
      rightInterior.classList.add(classes[config.hoverClass]);
    }
  }, [itemKey, onHover, config.hoverClass, isOpen]);

  // Handle mouse leaving the hover zone
  const handleMouseLeave = useCallback(() => {
    // Notify parent to hide popup
    onLeave();
    // Find the wallet's right interior element in the DOM
    const rightInterior = document.querySelector(`.${classes.walletRightInterior}`);
    if (rightInterior) {
      // Remove hover class to reset card position back to slot
      rightInterior.classList.remove(classes[config.hoverClass]);
    }
  }, [onLeave, config.hoverClass]);

  // Render invisible div positioned over the card using absolute positioning
  return (
    <div
      className={classes.preciseHoverZone}
      onMouseEnter={handleMouseEnter}  // Trigger lift animation and show popup
      onMouseLeave={handleMouseLeave}  // Reset card position and hide popup
      style={{ 
        position: 'absolute',  // Position over card in wallet
        zIndex: 9999,          // Above all 3D transformed elements
        //backgroundColor: 'rgba(255, 0, 0, 0.3)',  // Debug visualization
        ...position            // top/left/width/height from HOVER_ZONES config (mobile or desktop)
      }}
    />
  );
});

/**
 * LuxuryWallet Component
 * ======================
 * Main wallet component with 3D tracking, card displays, and hover popups.
 */
const LuxuryWallet = ({ isOpen, onToggle, skipCards = false }) => {
  const walletContainerRef = useRef(null);
  
  // ENTRANCE ANIMATION STATE
  const [isEntering, setIsEntering] = useState(true);
  
  // HOVER STATE - Track which item is being hovered
  const [hoverItem, setHoverItem] = useState(null);
  
  // MOBILE DETECTION - Matches CSS media query
  const isMobile = useMemo(() => {
    return window.matchMedia('(max-height: 600px) and (orientation: landscape)').matches;
  }, []);
  
  // Handle hover enter - set which item is hovered
  const handleItemHover = useCallback((itemKey) => {
    setHoverItem(itemKey);
  }, []);
  
  // Handle hover leave - clear hovered item
  const handleItemLeave = useCallback(() => {
    setHoverItem(null);
  }, []);

  // Handle wallet click - prevent closing on mobile once opened
  const handleWalletClick = useCallback(() => {
    // On mobile, only allow opening (not closing)
    if (isMobile && isOpen) {
      return; // Do nothing if wallet is already open on mobile
    }
    // Clear hover state and CSS classes when closing the wallet
    if (isOpen) {
      setHoverItem(null);
      // Remove all hover classes from the right interior
      const rightInterior = document.querySelector(`.${classes.walletRightInterior}`);
      if (rightInterior) {
        Object.values(HOVER_ZONES).forEach(zone => {
          rightInterior.classList.remove(classes[zone.hoverClass]);
        });
      }
    }
    // On desktop or when opening on mobile, proceed normally
    onToggle();
  }, [isMobile, isOpen, onToggle]);

  /**
   * BUILD POPUP CONTENT
   * ===================
   */
  const hoverPopupContent = useMemo(() => {
    // No hover? Don't show anything
    if (!hoverItem) return null;
    
    // Get the data for whichever item is being hovered
    const data = HOVER_DATA[hoverItem];
    
    // IF IT'S A CARD TYPE (gym or credentials card)
    if (data.type === 'card') {
      // Grab the card component (either GymCard or CredentialsCard) from the data
      const CardComponent = data.component;
      return (
        <div className={classes.cardPopupContainer}>
          {/* CARD DISPLAY */}
          <div className={classes.cardDisplay}>
            {/* Render the card with styling and animations turned off (CredentialsCard) */}
            <CardComponent disableAnimations={true} />
          </div>
          {/* Card information section */}
          <div className={classes.cardInfo}>
            <h3 className={classes.cardTitle}>{data.title}</h3>
            <p className={classes.cardSubtitle}>{data.subtitle}</p>
            <p className={classes.cardDescription}>{data.description}</p>
            {/* Stats grid - displays key-value pairs in a 2-column layout */}
            <div className={classes.popupStats}>
              {Object.entries(data.stats).map(([key, value]) => (
                <div key={key} className={classes.popupStat}>
                  <span className={classes.popupStatLabel}>{key}:</span>
                  <span className={classes.popupStatValue}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    // OTHERWISE IT'S AN INFO TYPE (Hollow Knight emblem) - simpler layout with icon
    return (
      <>
        {/* INFO DISPLAY */}
        <div className={classes.hoverPopupHeader}>
          {/* ICON DISPLAY */}
          <div className={classes.hoverPopupIcon}>
            {/* Icon image (Hollow Knight emblem) */}
            <img src={data.icon} alt={data.title} />
          </div>
          {/* Title and subtitle */}
          <div>
            <h3 className={classes.hoverPopupTitle}>{data.title}</h3>
            <p className={classes.hoverPopupSubtitle}>{data.subtitle}</p>
          </div>
        </div>
        {/* Icon Information Section */}
        <div className={classes.hoverPopupContent}>
          <p className={classes.hoverPopupDescription}>{data.description}</p>
          {/* Stats grid - same key:value pattern as card type */}
          <div className={classes.popupStats}>
            {Object.entries(data.stats).map(([key, value]) => (
              <div key={key} className={classes.popupStat}>
                <span className={classes.popupStatLabel}>{key}:</span>
                <span className={classes.popupStatValue}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }, [hoverItem]);

  /**
   * 3D MOUSE TRACKING EFFECT
   * ========================
   * Creates 3D rotation effect based on mouse position.
   * Adjusts intensity based on wallet open/closed state.
   */
  use3DMouseTracking(walletContainerRef, { intensity: isOpen ? 5 : 15 }, [isOpen]);

  return (
    <>
      {/* POPUP OVERLAY - Only shows when hoverItem has a value (user is hovering something) */}
      {hoverItem && (
        // Full-screen dark overlay that sits behind everything
        <div className={`${classes.hoverOverlay} ${classes.active}`}>
          <div className={`${classes.hoverPopup} ${HOVER_DATA[hoverItem].type === 'card' ? classes.cardPopup : ''}`}>
            {hoverPopupContent}
          </div>
        </div>
      )}

      {/* WALLET SECTION */}
      <div className={classes.walletSection}>
        <div 
          className={`${classes.walletWrapper} ${isEntering ? classes.entering : ''}`}
          onAnimationEnd={() => setIsEntering(false)}
          onClick={handleWalletClick}
        >
          {/* Main container - ref enables 3D tracking */}
          <div ref={walletContainerRef} className={`${classes.walletContainer}
            ${isOpen ? classes.walletOpen : ''}`}>

          {/* WALLET EXTERIOR - Closed leather wallet with BT monogram */}
          <div className={classes.luxuryWallet}>
            {/* Gold corners (top-right and bottom-right) */}
            <div className={`${classes.walletCorners} ${classes.cornerTopRight}`}></div>
            <div className={`${classes.walletCorners} ${classes.cornerBottomRight}`}></div>
            {/* Animated gold stitching border */}
            <div className={classes.walletStitching}></div>
            {/* BT monogram with overlapping B and T letters */}
            <div className={classes.btMonogram}>
              <div className={classes.btContainer}>
                <div className={classes.letterB}>B</div>
                <div className={classes.letterT}>T</div>
              </div>
            </div>
            {/* Bottom-left branding text */}
            <div className={classes.luxuryBranding}>HANDCODED</div>
          </div>

          {/* WALLET LEFT INTERIOR - Opens left, displays ID card */}
          <div className={classes.walletLeftInterior}>
            {/* Gold animated header text */}
            <div className={classes.premiumHeader}>Premium Collection</div>
            {/* ID card window with plastic cover effect */}
            <div className={classes.idWindowContainer}>
              <div className={classes.idWindow}>
                <div className={classes.idWindowFrame}></div>
                {/* ID Card component */}
                <IDCard />
              </div>
            </div>
            {/* Bottom label */}
            <div className={classes.idSectionLabel}>IDENTIFICATION</div>
          </div>

          {/* WALLET RIGHT INTERIOR - Opens right, displays card slots */}
          <div className={classes.walletRightInterior}>
            {/* Two fabric pocket slots for cards */}
            <div className={classes.cardSlotsContainer}>
              {/* First pocket - Gym membership card */}
              <div className={classes.cardSlot}>
                {!skipCards && <GymCard scale={0.85} className={classes.card} />}
                <div className={classes.cardLabel}>FITNESS</div>
              </div>
              {/* Second pocket - Credentials card */}
              <div className={classes.cardSlot}>
                {!skipCards && <CredentialsCard scale={0.9} className={classes.card} />}
                <div className={classes.cardLabel}>CREDENTIALS</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* HOVER ZONES - Outside 3D context to avoid perspective issues */}
        {isOpen && Object.keys(HOVER_ZONES).map(key => (
          <HoverZone 
            key={key}
            itemKey={key}
            onHover={handleItemHover}
            onLeave={handleItemLeave}
            isOpen={isOpen}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default LuxuryWallet;

