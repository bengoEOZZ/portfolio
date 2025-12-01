/**
 * ID CARD COMPONENT
 * =================
 * Interactive 3D flip card with tilt effect displaying professional contact information.
 * 
 * COMPONENT ARCHITECTURE:
 * -----------------------
 * IDCard: The front face of a professional ID card with avatar, name, and title
 * IDCardBack: The back face containing contact information such as (Email, LinkedIn, GitHub)
 * 
 * INTERACTIONS:
 * -------------
 * Mouse Movement: Card tilts in 3D space following cursor position
 * Click Flip Indicators: Toggle between front/back views
 * Mouse Leave: Card returns to default rotation
 */

import { useState, useRef, useEffect } from 'react';
import classes from './Contact.module.css';
import IDCard from './IDCard';
import IDCardBack from './IDCardBack';
import use3DMouseTracking from '../../../../hooks/use3DMouseTracking';

/**
 * Contact Component
 * =================
 */
const Contact = () => {
  /* Tracks card flip state (false = front, true = back) */
  const [isFlipped, setIsFlipped] = useState(false);
  
  const mouseTrackingAreaRef = useRef(null);    // Outer container: defines the mouse tracking area
  const rotatingCardRef = useRef(null);         // Inner card: the actual element that rotates and tilts

  /**
   * 3D MOUSE TRACKING EFFECT
   * ========================
   * Dynamically rotates the ID card based on cursor position for a 3D effect.
   * The card maintains its flipped state while tracking mouse movement.
   * 
   * 3D COORDINATE SYSTEM FLIP:
   * --------------------------
   * FRONT SIDE (isFlipped = false):
   * • Transform: rotateX(mouseY) + rotateY(mouseX)
   * • Mouse up → Card tilts away from viewer (natural perspective)
   * 
   * BACK SIDE (isFlipped = true):
   * • Transform: rotateY(180deg) + rotateX(mouseY) + rotateY(mouseX)
   * • Mouse up → Card appears to tilt towards viewer (inverted perspective)
   */
  use3DMouseTracking(
    rotatingCardRef, 
    { 
      intensity: 15, 
      baseTransform: isFlipped ? 'rotateY(180deg)' : '',
      containerRef: mouseTrackingAreaRef 
    }, 
    [isFlipped]
  );

  /**
   * FLIP HANDLER
   * ============
   * Toggles card between front and back views.
   */
  const handleFlip = () => setIsFlipped(!isFlipped);

  /**
   * COMPONENT OUTPUT
   * ================
   */
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

      {/* CONTACT PAGE */}
      <div className={classes.contentContainer}>
        <div className={classes.contactArea}>
          
          {/* MOUSE TRACKING AREA */}
          <div className={classes.mouseTrackingArea} ref={mouseTrackingAreaRef}>
            
            {/* CARD - Applies 3D transforms and flip animation */}
            <div className={`${classes.card} ${isFlipped ? classes.flipped : ''}`} ref={rotatingCardRef}>
              
              {/* FRONT SIDE - Professional ID card with flip indicator */}
              <div className={classes.cardFront}>
                <IDCard />
                <div className={classes.flipIndicator} onClick={handleFlip}></div>
              </div>

              {/* BACK SIDE - Contact information with flip return indicator */}
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