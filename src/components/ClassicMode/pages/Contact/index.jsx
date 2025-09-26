/**
 * 💳 ELEGANT GOLD BUSINESS CARD 💳
 * ================================
 * Clean, professional gold card design
 */

import React, { useState, useRef, useEffect } from 'react';
import classes from './Contact.module.css';
import BenMoonAvatar from '../../../../assets/CreativeMode/BenMoonDay.svg';
import EmailIcon from '../../../../assets/EmailIcon.png';
import LinkedInIcon from '../../../../assets/LinkedInIcon.png';
import GithubIcon from '../../../../assets/GithubIcon.png';

const Contact = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const cardInnerRef = useRef(null);

  // Simplified 3D Tilt Effect
  useEffect(() => {
    const card = cardRef.current;
    const cardInner = cardInnerRef.current;
    
    if (!card || !cardInner) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width * 15;
      const mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height * -15;
      
      const baseTransform = isFlipped ? 'rotateY(180deg)' : '';
      cardInner.style.transform = `${baseTransform} rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
    };

    const handleMouseLeave = () => {
      cardInner.style.transform = isFlipped ? 'rotateY(180deg)' : '';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isFlipped]);

  const contacts = [
    { name: 'Email', iconImage: EmailIcon, url: 'mailto:benjamintiong2019@gmail.com', label: 'benjamintiong2019@gmail.com' },
    { name: 'LinkedIn', iconImage: LinkedInIcon, url: 'https://www.linkedin.com/in/benjamin-tiong-493aa7232/', label: 'linkedin.com/in/benjamin-tiong' },
    { name: 'GitHub', iconImage: GithubIcon, url: 'https://github.com/bengoEOZZ', label: 'github.com/bengoEOZZ' }
  ];

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleContactClick = (url) => {
    if (url.startsWith('mailto:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={classes.contactArea}>
      <div className={classes.businessCard} ref={cardRef}>
        <div className={`${classes.cardInner} ${isFlipped ? classes.flipped : ''}`} ref={cardInnerRef}>
          
          {/* FRONT SIDE */}
          <div className={classes.cardFront}>
            <div className={classes.goldBackground}></div>
            <div className={classes.cardContent}>
              <h1 className={classes.memberName}>BENJAMIN TIONG</h1>
              <div className={classes.memberTitle}>SOFTWARE DEVELOPER</div>
              <div className={classes.memberSubtitle}>PREMIUM CODER</div>
              <div className={classes.blackCircle}>
                <img src={BenMoonAvatar} alt="Ben Moon Avatar" className={classes.avatarImage} />
              </div>
            </div>
            <div className={classes.flipIndicator} onClick={handleFlip}></div>
          </div>

          {/* BACK SIDE */}
          <div className={classes.cardBack}>
            <div className={classes.flipBackIndicator} onClick={handleFlip}></div>
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
                <div className={classes.locationFooter}>TORONTO • CANADA</div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;