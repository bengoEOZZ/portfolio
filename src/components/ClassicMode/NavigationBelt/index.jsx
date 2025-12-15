/**
 * BELT NAVIGATION COMPONENT
 * =========================
 * Luxury Louis Vuitton-inspired belt navigation that appears on the home page.
 * 
 * COMPONENT ARCHITECTURE:
 * -----------------------
 * Leather Belt Strap: Textured gradient with golden borders and stitching
 * Shine Effect: Animated sparkle effect across the belt surface
 * Navigation Cards: Four golden cards with abbreviated labels (Ab, Co, Pr, Ct)
 * Central Buckle: Golden buckle with fleur-de-lis symbol
 * 
 * INTERACTIONS:
 * -------------
 * Card Click: Navigate to respective pages with page transition animation
 * Belt Fading: Fade-out animation when navigating away from home
 * Wave Animation: Subtle 3D flag-waving effect on all belt elements
 */

// DEPENDENCIES
import { useNavigate } from 'react-router-dom';
import classes from './NavigationBelt.module.css';

/**
 * NavigationBelt Component
 * ========================
 */
const NavigationBelt = ({ onNavigationStart, isBeltFading, startTransition }) => {
  const navigate = useNavigate();

  /**
   * CARD CLICK HANDLER
   * ==================
   * Navigates to the selected page using React Router with page transition animation.
   * Triggers fade-out callback to parent component for synchronized belt disappearance.
   */
  const handleCardClick = (cardType) => {
    // Use transition hook for smooth page fade effects
    startTransition(() => {
      switch(cardType) {
        case 'about':
          navigate('/classic/about');
          break;
        case 'coding':
          navigate('/classic/coding');
          break;
        case 'projects':
          navigate('/classic/projects');
          break;
        case 'contact':
          navigate('/classic/contact');
          break;
        default:
          navigate('/classic');
          break;
      }
    }, 1500);

    // Notify parent to start belt fade-out animation
    if (onNavigationStart) {
      onNavigationStart(cardType);
    }
  };

  /**
   * COMPONENT OUTPUT
   * ================
   */
  return (
    <div className={`${classes.navCards} ${isBeltFading ? classes.beltFading : ''}`}>
      
      {/* SHINE EFFECT - Animated sparkle layer */}
      <div className={classes.shineEffect}></div>
      
      {/* ABOUT CARD - Left side navigation */}
      <div 
        className={classes.navCard}
        onClick={() => handleCardClick('about')}
      >
        <div className={classes.cardAbbrev}>Ab</div>
        <div className={classes.cardLabel}>about</div>
      </div>
      
      {/* CODING CARD - Left side navigation */}
      <div 
        className={classes.navCard}
        onClick={() => handleCardClick('coding')}
      >
        <div className={classes.cardAbbrev}>Co</div>
        <div className={classes.cardLabel}>coding</div>
      </div>
      
      {/* CENTRAL BUCKLE - fleur-de-lis buckle */}
      <div className={classes.navBuckle}></div>
      
      {/* PROJECTS CARD - Right side navigation */}
      <div 
        className={classes.navCard}
        onClick={() => handleCardClick('projects')}
      >
        <div className={classes.cardAbbrev}>Pr</div>
        <div className={classes.cardLabel}>projects</div>
      </div>
      
      {/* CONTACT CARD - Right side navigation */}
      <div 
        className={classes.navCard}
        onClick={() => handleCardClick('contact')}
      >
        <div className={classes.cardAbbrev}>Ct</div>
        <div className={classes.cardLabel}>contact</div>
      </div>
    </div>
  );
};

export default NavigationBelt;