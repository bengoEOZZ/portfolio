/**
 * 💳 ID CARD BACK COMPONENT 💳
 * ============================
 * Back side of business card with contact information and monogram
 */

import classes from './IDCardBack.module.css';
import EmailIcon from '../../../../../assets/EmailIcon.png';
import LinkedInIcon from '../../../../../assets/LinkedInIcon.png';
import GithubIcon from '../../../../../assets/GithubIcon.png';

const IDCardBack = () => {
  const contacts = [
    { name: 'Email', iconImage: EmailIcon, url: 'mailto:benjamintiong2019@gmail.com', label: 'benjamintiong2019@gmail.com' },
    { name: 'LinkedIn', iconImage: LinkedInIcon, url: 'https://www.linkedin.com/in/benjamin-tiong-493aa7232/', label: 'linkedin.com/in/benjamin-tiong' },
    { name: 'GitHub', iconImage: GithubIcon, url: 'https://github.com/bengoEOZZ', label: 'github.com/bengoEOZZ' }
  ];

  const handleContactClick = (url) => {
    if (url.startsWith('mailto:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={classes.backContent}>
      
      <div className={classes.backLeft}>
        <div className={classes.nameSection}>
          <div className={classes.backName}>CONTACT INFO</div>
          <div className={classes.premiumLine}></div>
        </div>
        
        <div className={classes.contactList}>
          {contacts.map((contact, index) => (
            <div key={index} className={classes.contactItem} onClick={() => handleContactClick(contact.url)}>
              <div className={classes.contactIcon}>
                <img src={contact.iconImage} alt={`${contact.name} icon`} className={classes.iconImage} />
              </div>
              <div className={classes.contactDetails}>
                <div className={classes.contactLabel}>{contact.name.toUpperCase()}</div>
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
              <div className={classes.ring1}></div>
              <div className={classes.ring2}></div>
              <div className={classes.ring3}></div>
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