/**
 * BRIEFCASE COMPONENT
 * ===================
 * Interactive luxury briefcase with dropdown navigation menu.
 * 
 * COMPONENT ARCHITECTURE:
 * -----------------------
 * Body: Luxury briefcase with diamond and corner ornaments
 * Interior: Visible when opened, creates depth effect
 * Dropdown Menu: Animated menu with luxury icons (wallet, cards, documents, business card)
 * 
 * INTERACTIONS:
 * -------------
 * Click Briefcase: Shake animation followed by menu open/close
 * Click Menu Items: Navigate to respective pages with page transition
 * Click Outside: Automatically closes menu
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Briefcase.module.css';

/**
 * MENU ITEMS CONFIGURATION
 * =========================
 */
const MENU_ITEMS = [
  {
    id: 'about',
    label: 'about',
    path: '/classic/about',
    icon: 'wallet'
  },
  {
    id: 'coding',
    label: 'coding',
    path: '/classic/coding',
    icon: 'cardDeck'
  },
  {
    id: 'projects',
    label: 'projects',
    path: '/classic/projects',
    icon: 'documentStack'
  },
  {
    id: 'contact',
    label: 'contact',
    path: '/classic/contact',
    icon: 'businessCard'
  }
];

/**
 * ICON COMPONENTS MAP
 * ===================
 * Maps icon names to their JSX structure
 */
const ICON_COMPONENTS = {
  wallet: (
    <div className={classes.wallet}>
      <div className={classes.walletBack}></div>
      <div className={classes.walletFlap}></div>
      <div className={classes.walletClasp}></div>
    </div>
  ),
  cardDeck: (
    <div className={classes.cardDeck}>
      <div className={classes.card}></div>
      <div className={classes.card}></div>
      <div className={classes.card}></div>
    </div>
  ),
  documentStack: (
    <div className={classes.documentStack}>
      <div className={classes.document}></div>
      <div className={classes.document}></div>
      <div className={classes.document}></div>
    </div>
  ),
  businessCard: (
    <div className={classes.businessCard}>
      <div className={classes.cardBase}></div>
      <div className={classes.cardInitial}>BT</div>
    </div>
  )
};

/**
 * Briefcase Component
 * ===================
 */
const Briefcase = ({ startTransition }) => {
  const navigate = useNavigate();
  
  /* STATE MANAGEMENT */
  const [isMenuOpen, setIsMenuOpen] = useState(false);       // Tracks whether dropdown menu is visible
  const [isShaking, setIsShaking] = useState(false);         // Controls briefcase shake animation
  const [isClosing, setIsClosing] = useState(false);         // Triggers menu closing animation
  
  /* REFS */
  const briefcaseRef = useRef(null);                         // Reference to briefcase element for outside click detection
  
  /**
   * BRIEFCASE CLICK HANDLER
   * =======================
   * Opens menu with shake animation if closed, or triggers close animation if open.
   * 
   * ANIMATION SEQUENCE:
   * ------------------
   * Opening: Shake (600ms) → Menu appears
   * Closing: Menu fade-out (900ms total with staggered delays)
   */
  const handleBriefcaseClick = () => {
    if (!isMenuOpen) {
      // Trigger shake animation before opening
      setIsShaking(true);
      setIsClosing(false);
      setTimeout(() => {
        setIsShaking(false);
        setIsMenuOpen(true);
      }, 600);                                               // Match shake animation duration
    } else {
      // Trigger closing animation
      closeMenu();
    }
  };

  /**
   * CLOSE MENU HANDLER
   * ==================
   * Triggers staggered fade-out animation for menu items before removing menu from DOM.
   */
  const closeMenu = () => {
    setIsClosing(true);
    
    // Wait for all animations to complete before unmounting
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 900);                                                 // 0.5s animation + 0.4s delay for last item
  };

  /**
   * OUTSIDE CLICK DETECTION
   * =======================
   * Automatically closes menu when user clicks outside the briefcase area.
   * Event listener is only active when menu is open for performance.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && briefcaseRef.current && !briefcaseRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    // Attach listener only when menu is open
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup function removes listener on unmount or when menu closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  /**
   * COMPONENT OUTPUT
   * ================
   */
  return (
    <div 
      ref={briefcaseRef}
      className={`${classes.briefcase} ${isShaking ? classes.shake : ''} ${isMenuOpen ? classes.open : ''}`}
      onClick={handleBriefcaseClick}
    >
      
      {/* BRIEFCASE HANDLE */}
      <div className={classes.briefcaseHandle}></div>
      
      {/* BRIEFCASE INTERIOR - STAYS IN PLACE (behind everything) */}
      <div className={classes.briefcaseInterior}>
        <div className={classes.interiorCreature}></div>
        <div className={classes.interiorBorder}></div>
      </div>
      
      {/* LUXURY BRIEFCASE BODY (Rotates Downwards Upon Open) */}
      <div className={classes.briefcaseBody}>
        
        {/* BREIFCASE - TOP SECTION */}
        <div className={classes.briefcaseTop}>
            <div className={classes.briefcaseDiamond}>◆</div>
          <div className={classes.briefcaseLabel}>PORTFOLIO</div>
        </div>
        
        {/* CORNER ORNAMENTS (matching logo style) */}
        <div className={classes.cornerOrnament}></div>
        <div className={classes.cornerOrnament}></div>
        <div className={classes.cornerOrnament}></div>
        <div className={classes.cornerOrnament}></div>
        
      </div>
      
      {/* DROPDOWN MENU - Luxury items with fade animations */}
      {(isMenuOpen || isClosing) && (
        <div className={`${classes.dropdownMenu} ${isClosing ? classes.closing : ''}`}>
          {/* Dynamically render menu items from MENU_ITEMS array */}
          {MENU_ITEMS.map((item) => (
            <div 
              key={item.id}                                  // Unique key for React list rendering
              className={classes.menuItem}
              onClick={(e) => {
                e.stopPropagation();                         // Prevent briefcase click from triggering
                closeMenu();                                 // Trigger staggered close animation
                // Navigate with page transition if available
                if (startTransition) {
                  startTransition(() => {
                    navigate(item.path);                     // Navigate within transition
                  });
                } else {
                  navigate(item.path);                       // Fallback navigation
                }
              }}
            >
              {/* Icon container with mapped icon component (Sparkle effect upon hover) */}
              <div className={classes.luxuryIcon}>
                {ICON_COMPONENTS[item.icon]}
                <div className={classes.sparkle1}></div>
                <div className={classes.sparkle2}></div>
                <div className={classes.sparkle3}></div>
              </div>
              {/* Menu item label */}
              <span className={classes.menuLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Briefcase;
