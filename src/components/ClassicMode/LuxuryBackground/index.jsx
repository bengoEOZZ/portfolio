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

// DEPENDENCIES
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
   * Path syntax (Quadratic Bézier):
   * - M = Move to start point
   * - Q = Quadratic curve (control point, end point)
   * - T = Smooth continuation (mirrors previous control point)
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
   * - X: -200 (off-screen left) to 1800 (off-screen right) in viewBox
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
      {/* ========== BACKGROUND RINGS ========== */}
      <div className={classes.backgroundRing} style={{ width: '30vw', height: '30vw', top: '-10%', left: '-15%', animationDelay: '0s' }}></div>
      <div className={classes.backgroundRing} style={{ width: '25vw', height: '25vw', bottom: '10%', left: '10%', animationDelay: '-4s', animationDuration: '15s' }}></div>
      <div className={classes.backgroundRing} style={{ width: '20vw', height: '20vw', top: '30%', left: '25%', animationDelay: '-8s', animationDuration: '18s' }}></div>
      <div className={classes.backgroundRing} style={{ width: '35vw', height: '35vw', top: '50%', right: '-20%', animationDelay: '-2s', animationDuration: '20s' }}></div>
      <div className={classes.backgroundRing} style={{ width: '18vw', height: '18vw', top: '5%', right: '10%', animationDelay: '-6s', animationDuration: '14s' }}></div>
      <div className={classes.backgroundRing} style={{ width: '40vw', height: '40vw', bottom: '-15%', right: '30%', animationDelay: '-10s', animationDuration: '22s' }}></div>
      <div className={classes.backgroundRing} style={{ width: '15vw', height: '15vw', top: '70%', left: '5%', animationDelay: '-3s', animationDuration: '16s' }}></div>
      <div className={classes.backgroundRing} style={{ width: '28vw', height: '28vw', top: '15%', right: '-5%', animationDelay: '-7s', animationDuration: '19s' }}></div>
      
      {/* ========== BACKGROUND LINES ========== */}
      <div className={classes.backgroundLine} style={{ width: '15vw', top: '15%', left: '5%', transform: 'rotate(25deg)', animationDelay: '0s' }}></div>
      <div className={classes.backgroundLine} style={{ width: '10vw', top: '18%', left: '18%', transform: 'rotate(-15deg)', animationDelay: '2s' }}></div>
      <div className={classes.backgroundLine} style={{ width: '12vw', top: '75%', left: '8%', transform: 'rotate(45deg)', animationDelay: '4s' }}></div>
      <div className={classes.backgroundLine} style={{ width: '8vw', top: '80%', left: '20%', transform: 'rotate(-30deg)', animationDelay: '6s' }}></div>
      <div className={classes.backgroundLine} style={{ width: '18vw', top: '35%', right: '10%', transform: 'rotate(15deg)', animationDelay: '1s' }}></div>
      <div className={classes.backgroundLine} style={{ width: '14vw', top: '55%', right: '25%', transform: 'rotate(-40deg)', animationDelay: '3s' }}></div>
      <div className={classes.backgroundLine} style={{ width: '11vw', bottom: '25%', right: '5%', transform: 'rotate(60deg)', animationDelay: '5s' }}></div>
      <div className={classes.backgroundLine} style={{ width: '9vw', top: '8%', right: '35%', transform: 'rotate(-20deg)', animationDelay: '7s' }}></div>
      <div className={classes.backgroundLine} style={{ width: '16vw', top: '45%', left: '35%', transform: 'rotate(35deg)', animationDelay: '8s' }}></div>
      <div className={classes.backgroundLine} style={{ width: '13vw', bottom: '40%', left: '50%', transform: 'rotate(-55deg)', animationDelay: '9s' }}></div>
      
      {/* ========== BACKGROUND GLOW DOTS ========== */}
      {/* Corners - large bright */}
      <div className={`${classes.backgroundGlowDot} ${classes.large}`} style={{ top: '8%', left: '4%', animationDelay: '0s' }}></div>
      <div className={`${classes.backgroundGlowDot} ${classes.large}`} style={{ top: '88%', left: '6%', animationDelay: '0.3s' }}></div>
      <div className={`${classes.backgroundGlowDot} ${classes.large}`} style={{ top: '10%', right: '5%', animationDelay: '0.6s' }}></div>
      <div className={`${classes.backgroundGlowDot} ${classes.large}`} style={{ top: '85%', right: '4%', animationDelay: '0.9s' }}></div>

      {/* Edges - medium */}
      <div className={`${classes.backgroundGlowDot} ${classes.medium}`} style={{ top: '40%', left: '3%', animationDelay: '0.1s' }}></div>
      <div className={`${classes.backgroundGlowDot} ${classes.medium}`} style={{ top: '5%', left: '45%', animationDelay: '0.7s' }}></div>
      
      {/* Scattered small */}
      <div className={`${classes.backgroundGlowDot} ${classes.small}`} style={{ top: '25%', left: '15%', animationDelay: '1.3s' }}></div>
      <div className={`${classes.backgroundGlowDot} ${classes.small}`} style={{ top: '75%', right: '15%', animationDelay: '1.6s' }}></div>
      <div className={`${classes.backgroundGlowDot} ${classes.small}`} style={{ top: '20%', right: '20%', animationDelay: '0.2s' }}></div>
      <div className={`${classes.backgroundGlowDot} ${classes.small}`} style={{ top: '80%', left: '25%', animationDelay: '0.5s' }}></div>
      
      {/* Middle sparse - tiny */}
      <div className={`${classes.backgroundGlowDot} ${classes.tiny}`} style={{ top: '35%', left: '35%', animationDelay: '0.8s' }}></div>
      <div className={`${classes.backgroundGlowDot} ${classes.tiny}`} style={{ top: '55%', right: '35%', animationDelay: '1.1s' }}></div>
      <div className={`${classes.backgroundGlowDot} ${classes.tiny}`} style={{ top: '45%', left: '55%', animationDelay: '1.4s' }}></div>
      <div className={`${classes.backgroundGlowDot} ${classes.tiny}`} style={{ top: '65%', left: '45%', animationDelay: '1.7s' }}></div>
      
      {/* TRANSITION CORNER LIGHTS */}
      <div className={`${classes.cornerLight} ${classes.bottomLeft} ${isExiting ? classes.active : ''}`}></div>
      <div className={`${classes.cornerLight} ${classes.bottomRight} ${isExiting ? classes.active : ''}`}></div>
      
      {/* ========== DYNAMIC FLOWING LINES ========== */}
      <svg width="100%" height="100%" viewBox="-200 0 1800 700">
        <defs>
          {/* 
            GRADIENT 1: Primary curve gradient (brighter)
            =============================================
            Creates a "glowing center, fading edges" effect:
            - 0-15%:   Fade in from transparent
            - 40-60%:  Bright golden center with white-gold peak at 50%
            - 85-100%: Fade out to transparent
          */}
          <linearGradient id="flowingGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(212,175,55,0)" />
            <stop offset="15%" stopColor="rgba(212,175,55,0.3)" />
            <stop offset="40%" stopColor="rgba(255,215,0,0.7)" />
            <stop offset="50%" stopColor="rgba(255,255,200,1)" />
            <stop offset="60%" stopColor="rgba(255,215,0,0.7)" />
            <stop offset="85%" stopColor="rgba(212,175,55,0.3)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0)" />
          </linearGradient>
          
          {/* 
            GRADIENT 2: Secondary curve gradient (subtler)
            ==============================================
          */}
          <linearGradient id="flowingGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(191,168,80,0)" />
            <stop offset="20%" stopColor="rgba(191,168,80,0.2)" />
            <stop offset="45%" stopColor="rgba(212,175,55,0.5)" />
            <stop offset="50%" stopColor="rgba(255,235,150,0.8)" />
            <stop offset="55%" stopColor="rgba(212,175,55,0.5)" />
            <stop offset="80%" stopColor="rgba(191,168,80,0.2)" />
            <stop offset="100%" stopColor="rgba(191,168,80,0)" />
          </linearGradient>
          
          {/* 
            GLOW FILTER: Soft Glow Effect
            ==================================
            Creates a glowing aura around the lines:
            1. feGaussianBlur: Blurs the shape ([stdDeviation(3)] = blur radius)
            2. feMerge: Combines blurred version BEHIND the sharp original
            Result: Sharp line with soft glow
          */}
          <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* 
          CURVE PATHS
          ===========
        */}
        <g opacity="0.6">
          {/* Primary curve - thicker (3px), brighter gradient, upper position */}
          <path 
            d={dynamicPaths.flowingPath1} 
            fill="none"
            stroke="url(#flowingGradient1)" 
            strokeWidth="3"
            filter="url(#lineGlow)"
          />
          {/* Secondary curve - thinner (2px), subtler gradient, lower position */}
          <path 
            d={dynamicPaths.flowingPath2} 
            fill="none"
            stroke="url(#flowingGradient2)" 
            strokeWidth="2"
            filter="url(#lineGlow)"
          />
        </g>
      </svg>
    </div>
  );
};

export default LuxuryBackground;