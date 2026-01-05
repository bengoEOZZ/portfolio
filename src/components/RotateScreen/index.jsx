/**
 * ROTATESCREEN COMPONENT - PORTRAIT ORIENTATION OVERLAY
 * =====================================================
 * This component renders a full-screen overlay when the device is in portrait orientation,
 * prompting users to rotate their device to landscape for the optimal portfolio experience.
 * 
 * COMPONENT ARCHITECTURE:
 * -----------------------
 * - Background Gradient: Animated rotating gradient for visual depth
 * - Phone Icon: Animated rotating phone with mode-specific colors
 * - Text Content: Title, subtitle, and rotate hint
 * - Corner Decorations: Corner frame accents
 * Creative/Home modes only:
 * - Stars Container: Twinkling star particles
 * - Saturn Decoration: Static planet decoration
 *
 * VARIANT SYSTEM:
 * ---------------
 * - 'classic': Gold luxury theme - elegant, professional
 * - 'creative': Blue space theme - celestial, exploratory
 * - 'home': Mixed gradient theme (gold → blue) - combined aesthetic
 */

// DEPENDENCIES
import classes from './RotateScreen.module.css';

/**
 * RotateScreen Component
 * ======================
 */
const RotateScreen = ({ variant = 'home' }) => {
  /**
   * VARIANT CLASS SELECTION
   * =======================
   * Determines the appropriate CSS class based on the current mode.
   * Falls back to 'home' variant if an invalid variant is provided.
   */
  const variantClass = classes[variant] || classes.home;
  
  /**
   * COMPONENT OUTPUT
   * ================
   */
  return (
    <div className={`${classes.rotateOverlay} ${variantClass}`}>

      {/* BACKGROUND GRADIENT */}
      <div className={classes.backgroundGradient}></div>
      
      {/* MAIN CONTENT CONTAINER */}
      <div className={classes.content}>
        {/* PHONE ICON */}
        <div className={classes.phoneIcon}>
          <div className={classes.phone}>
            <div className={classes.phoneScreen}></div>
            <div className={classes.phoneNotch}></div>
          </div>
          <div className={classes.rotateArrow}>
            {/* ROTATION ARROW ICON - CLAUDE-generated SVG (2025) */}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" 
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* TEXT CONTENT */}
        <h1 className={classes.title}>Rotate Your Device</h1>
        <p className={classes.subtitle}>
          {variant === 'creative' 
            ? 'The cosmos awaits in landscape mode.' 
            : variant === 'classic'
            ? 'For the best experience, please rotate to landscape.'
            : 'Choose your experience in landscape mode.'}
        </p>
        <div className={classes.decorativeLine}></div>
        <p className={classes.hint}>
          {variant === 'creative' 
            ? 'Optimized for wider horizons'
            : 'This portfolio is optimized for wider screens'}
        </p>
      </div>

      {/* CORNER FRAME DECORATIONS */}
      <div className={`${classes.corner} ${classes.topLeft}`}></div>
      <div className={`${classes.corner} ${classes.topRight}`}></div>
      <div className={`${classes.corner} ${classes.bottomLeft}`}></div>
      <div className={`${classes.corner} ${classes.bottomRight}`}></div>

      {/* STARS PARTICLE SYSTEM - Creative/Home modes only */}
      {(variant === 'creative' || variant === 'home') && (
        <div className={classes.starsContainer}>
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className={classes.star}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* SATURN DECORATION - Creative/Home modes only */}
      {(variant === 'creative' || variant === 'home') && (
        <div className={classes.saturnDecoration}>
          <div className={classes.saturnPlanet}></div>
          <div className={classes.saturnRing}></div>
        </div>
      )}
    </div>
  );
};

export default RotateScreen;
