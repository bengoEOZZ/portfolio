/**
 * PAGE HEADER COMPONENT
 * =====================
 * Reusable header component for all ClassicMode pages featuring elegant title display with animated sparkles.
 * 
 * COMPONENT STRUCTURE:
 * -------------------
 * 1. TITLE WRAPPER (Container for title + sparkles)
 *    • Page title with gold gradient text
 *    • Sparkle effects positioned around title
 * 2. TITLE UNDERLINE (Decorative gold gradient line)
 * 3. PAGE SUBTITLE (Description text below title)
 */

// DEPENDENCIES
import classes from './PageHeader.module.css';
import Sparkle from '../../Sparkle';

/**
 * PageHeader Component
 * ====================
 */
const PageHeader = ({ title, subtitle, sparkleCount = 6 }) => {
  // Generate sparkle configuration array with staggered delays and varying durations
  const sparkles = Array.from({ length: sparkleCount }, (_, i) => ({
    delay: `${i * 0.5}s`,  // Stagger delays (0s, 0.5s, 1s, 1.5s, etc.)
    duration: `${2.2 + (i % 5) * 0.1}s`  // Vary duration (2.2s - 2.6s)
  }));

  return (
    /* PAGE HEADER */
    <div className={classes.pageHeader}>
      
      {/* TITLE WRAPPER - Contains title and sparkle effects */}
      <div className={classes.titleWrapper}>
        {/* PAGE TITLE */}
        <h1 className={classes.pageTitle}>{title}</h1>
        
        {/* SPARKLE EFFECTS */}
        <div className={classes.sparkleEffect}>
          {sparkles.map((sparkle, index) => (
            <Sparkle 
              key={index}
              animationDelay={sparkle.delay}  /* Staggered animation start */
              duration={sparkle.duration}  /* Individual sparkle duration */
            />
          ))}
        </div>
      </div>
      
      {/* TITLE UNDERLINE - Decorative gold gradient line */}
      <div className={classes.titleUnderline}></div>
      
      {/* PAGE SUBTITLE */}
      <p className={classes.pageSubtitle}>{subtitle}</p>
    </div>
  );
};

export default PageHeader;
