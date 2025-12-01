/**
 * ABOUT PAGE COMPONENT - CLASSICMODE
 * ===================================
 * Main About page with three-column layout featuring personal information,
 * an interactive luxury wallet, and a philosophy quote.
 * 
 * LAYOUT STRUCTURE:
 * ----------------
 * Three-column layout:
 *   - Left: Personal information (name, education, location)
 *   - Center: Interactive luxury wallet (handles its own hover popups)
 *   - Right: Philosophy quote section
 * 
 * INTERACTIVE FEATURES:
 * --------------------
 * • Click wallet → Opens/closes with smooth animation (triggers side column fade)
 * • Wallet handles all internal interactions (card hovers, popups, 3D effects)
 * • Side columns automatically fade in/out based on wallet state
 */

import { useState, useCallback } from 'react';
import classes from './About.module.css';
import LuxuryWallet from './LuxuryWallet';

/**
 * PERSONAL INFO DATA
 * ==================
 */
const PERSONAL_INFO = [
  { label: "Name", value: "Benjamin Tiong" },
  { label: "Education", value: "Computer Science Graduate" },
  { label: "Focus", value: "Software Development" },
  { label: "Location", value: "Ontario, Canada" },
  { label: "Status", value: "Available for Opportunities" }
];

/**
 * About Component
 * ===============
 */
const About = () => {
  // STATE MANAGEMENT - Only wallet open/close state (hover logic moved to LuxuryWallet)
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  
  // Toggle wallet open/close - makes sure the state is updated based on previous state
  const toggleWallet = useCallback(() => setIsWalletOpen(prev => !prev), []);

  return (
    <div className={classes.aboutPage}>

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
        
        {/* LEFT COLUMN - Personal info */}
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

        {/* CENTER COLUMN - Interactive Wallet */}
        <div className={classes.centerColumn}>
          <LuxuryWallet isOpen={isWalletOpen} onToggle={toggleWallet} />
        </div>

        {/* RIGHT COLUMN - Philosophy quote*/}
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