/**
 * LUXURY BACKGROUND COMPONENT
 * ===========================
 * Renders dynamic mathematical flowing curves for the ClassicMode interface.
 * Features real-time calculations creating smooth, animated SVG paths.
 * 
 * MATHEMATICAL IMPLEMENTATION:
 * - Uses sine/cosine wave functions for natural curve generation
 * - 60fps animation loop for smooth visual experience
 * - Golden accent colors matching luxury theme
 */

import { useEffect, useState } from 'react';
import classes from './LuxuryBackground.module.css';

/**
 * LuxuryBackground Component
 * ==========================
 */
const LuxuryBackground = ({ isExiting = false }) => {
  /**
   * STATE MANAGEMENT
   * ===============
   */
  const [time, setTime] = useState(0);

  /**
   * DYNAMIC BACKGROUND ANIMATIONS
   * =============================
   * Real-time mathematical calculations for flowing background lines
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 0.016); // ~60fps
    }, 16);

    return () => clearInterval(interval);
  }, []);

  /**
   * MATHEMATICAL PATH GENERATION
   * ============================
   * Creates smooth, flowing mathematical curves based on trigonometric functions.
   * 
   * MATHEMATICAL FORMULAS:
   * Position = BasePosition + Math.sin/cos(time * frequency) * amplitude
   * 
   * FORMULA BREAKDOWN:
   * - BasePosition: Static center point (e.g., 300px from top)
   * - Math.sin/cos: Wave functions that oscillate between -1 and +1
   * - time: Current animation time in seconds
   * - frequency: Speed of oscillation (0.2=slow -> 0.6=fast)
   * - amplitude: Range of movement in pixels (eg: ±50px = 100px total range)
   * 
   * COORDINATE SYSTEM:
   * - X: -200 (off-screen left) to 1800 (off-screen right)
   * - Y: 0 (top) to 700 (bottom) in viewBox
   */
  const calculateDynamicPaths = () => {
    return {
      // Flowing line 1 - Upper curve with complex wave pattern
      flowingPath1: `M-200,${300 + Math.sin(time * 0.5) * 50} 
                     Q${400 + Math.cos(time * 0.3) * 100},${250 + Math.sin(time * 0.4) * 80} 
                     ${800 + Math.sin(time * 0.2) * 60},${320 + Math.cos(time * 0.6) * 40} 
                     T1800,${350 + Math.sin(time * 0.3) * 70}`,
      
      // Flowing line 2 - Lower curve with different frequency patterns
      flowingPath2: `M-200,${500 + Math.cos(time * 0.4) * 60} 
                     Q${300 + Math.sin(time * 0.5) * 90},${450 + Math.cos(time * 0.3) * 50} 
                     ${700 + Math.cos(time * 0.6) * 80},${520 + Math.sin(time * 0.2) * 60} 
                     T1800,${480 + Math.cos(time * 0.4) * 90}`
    };
  };

  const dynamicPaths = calculateDynamicPaths();

  /**
   * COMPONENT OUTPUT
   * ================
   */
  return (
    <div className={classes.luxuryBackground}>
      {/* TRANSITION CORNER LIGHTS */}
      <div className={`${classes.cornerLight} ${classes.bottomLeft} ${isExiting ? classes.active : ''}`}></div>
      <div className={`${classes.cornerLight} ${classes.bottomRight} ${isExiting ? classes.active : ''}`}></div>
      
      {/* DYNAMIC FLOWING LINES: Real-time mathematical-based curves */}
      <svg width="100%" height="100%" viewBox="-200 0 1800 700">
        <g opacity="0.3">
          {/* Flowing line 1 - Primary golden curve */}
          <path 
            d={dynamicPaths.flowingPath1} 
            fill="none"
            stroke="rgba(212,175,55,0.4)" 
            strokeWidth="4"
          />
          {/* Flowing line 2 - Secondary subtle curve */}
          <path 
            d={dynamicPaths.flowingPath2} 
            fill="none"
            stroke="rgba(212,175,55,0.2)" 
            strokeWidth="4"
          />
        </g>
      </svg>
    </div>
  );
};

export default LuxuryBackground;