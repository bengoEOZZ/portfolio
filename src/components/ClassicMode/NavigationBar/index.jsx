/**
 * NAVIGATION BAR COMPONENT
 * ========================
 * 
 * Renders a sophisticated navigation header for the ClassicMode interface.
 * Features a craftmanship logo and an elegant briefcase menu icon.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from './NavigationBar.module.css';
import emblemImage from '../../../assets/emblem.png';

/**
 * ClassicNavigationBar Component
 * ==============================
 */
const NavigationBar = ({ startTransition }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const briefcaseRef = useRef(null); // Reference to briefcase element
  
  const handleLogoClick = () => {
    if (location.pathname === '/classic' || location.pathname === '/classic/') {
      return;
    }
    
    if (startTransition) {
      startTransition(() => {
        navigate('/classic');
      });
    } else {
      navigate('/classic');
    }
  };

  const handleBriefcaseClick = () => {
    if (!isMenuOpen) {
      // Shake animation first
      setIsShaking(true);
      setIsClosing(false);
      setTimeout(() => {
        setIsShaking(false);
        setIsMenuOpen(true);
      }, 600);
    } else {
      // Start closing animation
      closeMenu();
    }
  };

  const closeMenu = () => {
    setIsClosing(true);
    
    // Wait for animation to complete before removing menu
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 900); // 0.5s animation + 0.4s delay for last item
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && briefcaseRef.current && !briefcaseRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className={classes.header}>
      
      {/* LOGO SECTION */}
      <div className={classes.logo} onClick={handleLogoClick}>
        
        {/* LUXURY CRAFTMANSHIP EMBLEM */}
        <div className={classes.craftsmanLogo}>
          <div className={classes.shimmerRing}></div>
          
          <div className={classes.outerCrest}>
            <div className={classes.luxuryBackdrop}></div>
            <img src={emblemImage} alt="Craftsman Emblem" className={classes.craftSymbol} />
            
            <div className={classes.sparkleEffect}>
              <div className={classes.sparkle} style={{'--delay': '0s', '--duration': '3s'}}></div>
              <div className={classes.sparkle} style={{'--delay': '1s', '--duration': '4s'}}></div>
              <div className={classes.sparkle} style={{'--delay': '2s', '--duration': '3.5s'}}></div>
            </div>
          </div>
        </div>
        
        {/* LOGO TEXT */}
        <div className={classes.logoText}>
          <div>classic</div>
          <div className={classes.primaryText}>
            <div className={classes.textUnderline}></div>
          </div>
          <div>craftmanship</div>
        </div>
      </div>
      
      {/* REDESIGNED BRIEFCASE */}
      <div 
        ref={briefcaseRef}
        className={`${classes.briefcase} ${isShaking ? classes.shake : ''} ${isMenuOpen ? classes.open : ''}`}
        onClick={handleBriefcaseClick}
      >
        
        {/* ORNATE HANDLE WITH SHIMMER */}
        <div className={classes.briefcaseHandle}>
          <div className={classes.handleShimmer}></div>
        </div>
        
        {/* BRIEFCASE INTERIOR - STAYS IN PLACE (behind everything) */}
        <div className={classes.briefcaseInterior}>
          <div className={classes.interiorGradient}></div>
          <div className={classes.interiorBorder}></div>
        </div>
        
        {/* LUXURY BRIEFCASE BODY - THIS ROTATES */}
        <div className={classes.briefcaseBody}>
          
          {/* RADIAL BACKDROP (like logo) */}
          <div className={classes.briefcaseBackdrop}></div>
          
          {/* ORNAMENTAL BORDER */}
          <div className={classes.ornamentalBorder}></div>
          
          {/* TOP SECTION WITH DIAMOND LOCK */}
          <div className={classes.briefcaseTop}>
            {/* DIAMOND LOCK WITH GLOW */}
            <div className={classes.briefcaseLock}>
              <div className={classes.lockGlow}></div>
              <div className={classes.lockDiamond}>◆</div>
            </div>
            
            {/* ELEGANT LABEL */}
            <div className={classes.briefcaseLabel}>PORTFOLIO</div>
          </div>
          
          {/* CORNER ORNAMENTS (matching logo style) */}
          <div className={classes.cornerOrnament} style={{'--position': 'top-left'}}></div>
          <div className={classes.cornerOrnament} style={{'--position': 'top-right'}}></div>
          <div className={classes.cornerOrnament} style={{'--position': 'bottom-left'}}></div>
          <div className={classes.cornerOrnament} style={{'--position': 'bottom-right'}}></div>
          
        </div>
        
        {/* DROPDOWN MENU - Luxury items with fade animations */}
        {(isMenuOpen || isClosing) && (
          <div className={`${classes.dropdownMenu} ${isClosing ? classes.closing : ''}`}>
            
            {/* ABOUT - Folded Wallet Icon */}
            <div 
              className={classes.menuItem}
              onClick={(e) => {
                e.stopPropagation();
                closeMenu();
                // Navigate to about page
                if (startTransition) {
                  startTransition(() => {
                    navigate('/classic/about');
                  });
                } else {
                  navigate('/classic/about');
                }
              }}
            >
              <div className={classes.luxuryIcon}>
                <div className={classes.wallet}>
                  <div className={classes.walletBack}></div>
                  <div className={classes.walletFlap}></div>
                  <div className={classes.walletClasp}></div>
                </div>
              </div>
              <span className={classes.menuLabel}>about</span>
            </div>
            
            {/* CODING - Deck of Cards Icon */}
            <div 
              className={classes.menuItem}
              onClick={(e) => {
                e.stopPropagation();
                closeMenu();
                // Navigate to coding page
                if (startTransition) {
                  startTransition(() => {
                    navigate('/classic/coding');
                  });
                } else {
                  navigate('/classic/coding');
                }
              }}
            >
              <div className={classes.luxuryIcon}>
                <div className={classes.cardDeck}>
                  <div className={classes.card} style={{'--offset': '0'}}></div>
                  <div className={classes.card} style={{'--offset': '1'}}></div>
                  <div className={classes.card} style={{'--offset': '2'}}></div>
                </div>
              </div>
              <span className={classes.menuLabel}>coding</span>
            </div>
            
            {/* PROJECTS - Stack of Documents Icon */}
            <div 
              className={classes.menuItem}
              onClick={(e) => {
                e.stopPropagation();
                closeMenu();
                // Navigate to projects page
                if (startTransition) {
                  startTransition(() => {
                    navigate('/classic/projects');
                  });
                } else {
                  navigate('/classic/projects');
                }
              }}
            >
              <div className={classes.luxuryIcon}>
                <div className={classes.documentStack}>
                  <div className={classes.document} style={{'--layer': '0'}}></div>
                  <div className={classes.document} style={{'--layer': '1'}}></div>
                  <div className={classes.document} style={{'--layer': '2'}}></div>
                </div>
              </div>
              <span className={classes.menuLabel}>projects</span>
            </div>
            
            {/* CONTACT - Business Card Icon */}
            <div 
              className={classes.menuItem}
              onClick={(e) => {
                e.stopPropagation();
                closeMenu();
                // Navigate to contact page
                if (startTransition) {
                  startTransition(() => {
                    navigate('/classic/contact');
                  });
                } else {
                  navigate('/classic/contact');
                }
              }}
            >
              <div className={classes.luxuryIcon}>
                <div className={classes.businessCard}>
                  <div className={classes.cardBase}></div>
                  <div className={classes.cardInitial}>BT</div>
                </div>
              </div>
              <span className={classes.menuLabel}>contact</span>
            </div>
            
          </div>
        )}
        
      </div>

    </header>
  );
};

export default NavigationBar;