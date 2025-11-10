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
   * 3D TILT EFFECT HANDLER
   * ======================
   * Creates dynamic 3D rotation effect based on mouse position.
   * 
   * CALCULATION:
   * ------------
   * 1. Gets mouse position relative to card center
   * 2. Converts position to rotation degrees (-15° to +15°)
   * 3. Applies rotation while preserving flip state
   * 4. Resets rotation when mouse leaves card area
   * 
   * ROTATION FORMULA:
   * -----------------
   * mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width * 15
   * 
   * Step-by-step breakdown:
   * 1. (e.clientX - rect.left)           → Mouse position relative to card's left edge (0 to card width)
   * 2. - rect.width / 2                  → Shift mouse position to card center (-width/2 to +width/2)
   * 3. / rect.width                      → Converted position to within range (-0.5 to +0.5)
   * 4. * 15                              → Scale to rotation degrees (-15° to +15°)
   * 
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
   * 
   * DEPENDENCIES:
   * -------------
   * [isFlipped] - Re-runs effect when card flips to update base transform
   *               (ensures coordinate system is properly flipped for back side)
   */
  useEffect(() => {
    const mouseTrackingArea = mouseTrackingAreaRef.current;
    const rotatingCard = rotatingCardRef.current;
    
    if (!mouseTrackingArea || !rotatingCard) return; // Safety check for refs

    /**
     * MOUSE MOVE HANDLER
     * ==================
     * Calculates and applies 3D rotation based on cursor position.
     */
    const handleMouseMove = (e) => {
      const rect = mouseTrackingArea.getBoundingClientRect();
      
      // Calculate mouse position relative to card center (-0.5 to +0.5)
      const mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width * 15;   // Horizontal tilt
      const mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height * -15; // Vertical tilt
      
      // Preserve the base transform flip rotation (180deg) if the card is flipped
      const baseTransform = isFlipped ? 'rotateY(180deg)' : '';
      
      // Apply combined transform: flip + tilt
      rotatingCard.style.transform = `${baseTransform} rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
    };

    /**
     * MOUSE LEAVE HANDLER
     * ===================
     * Resets card rotation to default when cursor exits card area.
     * Front side (isFlipped = false): transform = '' (removes all transforms, card flat)
     * Back side (isFlipped = true): transform = 'rotateY(180deg)' (stays flipped but flat)
     */
    const handleMouseLeave = () => {
      rotatingCard.style.transform = isFlipped ? 'rotateY(180deg)' : '';
    };

    // Attach event listeners
    mouseTrackingArea.addEventListener('mousemove', handleMouseMove);
    mouseTrackingArea.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup: Remove listeners when component unmounts or dependencies change
    return () => {
      mouseTrackingArea.removeEventListener('mousemove', handleMouseMove);
      mouseTrackingArea.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isFlipped]); // Re-run when flip state changes

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