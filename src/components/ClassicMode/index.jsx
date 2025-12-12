/**
 * CLASSICMODE COMPONENT - LUXURY PORTFOLIO EXPERIENCE
 * ===================================================
 * This component renders the main Classic mode interface of the portfolio application.
 * Features a classy luxury-themed experience with luxurious animations, golden accents,
 * and refined visual effects to showcase the professional and craftsmanship side of the portfolio.
 * 
 * COMPONENT ARCHITECTURE:
 * This component acts as a container/orchestrator that renders four main child components:
 * 
 * - NavigationBar: Header with luxury logo and briefcase menu
 * - LuxuryBackground: Dynamic mathematical flowing curves
 * - HelloText: Professional introduction and portfolio showcase
 * - NavigationBelt: Luxury leather belt navigation system at bottom
 *
 * Design Philosophy:
 * - Represents professionalism, craftsmanship, and luxury aesthetics
 * - Golden theme suggests premium quality
 */

// DEPENDENCIES
import { Outlet, useLocation } from 'react-router-dom';
import classes from './ClassicMode.module.css';
import NavigationBar from './NavigationBar';
import LuxuryBackground from './LuxuryBackground';
import HelloText from './HelloText';
import NavigationBelt from './NavigationBelt';
import { usePageTransition } from '../../hooks/usePageTransition';

/**
 * ClassicMode Component
 * =====================
 */
const ClassicMode = () => {
  /**
   * STATE MANAGEMENT
   * ===============
   */
  const { transitioning, isExiting, startTransition } = usePageTransition();
  const location = useLocation();
  
  // Check if we're on the home route (ClassicMode homepage)
  const isHome = location.pathname === '/classic' || location.pathname === '/classic/';

  /**
   * EFFECT: RESET TRANSITION STATE WHEN RETURNING HOME
   * ==================================================
   * No manual state reset needed - hook manages this automatically
   */

  /**
   * NAVIGATION HANDLERS
   * ==================
   */
  const handleNavigationStart = (cardType) => {
    // Don't transition if clicking home button
    if (cardType !== 'home') {
      // The transition will be handled by NavigationBelt component
      // using the startTransition function passed down
    }
  };

  /**
   * COMPONENT OUTPUT
   * ================
   */
  return (
    <div className={classes.body}>
      <NavigationBar startTransition={startTransition} />

      <div className={classes.container}>
        {/* BACKGROUND SYSTEM - Always present */}
        <LuxuryBackground />
        
        {/* MAIN CONTENT - Conditional rendering */}
        {isHome ? (
          <>
            <HelloText isHelloTextFading={transitioning} />
            {/* NAVIGATION BELT - Only show on home page */}
            <NavigationBelt 
              onNavigationStart={handleNavigationStart} 
              isBeltFading={transitioning}
              startTransition={startTransition}
            />
          </>
        ) : (
          <div className={`${classes.contentArea} ${isExiting ? classes.exiting : ''}`}>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassicMode;