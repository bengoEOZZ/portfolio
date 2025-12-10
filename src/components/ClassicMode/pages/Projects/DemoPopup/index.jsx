/**
 * DEMO POPUP COMPONENT
 * ====================
 * Premium styled popup for displaying project demos with layered backdrop frames and smooth entrance/exit animations.
 * 
 * COMPONENT STRUCTURE:
 * -------------------
 * 1. POPUP OVERLAY (Full-screen backdrop)
 *    • Radial gradient background (dark center fading to black)
 *    • Backdrop blur effect (15px for depth)
 *    • Click handler for close-on-outside-click
 * 
 * 2. POPUP CONTENT (Main container)
 *    • Multiple gold borders
 *    • Dark gradient background
 *    • Demo Gif display
 *    • Title at top
 *    • Footer at bottom
 * 
 * 3. BACKDROP FRAMES (Three layered decorative frames)
 *    • Frame 1: Outermost (-8deg rotation, largest size)
 *    • Frame 2: Middle (12deg rotation, medium size)
 *    • Frame 3: Innermost (0deg rotation, inset positioning)
 *    • Each frame has subtle floating rotation animation
 * 
 * 4. CLOSE BUTTON (Top-right corner)
 *    • Gold border with dark background
 *    • Hover: Gold fill with scale animation
 *    • X icon counter-rotated
 *  
 * INTERACTIVE FEATURES:
 * --------------------
 * • Click overlay → Closes popup with slide-down animation
 * • Click close button → Same close animation
 * • Opening → Slide up animation with scale
 * • Closing → Slide down animation with scale
 */

// DEPENDENCIES
import React from 'react';
import classes from './DemoPopup.module.css';

/**
 * DemoPopup Component
 * ===================
 */
const DemoPopup = ({ 
  isOpen, 
  isClosing, 
  demoGif, 
  projectTitle,
  projectYear,
  onClose 
}) => {
  // Don't render if popup isn't open
  if (!isOpen) return null;

  return (
    <>
      {/* POPUP OVERLAY - Full-screen dark backdrop with blur */}
      <div 
        className={`${classes.demoPopup} ${isClosing ? classes.closing : ''}`} 
        onClick={onClose}  // Click overlay to close popup
      >
        {/* POPUP CONTENT - Main container with gold borders and dark gradient */}
        <div className={classes.popupContent} 
          onClick={(e) => e.stopPropagation()}  // Prevent closing when clicking content
        >
          {/* PROJECT TITLE */}
          {projectTitle && ( <div className={classes.popupTitle}> {projectTitle.split(' - ')[0]} </div>)}

          {/* BACKDROP FRAMES - Three layered decorative backdrop frames with subtle floating */}
          {/* Frame 1: Outermost (-8deg rotation, largest size) */}
          <div className={classes.backdropFrameContainer}><div className={classes.backdropFrame}></div></div>
          {/* Frame 2: Middle (12deg rotation, medium size) */}
          <div className={classes.backdropFrameContainer}><div className={classes.backdropFrame}></div></div>
          {/* Frame 3: Innermost (0deg rotation, centered positioning) */}
          <div className={classes.backdropFrameContainer}><div className={classes.backdropFrame}></div></div>
          
          {/* CLOSE BUTTON - Diamond-shaped button at top-right */}
          <button className={classes.closeButton} onClick={onClose}>
            {/* X icon */}
            <span>✕</span>
          </button>
          
          {/* DEMO GIF */}
          {demoGif && (<img src={demoGif} className={classes.popupGif} />)}

          {/* FOOTER - Project year */}
          {projectYear && (<div className={classes.popupFooter}>{projectYear}</div>)}
        </div>
      </div>
    </>
  );
};

export default React.memo(DemoPopup);
