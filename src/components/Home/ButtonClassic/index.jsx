/**
 * BUTTONCLASSIC COMPONENT - CLASSIC MODE NAVIGATION BUTTON
 * ========================================================
 * This component renders a navigation button that links to the Classic mode of the portfolio.
 */

// DEPENDENCIES
import { Link } from 'react-router-dom';
import classes from './ButtonClassic.module.css';

/**
 * BUTTONCLASSIC COMPONENT
 * =======================
 */
function ButtonClassic({ to, children }) {
  return (
    <Link to={to} className={classes.btn}>
      {children}
    </Link>
  );
}

export default ButtonClassic;