/**
 * USE 3D MOUSE TRACKING HOOK
 * ==========================
 * Custom hook for applying 3D rotation effect based on mouse position.
 * 
 * ROTATION CALCULATION:
 * --------------------
 * Formula: mouseX = (e.clientX - centerX) / rect.width * intensity
 * 
 * Step-by-step breakdown:
 * 1. (e.clientX - centerX)     → Mouse position relative to container center (-width/2 to +width/2)
 * 2. / rect.width              → Normalize to range (-0.5 to +0.5)
 * 3. * intensity               → Scale to rotation degrees (e.g., -15° to +15° with intensity=15)
 */

import { useEffect } from 'react';

const use3DMouseTracking = (elementRef, options = {}, dependencies = []) => {
  // DEFAULT CONFIGURATION
  // =====================
  // Configuration with default values
  const { 
    intensity = 15,         // Rotation strength (higher = more dramatic tilt)
    baseTransform = '',     // Preserve existing transforms (e.g., flip rotation)
    containerRef = null     // Optional: track mouse on different element than the one being rotated
  } = options;

  useEffect(() => {
    // GET DOM ELEMENTS
    // ================
    const element = elementRef.current;                                      // Element to rotate
    const trackingElement = containerRef?.current || element?.parentElement; // Area to track mouse
    
    // SAFETY CHECK: Exit if refs not ready
    if (!element || !trackingElement) return;

    /**
     * MOUSE MOVE HANDLER
     * ==================
     * Calculates and applies 3D rotation based on cursor position.
     * 
     * CALCULATION BREAKDOWN:
     * ---------------------
     * 1. Get tracking area dimensions and center point
     * 2. Calculate mouse offset from center (in pixels)
     * 3. Normalize offset to -0.5 to +0.5 range
     * 4. Multiply by intensity to get rotation degrees
     * 5. Apply transform (preserve baseTransform + add tilt)
     */
    const handleMouseMove = (e) => {
      const rect = trackingElement.getBoundingClientRect();
      
      // CALCULATE CENTER COORDINATES
      const centerX = rect.left + rect.width / 2;   // Horizontal center of tracking area
      const centerY = rect.top + rect.height / 2;   // Vertical center of tracking area
      
      // CALCULATE MOUSE OFFSET FROM CENTER (normalized to -0.5 to +0.5, then scaled)
      const mouseX = (e.clientX - centerX) / rect.width * intensity;    // Horizontal tilt
      const mouseY = (e.clientY - centerY) / rect.height * -intensity;  // Vertical tilt
      
      // APPLY COMBINED TRANSFORM: base transform + mouse tilt
      element.style.transform = `${baseTransform} rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
    };

    /**
     * MOUSE LEAVE HANDLER
     * ===================
     * Resets element rotation to default when cursor exits tracking area.
     * Preserves baseTransform (e.g., keeps card flipped if it was flipped).
     */
    const handleMouseLeave = () => {
      element.style.transform = baseTransform; // Reset to base transform (removes tilt)
    };

    // ATTACH EVENT LISTENERS
    // ======================
    trackingElement.addEventListener('mousemove', handleMouseMove);
    trackingElement.addEventListener('mouseleave', handleMouseLeave);

    // CLEANUP FUNCTION
    // ================
    // Remove listeners when component unmounts or dependencies change
    return () => {
      trackingElement.removeEventListener('mousemove', handleMouseMove);
      trackingElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elementRef, intensity, baseTransform, containerRef, ...dependencies]); // Re-run when these change
};

export default use3DMouseTracking;
