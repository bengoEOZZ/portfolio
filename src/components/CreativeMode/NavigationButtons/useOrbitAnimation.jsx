/**
 * USEORBITANIMATION HOOK
 * ======================
 * 
 * Custom React hook that manages the complex orbital animation for navigation buttons.
 * Creates smooth elliptical motion with z-index changes and dynamic positioning.
 * 
 * ANIMATION PHASES:
 * 1. Initial Positioning: Center all buttons in the very center of the container
 * 2. Outward Transition: Smooth movement to orbital positions (1.5s)
 * 3. Orbital Motion: Continuous elliptical rotation
 * 4. Depth Effects: Dynamic z-index based on position, giving illusion of depth
 * 
 * COORDINATE SYSTEM:
 * - Uses elliptical orbit (900px horizontal × 600px vertical radius)
 * - Center calculated from container dimensions
 * 
 * PERFORMANCE FEATURES:
 * - requestAnimationFrame for smooth 60fps animation
 * - Extensively pre-calculated values for maximum per-frame performance
 * - Batched z-index updates to prevent unnecessary DOM writes
 * - Centralized configuration for easy tuning and better performance
 */

import { useEffect, useRef } from 'react';

/**
 * CENTRALIZED CONFIGURATION
 * =========================
 */
const CONFIG = {
    // Orbital dimensions
    HORIZONTAL_RADIUS: 900,
    VERTICAL_RADIUS: 600,
    
    // Animation timing
    ROTATION_SPEED: 0.01,                   /* Rotations per frame (radians) */
    INITIAL_DELAY: 1000,                    /* Delay before outward transition (milliseconds) */
    INITIAL_TRANSITION_DURATION: 1500,      /* Outward transition duration (milliseconds) */
    Z_INDEX_DELAY: 3500,                    /* Delay before enabling depth effects (milliseconds) */
    
    // Depth effects
    DEPTH_TOLERANCE: 300,          /* Y-axis threshold for depth detection to prevent clipping */
    Z_INDEX: {
        BEHIND: 4,
        FRONT: 15
    }
};

/**
 * useOrbitAnimation Hook Implementation
 * ====================================
 */
function useOrbitAnimation(buttonsRef, buttonClassName) {
    const animationRef = useRef(null);      // Stores animation frame ID for cleanup
    const angleRef = useRef(0);             // Current rotation angle in radians

    /**
     * MAIN ANIMATION EFFECT
     * ====================
     */
    useEffect(() => {
        const buttonsWrapper = buttonsRef.current;
        if (!buttonsWrapper) return;

        /* INITIALIZATION & SETUP */
        const buttons = buttonsWrapper.querySelectorAll(`.${buttonClassName}`);
        const buttonsArray = Array.from(buttons); // Convert NodeList to Array for easier manipulation
        const centerX = buttonsWrapper.offsetWidth / 2;
        const centerY = buttonsWrapper.offsetHeight / 2;
        const currentZIndex = buttonsArray.map(() => null); // Track current z-index state for each button
        let forceZIndex = true; // Flag to force current z-index (behind) before initial transitions

        /**
         * PERFORMANCE OPTIMIZATION: EXTENSIVELY PRE-CALCULATED VALUES
         * =================================================
         * Pre-calculate EVERYTHING possible to minimize per-frame calculations
         */
        
        /**
         * ANGULAR ROTATION OFFSETS (Pre-calculated)
         * ====================================
         * Each button needs a fixed position around the orbit circle.
         * Formula: (button_index × 2π) ÷ total_buttons
         * 
         * Example for the 4 Navigation buttons:
         * - Button 0: 0° (0 radians)
         * - Button 1: 90° (π/2 radians) 
         * - Button 2: 180° (π radians)
         * - Button 3: 270° (3π/2 radians)
         */
        const buttonOffsets = buttonsArray.map((_, index) => 
            (index * Math.PI * 2) / buttonsArray.length
        );
        
        /**
         * HALF-BUTTON DIMENSIONS (Pre-calculated)
         * ======================================
         * Needed for perfect centering of buttons in their orbital positions.
         */
        const buttonHalfWidths = buttonsArray.map(button => button.offsetWidth / 2);
        const buttonHalfHeights = buttonsArray.map(button => button.offsetHeight / 2);
        
        /**
         * INITIAL CENTERED POSITIONS (Pre-calculated)
         * ===============================================
         * Starting position for each button (center of container).
         */
        const initialPositions = buttonsArray.map((_, index) => ({
            x: centerX - buttonHalfWidths[index],
            y: centerY - buttonHalfHeights[index]
        }));
        
        /**
         * ORBITAL POSITIONS (Pre-calculated)
         * ======================================
         * Positions for each button around the orbital ellipse.
         * Formula: center + (radius × cos/sin(angle)) - buttonHalf
         */
        const orbitalPositions = buttonsArray.map((_, index) => ({
            x: centerX + CONFIG.HORIZONTAL_RADIUS * Math.cos(buttonOffsets[index]) - buttonHalfWidths[index],
            y: centerY + CONFIG.VERTICAL_RADIUS * Math.sin(buttonOffsets[index]) - buttonHalfHeights[index]
        }));
        
        /**
         * ORBITAL CONSTANTS (Pre-calculated)
         * ======================================
         * Constants used in the animation loop for position calculation.
         */
        const orbitalConstants = buttonsArray.map((_, index) => ({
            baseX: centerX - buttonHalfWidths[index],      // Pre-calculated X origin for this button
            baseY: centerY - buttonHalfHeights[index]      // Pre-calculated Y origin for this button
        }));
        
        /**
         * DEPTH EFFECT THRESHOLDS (Pre-calculated)
         * ============================================
         * Y-axis boundaries for determining when buttons appear "behind" or "in front".
         * Used for z-index changes that create 3D depth illusion.
         */
        const depthThresholds = {
            behind: centerY - CONFIG.DEPTH_TOLERANCE,
            front: centerY + CONFIG.DEPTH_TOLERANCE
        };

        /**
         * PHASE 1: INITIAL POSITIONING
         * ============================
         * Center all buttons using pre-calculated positions
         */
        buttonsArray.forEach((button, index) => {
            button.style.position = "absolute";
            
            /* Use pre-calculated initial positions */
            button.style.left = `${initialPositions[index].x}px`;
            button.style.top = `${initialPositions[index].y}px`;
        });

        /**
         * PHASE 2: INITIAL OUTWARD TRANSITION ANIMATION
         * =====================================
         * Smooth movement to pre-calculated orbital positions
         */
        const timeoutId = setTimeout(() => {
            buttonsArray.forEach((button, index) => {
                /* Use pre-calculated orbital positions */
                button.style.left = `${orbitalPositions[index].x}px`;
                button.style.top = `${orbitalPositions[index].y}px`;

                /* Smooth transitions to ease into orbital positions */
                button.style.transition = `all ${CONFIG.INITIAL_TRANSITION_DURATION}ms ease`;
            });

            /**
             * PHASE 3: CONTINUOUS ORBITAL MOTION
             * ==================================
             * Orbital animation loop using pre-calculated constants
             */
            function animateButtons() {
                const currentAngle = angleRef.current; // Cache angle once per frame
                
                buttonsArray.forEach((button, index) => {
                    const totalAngle = currentAngle + buttonOffsets[index];     // Calculated Angle
                    
                    // Minimal per-frame calculations using pre-calculated values
                    const x = orbitalConstants[index].baseX + CONFIG.HORIZONTAL_RADIUS * Math.cos(totalAngle);
                    const y = orbitalConstants[index].baseY + CONFIG.VERTICAL_RADIUS * Math.sin(totalAngle);
                    
                    button.style.left = `${x}px`;
                    button.style.top = `${y}px`;

                    /**
                     * PHASE 4: OPTIMIZED DEPTH PERCEPTION EFFECTS
                     * ===========================================
                     * Using pre-calculated thresholds and centralized z-index values.
                     * Only force z-index changes after initial outward transition.
                     */
                    if (!forceZIndex) {
                        let newZIndex = null;

                        if (y < depthThresholds.behind) {
                            /* Button is in upper orbital region - appears behind other elements */
                            newZIndex = CONFIG.Z_INDEX.BEHIND;
                        } else if (y > depthThresholds.front) {
                            /* Button is in lower orbital region - appears in front of other elements */
                            newZIndex = CONFIG.Z_INDEX.FRONT;
                        }

                        /* Only update z-index if a change is detected */
                        if (newZIndex !== null && currentZIndex[index] !== newZIndex) {
                            button.style.zIndex = newZIndex;
                            currentZIndex[index] = newZIndex;
                        }
                    }
                });

                /* Increments the orbital rotation angle per frame */
                angleRef.current += CONFIG.ROTATION_SPEED;

                /* requestAnimationFrame syncs with browser's refresh rate (usually 60fps) */
                animationRef.current = requestAnimationFrame(animateButtons);
            }

            animateButtons();   // Start the entire animation after an intial delay
        }, CONFIG.INITIAL_DELAY);
        
        const zIndexTimeout = setTimeout(() => {
            forceZIndex = false;    // Allow z-index changes after well into starting orbital motion
        }, CONFIG.Z_INDEX_DELAY);

        /* CLEANUP FUNCTION */
        return () => {
            clearTimeout(timeoutId);            // Cancel outward transition if still pending
            clearTimeout(zIndexTimeout);        // Cancel depth effects activation if still pending
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);     // Stop orbital animation loop
            }
        };
    }, [buttonsRef, buttonClassName]);
}

export default useOrbitAnimation;