/**
 * PAGE TRANSITION HOOK
 * ====================
 * Custom hook for managing smooth page transitions with unified state control.
 * Handles fade-out animations for multiple components simultaneously.
 */

import { useState } from 'react';

/**
 * usePageTransition Hook
 * ======================
 * Provides centralized control over page transition animations.
 * 
 * @returns {Object} - { transitioning, startTransition }
 *   - transitioning: Boolean indicating if transition is active
 *   - startTransition: Function to trigger transition with callback
 */
export const usePageTransition = () => {
  const [transitioning, setTransitioning] = useState(false);
  
  /**
   * Start Page Transition
   * =====================
   * Triggers fade-out animation, executes callback, then resets state.
   * 
   * @param {Function} callback - Function to execute during transition
   * @param {number} duration - Animation duration in milliseconds (default: 600)
   */
  const startTransition = (callback, duration = 600) => {
    // Start transition animation
    setTransitioning(true);
    
    // Execute callback after animation completes
    setTimeout(() => {
      if (callback) callback();
      setTransitioning(false);
    }, duration);
  };
  
  return { 
    transitioning, 
    startTransition 
  };
};