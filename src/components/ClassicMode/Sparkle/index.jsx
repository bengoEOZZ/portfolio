/**
 * SPARKLE COMPONENT
 * =================
 * Reusable luxury sparkle effect with cross-beam design for adding animated twinkles.
 */

// DEPENDENCIES
import classes from './Sparkle.module.css';

/**
 * Sparkle Component
 * =================
 */
const Sparkle = ({ style = {}, animationDelay = '0s', duration = '3s' }) => {
  return (
    /* SPARKLE ELEMENT */
    <div 
      className={classes.sparkle}
      style={{
        ...style,  /* Apply custom positioning */
        '--delay': animationDelay,  /* Set CSS variable for animation delay */
        '--duration': duration  /* Set CSS variable for animation duration */
      }}
    />
  );
};

export default Sparkle;
