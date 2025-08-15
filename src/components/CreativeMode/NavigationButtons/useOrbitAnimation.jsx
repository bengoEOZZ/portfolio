/**
 * USEORBITANIMATION HOOK
 * ======================
 * 
 * Custom React hook that manages the complex orbital animation for navigation buttons.
 * Creates smooth elliptical motion with z-index changes and dynamic positioning.
 * 
 * ANIMATION PHASES:
 * 1. Initial Positioning: Center all buttons in the very center of the container
 * 2. Outward Transition: Smooth movement to orbital positions
 * 3. Orbital Motion: Continuous elliptical rotation
 * 4. Depth Effects: Dynamic z-index based on position, giving illusion of depth
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
    ROTATION_SPEED: 0.01,                           /* Rotations per frame (radians) */
    INITIAL_DELAY: 1000,                            /* Delay before outward transition (milliseconds) */
    Z_INDEX_DELAY: 3500,                            /* Delay before enabling depth effects (milliseconds) */
    
    // Depth effects - DELAYED BEHIND ZONE
    BEHIND_TOLERANCE: 725,              /* Behind threshold adjustment */
    FRONT_TOLERANCE: 200,               /* Front threshold adjustment */
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
        const buttonsWrapper = buttonsRef.current;  // Extract DOM element from React ref
        if (!buttonsWrapper) return;                // Exit early if element doesn't exist yet

        /* INITIALIZATION & SETUP */
        const buttons = buttonsWrapper.querySelectorAll(`.${buttonClassName}`); // Select all buttons
        const buttonsArray = Array.from(buttons); // Convert NodeList to Array for easier manipulation

        const centerX = buttonsWrapper.offsetWidth / 2; // Center X position
        const centerY = buttonsWrapper.offsetHeight / 2; // Center Y position

        const currentZIndex = buttonsArray.map(() => null); // Track current z-index state for each button
        let forceZIndex = true; // Flag to force current z-index (behind) for initial outward transition

        /**
         * PERFORMANCE OPTIMIZATION: EXTENSIVELY PRE-CALCULATED VALUES
         * ===========================================================
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
         * Also serves as the base point for orbital motion calculations.
         */
        const initialPositions = buttonsArray.map((_, index) => ({
            x: centerX - buttonHalfWidths[index],
            y: centerY - buttonHalfHeights[index]
        }));
        
        /**
         * ORBITAL POSITIONS (Pre-calculated)
         * ======================================
         * Positions for each button around the orbital ellipse.
         * Uses initialPositions as the centered base point.
         * 
         * FORMULA: pos: center + (radius × cos/sin(angle))
         */
        const orbitalPositions = buttonsArray.map((_, index) => ({
            x: initialPositions[index].x + CONFIG.HORIZONTAL_RADIUS * Math.cos(buttonOffsets[index]),
            y: initialPositions[index].y + CONFIG.VERTICAL_RADIUS * Math.sin(buttonOffsets[index])
        }));
        
        /**
         * DEPTH EFFECT THRESHOLDS (Pre-calculated)
         * ============================================
         * Y-axis boundaries for determining when buttons appear "behind" or "in front".
         * Behind zone starts later (more restrictive), front zone starts earlier.
         */
        const depthThresholds = {
            behind: centerY - CONFIG.BEHIND_TOLERANCE,     // Top threshold (starts later/higher up)
            front: centerY + CONFIG.FRONT_TOLERANCE   // Bottom threshold (starts earlier)
        };

        /**
         * PHASE 1: INITIAL POSITIONING
         * ============================
         * Center all buttons using pre-calculated positions
         */
        buttonsArray.forEach((button, index) => {
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
            });

            /**
             * PHASE 3: CONTINUOUS ORBITAL MOTION
             * ==================================
             * Orbital animation loop using pre-calculated constants
             */
            function animateButtons() {
                const currentAngle = angleRef.current; // Cache angle once per frame
                
                buttonsArray.forEach((button, index) => {
                    /**
                     * ANGLE CALCULATION: Combine fixed button offset with current rotation
                     * FORMULA: totalAngle = currentAngle + buttonOffset
                     */
                    const totalAngle = currentAngle + buttonOffsets[index];     // Calculated Angle

                    /**
                     * POSITION CALCULATION: Convert angle to screen coordinates using trigonometry
                     * FORMULA: position = centerPoint + (radius × cos/sin(angle))
                     */
                    const x = initialPositions[index].x + CONFIG.HORIZONTAL_RADIUS * Math.cos(totalAngle);
                    const y = initialPositions[index].y + CONFIG.VERTICAL_RADIUS * Math.sin(totalAngle);

                    // Set button position
                    button.style.left = `${x}px`;
                    button.style.top = `${y}px`;

                    /**
                     * PHASE 4: DEPTH PERCEPTION EFFECTS
                     * =================================
                     * Use pre-calculated thresholds and z-index values to force depth perception.
                     * Only force z-index changes after an initial delay (3.5s), see zIndexTimeout below.
                     */
                    if (!forceZIndex) {
                        let newZIndex = null;

                        if (y < depthThresholds.behind) {
                            /* Button is in upper orbital region - appears behind other elements */
                            newZIndex = CONFIG.Z_INDEX.BEHIND;
                            button.style.backgroundColor = 'rgba(255, 0, 0, 0.3)'; // RED = BEHIND
                        } else if (y > depthThresholds.front) {
                            /* Button is in lower orbital region - appears in front of other elements */
                            newZIndex = CONFIG.Z_INDEX.FRONT;
                            button.style.backgroundColor = 'rgba(0, 255, 0, 0.3)'; // GREEN = FRONT
                        }

                        /* Only update z-index if a change is detected */
                        if (newZIndex !== null && currentZIndex[index] !== newZIndex) {
                            button.style.zIndex = newZIndex;
                            currentZIndex[index] = newZIndex;
                        }
                    }
                });

                /* Increments the orbital rotation angle by rotation speed per frame */
                angleRef.current += CONFIG.ROTATION_SPEED;

                /* requestAnimationFrame syncs with browser's refresh rate (usually 60fps) */
                animationRef.current = requestAnimationFrame(animateButtons);
            }

            animateButtons();   // Start the entire animation after an intial delay (1s)
        }, CONFIG.INITIAL_DELAY);
        
        const zIndexTimeout = setTimeout(() => {
            forceZIndex = false;    // Only allow z-index changes after well after starting orbital motion
        }, CONFIG.Z_INDEX_DELAY);

        /* 
         * CLEANUP FUNCTION
         * ================
         */
        return () => {
            clearTimeout(timeoutId);            // Cancel outward transition if still pending
            clearTimeout(zIndexTimeout);        // Cancel depth effects timeout if still pending
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);     // Stop orbital animation loop
            }
        };
    }, [buttonsRef, buttonClassName]);
}

export default useOrbitAnimation;