/**
 * 💳 ID CARD BACK COMPONENT 💳
 * ============================
 * Back side of business card with contact information and monogram
 */

import classes from './IDCardBack.module.css';
import EmailIcon from '../../../../../assets/EmailIcon.png';
import LinkedInIcon from '../../../../../assets/LinkedInIcon.png';
import GithubIcon from '../../../../../assets/GithubIcon.png';
import { useState } from 'react';

const IDCardBack = () => {
  const [copiedText, setCopiedText] = useState('');

  const contacts = [
    { name: 'Email', icon: EmailIcon, url: 'benjamintiong2019@gmail.com', label: 'benjamintiong2019@gmail.com', copyable: true },
    { name: 'LinkedIn', icon: LinkedInIcon, url: 'https://www.linkedin.com/in/benjamin-tiong-493aa7232/', label: 'linkedin.com/in/benjamin-tiong' },
    { name: 'GitHub', icon: GithubIcon, url: 'https://github.com/bengoEOZZ', label: 'github.com/bengoEOZZ' }
  ];

  const handleContactClick = async (contact) => {
    if (contact.copyable) {
      try {
        await navigator.clipboard.writeText(contact.url);
        setCopiedText(contact.name);
        setTimeout(() => setCopiedText(''), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    } else {
      window.open(contact.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={classes.idCardBack}>
      <div className={classes.backLeft}>
        <div className={classes.nameSection}>
          <div className={classes.backName}>CONTACT INFO</div>
          <div className={classes.premiumLine}></div>
        </div>
        
        <div className={classes.contactList}>
          {contacts.map((contact) => (
            <div key={contact.name} className={classes.contactItem} onClick={() => handleContactClick(contact)}>
              <img src={contact.icon} alt={contact.name} className={classes.contactIcon} />
              <div className={classes.contactDetails}>
                <div className={classes.contactLabel}>
                  {contact.name.toUpperCase()}
                  {copiedText === contact.name && <span className={classes.copiedMessage}>✓ Copied to clipboard!</span>}
                </div>
                <div className={classes.contactValue}>{contact.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={classes.backRight}>
        <div className={classes.btMonogram}>
          <div className={classes.btContainer}>
            <div className={classes.letterB}>B</div>
            <div className={classes.letterT}>T</div>
            <div className={classes.monogramGlow}></div>
            <div className={classes.orbitRings}>
              <div className={classes.ring}></div>
              <div className={classes.ring}></div>
              <div className={classes.ring}></div>
            </div>
          </div>
          <div className={classes.premiumBadge}>★ PREMIUM ★</div>
        </div>
        <div className={classes.locationFooter}>ONTARIO • CANADA</div>
      </div>
    </div>
  );
};

export default IDCardBack;