/**
 * GYM CARD COMPONENT
 * ==================
 * Premium fitness membership card with premium gold aesthetic.
 * Features Membership status, Dumbbell icon, Elite badge, and Shimmer effect.
 * 
 * VISUAL STRUCTURE:
 * -------------------
 * - Premium gold aesthetic
 * - Elite badge indicator (top-right corner)
 * - Dumbbell icon centerpiece
 * - Membership text (club name, status, access level)
 */

// DEPENDENCIES
import classes from './GymCard.module.css';
import dumbbellIcon from '../../../../../assets/ClassicMode/dumbell.png';

/**
 * GymCard Component
 * =================
 * SCALING: Uses CSS custom property --scale-factor to resize entire card when needed.
 */
const GymCard = ({ scale = 1, className }) => {
  return (
    <div className={`${classes.cardWrapper} ${className || ''}`} style={{ '--scale-factor': scale }} >
      <div className={classes.gymCard}>
        <div className={classes.content}>
          
          {/* ELITE STATUS BADGE */}
          <div className={classes.eliteBadge}>
            <span className={classes.eliteText}>ELITE</span>
          </div>
          
          {/* GYM TITLE SECTION */}
          <div className={classes.gymText}>
            <div className={classes.gymTitle}>FITNESS CLUB</div>
            <div className={classes.gymSubtitle}>HEALTH & WELLNESS</div>
          </div>
          
          {/* BODY - DUMBBELL ICON & MEMBERSHIP STATUS */}
          <div className={classes.body}>
            <img src={dumbbellIcon} className={classes.dumbbell} />
            <div className={classes.membership}>GYM MEMBER</div>
            <div className={classes.membershipStatus}>FULL ACCESS</div>
          </div>
          
        </div>
        
        {/* SHIMMER OVERLAY */}
        <div className={classes.shimmer}></div>
      </div>
    </div>
  );
};

export default GymCard;