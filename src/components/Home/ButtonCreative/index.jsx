/**
 * BUTTONCREATIVE COMPONENT - CREATIVE MODE NAVIGATION BUTTON
 * ==========================================================
 * 
 * This component renders a navigation button that links to the Creative mode of the portfolio.
 */

// DEPENDENCIES
import { Link } from 'react-router-dom';            // React Router for client-side navigation
import classes from './ButtonCreative.module.css';

/**
 * BUTTONCREATIVE COMPONENT
 * ========================
 */
function ButtonCreative({ to, children }) {
  return (
    <Link to={to} className={classes.btn}>
      {children}
    </Link>
  );
}

export default ButtonCreative;