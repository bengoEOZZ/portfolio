/**
 * ID CARD BACK COMPONENT
 * ======================
 * The back side of the ID business card with contact information and an initials monogram.
 * 
 * INTERACTIONS:
 * -------------
 * Email - Click to copy address to clipboard
 * Social Links - Click to open in new tab
 */

// DEPENDENCIES
import classes from './IDCardBack.module.css';
import EmailIcon from '../../../../../assets/EmailIcon.png';
import LinkedInIcon from '../../../../../assets/LinkedInIcon.png';
import GithubIcon from '../../../../../assets/GithubIcon.png';
import { useState, useCallback } from 'react';

const IDCardBack = () => {
  // Used to show "✓ Copied to clipboard!" message for 2 seconds when email is copied
  const [copiedText, setCopiedText] = useState('');

  /**
   * CONTACT DATA
   * ============
   */
  const contacts = [
    { name: 'Email', icon: EmailIcon, url: 'benjamintiong2019@gmail.com', label: 'benjamintiong2019@gmail.com', copyable: true },
    { name: 'LinkedIn', icon: LinkedInIcon, url: 'https://www.linkedin.com/in/benjamin-tiong-493aa7232/', label: 'linkedin.com/in/benjamin-tiong' },
    { name: 'GitHub', icon: GithubIcon, url: 'https://github.com/bengoEOZZ', label: 'github.com/bengoEOZZ' }
  ];

  /**
   * HANDLE CONTACT CLICK
   * ====================
   * Handles clicking on contact items:
   * - Email: Copies to clipboard
   * - Social Links: Opens in new tab
   */
  const handleContactClick = useCallback(async (contact) => {
    if (contact.copyable) {
      try {
        // Copy email to clipboard and pop-up confirmation message on success
        await navigator.clipboard.writeText(contact.url);
        setCopiedText(contact.name);
        // Clear confirmation message after 2 seconds
        setTimeout(() => setCopiedText(''), 2000);
      } catch (err) { // Catch error if copy fails
        console.error('Failed to copy:', err);
      }
    } else {
      // Open social link in new tab
      window.open(contact.url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  /**
   * COMPONENT OUTPUT
   * ================
   */
  return (
    <div className={classes.idCardBack}>
      {/* LEFT SIDE: Title and Contact Information */}
      <div className={classes.backLeft}>
        {/* TITLE */}
        <div className={classes.title}>
          <div className={classes.titleText}>CONTACT INFO</div>
          <div className={classes.titleUnderline}></div>
        </div>

        {/* CONTACT INFORMATION */}
        <div className={classes.contactList}>
          {contacts.map((contact) => (
            /* Renders a clickable container for each contact method */
            <div key={contact.name} className={classes.contactItem} onClick={() => handleContactClick(contact)}>
              {/* CONTACT ICON */}
              <img src={contact.icon} alt={contact.name} className={classes.contactIcon} />
              {/* CONTACT DETAILS: Label, Email/URL, and Email Copy Confirmation Message */}
              <div className={classes.contactDetails}>
                {/* CONTACT LABEL */}
                <div className={classes.contactLabel}>
                  {contact.name.toUpperCase()}
                  {/* EMAIL COPY CONFIRMATION MESSAGE */}
                  {copiedText === contact.name &&
                      <span className={classes.copiedMessage}>✓ Copied to clipboard!</span>}
                </div>
                {/* CONTACT VALUE (Email/URL) */}
                <div className={classes.contactValue}>{contact.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* RIGHT SIDE: Initials Monogram, Premium Badge, and Location Information */}
      <div className={classes.backRight}>
        {/* INITIALS MONOGRAM */}
        <div className={classes.btMonogram}>
          <div className={classes.btContainer}>
            {/* INITIALS LETTERS (BT) */}
            <div className={classes.letterB}>B</div>
            <div className={classes.letterT}>T</div>
            {/* MONOGRAM GLOW */}
            <div className={classes.monogramGlow}></div>
            {/* ANIMATED RINGS */}
            <div className={classes.rings}>
              {[1, 2, 3].map(i => <div key={i} className={classes.ring}></div>)}
            </div>
          </div>
          {/* PREMIUM BADGE */}
          <div className={classes.premiumBadge}>★ PREMIUM ★</div>
        </div>
        
        {/* LOCATION INFORMATION */}
        <div className={classes.locationFooter}>ONTARIO • CANADA</div>
      </div>
    </div>
  );
};

export default IDCardBack;