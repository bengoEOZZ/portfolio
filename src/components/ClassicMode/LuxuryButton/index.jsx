/**
 * LUXURYBUTTON COMPONENT - REUSABLE GOLDEN INTERACTIVE BUTTON
 * ==========================================================
 *
 * A reusable button component with a luxury theme.
 * Features slide-in background effects, hover transformations, etc.
 */

// DEPENDENCIES
import React from 'react';
import classes from './LuxuryButton.module.css';

/**
 * LuxuryButton Component
 * =====================
 */
const LuxuryButton = ({ 
  children, 
  onClick, 
  className = '', 
  style = {},
  ...otherProps 
}) => {
  return (
    <span 
      className={`${classes.btn} ${className}`}
      onClick={onClick}
      style={style}
      {...otherProps}
    >
      {children}
    </span>
  );
};

export default LuxuryButton;