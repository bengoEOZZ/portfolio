/**
 * 💳 ELEGANT GOLD BUSINESS CARD 💳
 * ================================
 * Clean, professional gold card design
 */

import { useState, useRef, useEffect } from 'react';
import classes from './Contact.module.css';
import IDCard from './IDCard';
import IDCardBack from './IDCardBack';

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

  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div className={classes.contactPage}>
      {/* PAGE HEADER */}
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>Contact Me</h1>
        <div className={classes.titleUnderline}></div>
        <p className={classes.pageSubtitle}>
          Let's connect and explore opportunities for collaboration.
        </p>
      </div>

      <div className={classes.contentContainer}>
        <div className={classes.contactArea}>
          <div className={classes.businessCard} ref={cardRef}>
            <div className={`${classes.cardInner} ${isFlipped ? classes.flipped : ''}`} ref={cardInnerRef}>
              
              {/* FRONT SIDE */}
              <div className={classes.cardFront}>
                <IDCard />
                <div className={classes.flipIndicator} onClick={handleFlip}></div>
              </div>

              {/* BACK SIDE */}
              <div className={classes.cardBack}>
                <div className={classes.flipBackIndicator} onClick={handleFlip}></div>
                <IDCardBack />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;