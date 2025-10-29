/**
 * IDCARD COMPONENT
 * ================
 * The front face of the luxury business card featuring gold foil text, profile avatar, and name/title.
 */
import classes from './IDCard.module.css';
import BenAvatar from '../../../../../assets/CreativeMode/moonDayAvatar.svg';

/**
 * IDCard Component
 * ================
 */
const IDCard = () => {
  return (
    <div className={classes.idCard}>
      <div className={classes.cardBackground}></div>
      <div className={classes.cardContent}>
        <h1 className={classes.name}>BENJAMIN TIONG</h1>
        <div className={classes.title}>SOFTWARE DEVELOPER</div>
        <div className={classes.subtitle}>PREMIUM CODER</div>
        <div className={classes.avatar}>
          <img src={BenAvatar} className={classes.avatarImage} />
        </div>
      </div>
    </div>
  );
};

export default IDCard;