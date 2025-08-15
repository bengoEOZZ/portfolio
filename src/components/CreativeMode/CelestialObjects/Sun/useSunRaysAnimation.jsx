/**
 * USESUNRAYSANIMATION HOOK - OPTIMIZED VERSION
 * ============================================
 * 
 * Custom React hook that manages complex time-based sun ray animations that change throughout
 * the celestial day cycle. Creates dynamic, staggered ray patterns corresponding to morning,
 * afternoon, and evening periods based on the sun's rotation.
 *
 * ANIMATION PHASES:
 * 2. Initial Fade-in animation: Register elements for animation and schedule start times
 * 3. Continuous Sparkling: Run continuous ping-pong sparkling opacity animations via requestAnimationFrame
 * 4. Reset Animation: Reset animation when time periods change (morning→afternoon→evening)
 * 
 * TIME PERIOD SYSTEM:
 * - MORNING (0-12h): Gentle, short patterns with linear progression (104 total rays)
 * - AFTERNOON (13-18h): Dense, vibrant patterns for peak intensity (323 total rays)
 * - EVENING (19-23h): Dramatic spacing with 3x gaps for sunset effect (107 rays, spaced)
 * 
 * COORDINATE SYSTEM:
 * - Uses SVG polygon elements with IDs formatted as "ray{1-5}-{1-150}"
 *   - Each ray is a polygon element that animates opacity based on time period
 * - Time period determines which rays are active and their opacity animation patterns
 */

import { useEffect, useRef, useMemo } from 'react';

/**
 * CENTRALIZED CONFIGURATIONS
 * ==========================
 */

/* Ray pattern configurations for each time period */
const RAY_CONFIGURATIONS = {
    MORNING: {    // Gentle glow patterns
        ray1: { length: 4, pattern: i => i + 1 },
        ray2: { length: 15, pattern: i => i + 1 },
        ray3: { length: 40, pattern: i => i + 1 },
        ray4: { length: 25, pattern: i => i + 1 },
        ray5: { length: 20, pattern: i => i + 1 }
    },
    AFTERNOON: {    // Peak intensity
        ray1: { length: 15, pattern: i => i + 1 },
        ray2: { length: 70, pattern: i => i + 1 },
        ray3: { length: 105, pattern: i => i + 1 },
        ray4: { length: 76, pattern: i => i + 1 },
        ray5: { length: 57, pattern: i => i + 1 }
    },
    EVENING: {  // Evening glow: every 3rd
        ray1: { length: 15, pattern: i => i * 3 + 1 },
        ray2: { length: 70, pattern: i => i * 3 + 1 },
        ray3: { length: 105, pattern: i => i * 3 + 1 },
        ray4: { length: 76, pattern: i => i * 3 + 1 },
        ray5: { length: 57, pattern: i => i * 3 + 1 }
    }
};

/* Animation timing constants */
const ANIMATION_CONFIG = {
    FADE_DURATION: 1000,               /* 1s fade-in/fade-out per ray */
    STAGGER_DELAY: 200,                /* 200ms between each individual ray fade in animation */
    ANIMATION_FPS: 60                  /* 60fps for smooth animations */
};

/**
 * PRE-COMPUTED OPTIMIZATIONS
 * =========================
 * Calculate expensive operations once for optimal performance
 */

/**
 * ANIMATION STEP
 * ==============
 * ANIMATION_STEP = 1 / (FADE_DURATION / (1000 / ANIMATION_FPS))
 * - FADE_DURATION: total fade time in ms (e.g., 1000ms)
 * - ANIMATION_FPS: frames per second (e.g., 60)
 * - (1000 / ANIMATION_FPS): ms per frame
 * - (FADE_DURATION / ms per frame): total frames in fade
 * - 1 / total frames: opacity increment per frame
 */
const ANIMATION_STEP = 1 / (ANIMATION_CONFIG.FADE_DURATION / (1000 / ANIMATION_CONFIG.ANIMATION_FPS));

/* Time period lookup table */
const TIME_PERIODS = {
    0: 'MORNING', 1: 'MORNING', 2: 'MORNING', 3: 'MORNING', 4: 'MORNING', 5: 'MORNING',
    6: 'MORNING', 7: 'MORNING', 8: 'MORNING', 9: 'MORNING', 10: 'MORNING', 11: 'MORNING', 12: 'MORNING',
    13: 'AFTERNOON', 14: 'AFTERNOON', 15: 'AFTERNOON', 16: 'AFTERNOON', 17: 'AFTERNOON', 18: 'AFTERNOON',
    19: 'EVENING', 20: 'EVENING', 21: 'EVENING', 22: 'EVENING', 23: 'EVENING'
};

/* Pre-computed ray patterns */
const PRECOMPUTED_PATTERNS = Object.fromEntries(
    Object.entries(RAY_CONFIGURATIONS).map(([period, config]) => [
        period, // "MORNING", "AFTERNOON", or "EVENING"
        Object.fromEntries(
            Object.entries(config).map(([rayKey, rayConfig]) => [
                rayKey, // "ray1", "ray2", etc.
                Array.from({ length: rayConfig.length }, (_, i) => rayConfig.pattern(i)) // Map ray patterns
            ])
        )
    ])
);

/**
 * useSunRaysAnimation Hook Implementation
 * ======================================
 */
function useSunRaysAnimation(currentHour) {
    /* REFERENCES */
    const polygonCacheRef = useRef({});                 // Smart DOM element cache (time-period specific)
    const animationStateRef = useRef(new Map());        // Stores active animation states
    const timeoutRef = useRef([]);                      // Timeout ID references
    const prevTimePeriodRef = useRef(null);             // Previous time period tracker
    const rafRef = useRef(null);                        // RequestAnimationFrame ID
    const isAnimatingRef = useRef(false);               // Animation loop status flag

    /**
     * OPTIMIZED TIME PERIOD DETECTION
     * ===============================
     * Ultra-fast time period detection using pre-computed lookup table
     * 
     * MATHEMATICAL BREAKDOWN:
     * - rotation (0-360) represents 24-hour cycle
     * - Each hour = 15 degrees (360 ÷ 24 = 15)
     * - Math.floor((rotation % 360) / 15) = current hour
     * - TIME_PERIODS[hour] = instant lookup vs conditional chains
     */
    const currentTimePeriod = useMemo(() => {
        return TIME_PERIODS[currentHour % 24];
    }, [currentHour]); /* Only recalc when hour changes */

    /**
     * SMART DOM ELEMENT CACHING
     * =========================
     * Intelligent caching that only queries DOM elements actually needed for current time period
     *
     * CACHE STRUCTURE (Time-Period Specific):
     * {
     *   'MORNING': {
     *     ray1: [polygon1, polygon2, ...],     // Only elements used in MORNING
     *     ray2: [polygon1, polygon2, ...],
     *     ...
     *   },
     */
    const getPolygonCache = (timePeriod) => {
        if (!polygonCacheRef.current[timePeriod]) {
            polygonCacheRef.current[timePeriod] = {};
            const patterns = PRECOMPUTED_PATTERNS[timePeriod];
            
            /* Cache only polygons that will actually be used in this time period */
            Object.keys(patterns).forEach(rayKey => {
                const rayNum = rayKey.replace('ray', '');
                const indices = patterns[rayKey];
                
                polygonCacheRef.current[timePeriod][rayKey] = indices // Store found elements
                    .map(i => document.querySelector(`polygon[id="ray${rayNum}-${i}"]`))
                    .filter(Boolean); // Remove any null/undefined elements
            });
        }
        
        return polygonCacheRef.current[timePeriod];
    };

    /**
     * ANIMATION LOOP
     * ==============
     * Animation loop using requestAnimationFrame that runs 60 times per second and updates
     * the opacity (visibility) of each ray to create a pulsing/shining effect.
     * 
     * ANIMATION STATE STRUCTURE:
     * Each ray element has state: {
     *   opacity: #,          // Current opacity value (0-1)
     *   startOpacity: 0,     // Minimum opacity in ping-pong cycle
     *   endOpacity: 1,       // Maximum opacity in ping-pong cycle
     *   step: #,             // Pre-calculated change per frame (ANIMATION_STEP)
     *   direction: #         // 1 = fading in, -1 = fading out
     * }
     * 
     * PING-PONG ANIMATION MATHEMATICS:
     * -------------------------------
     * 1. Start with opacity = 0, direction = 1 (fading in)
     * 2. Each frame: opacity += ANIMATION_STEP * direction
     * 3. When opacity reaches endOpacity (1): flip direction = -1 (start fading out)
     * 4. When opacity reaches startOpacity (0): flip direction = 1 (start fading in)
     * 5. Repeat forever = continuous shining/pulsing effect
     */
    const updateAnimations = () => {
        let activeAnimations = 0;                     // Count how many rays are currently animating
        const elementsToRemove = [];                  // Track broken/invalid animations for cleanup
        
        /* Update all active animations in single efficient loop */
        animationStateRef.current.forEach((state, element) => { // Loop through each ray that's animating
            
            /* Memory leak prevention: remove invalid elements */
            if (!document.contains(element) || !isAnimatingRef.current) { // Check if ray still exists in DOM
                elementsToRemove.push(element);                           // Mark for cleanup if broken
                return;                                                   // Skip to next ray
            }
            
            /* Calculate new opacity value using pre-calculated step */
            state.opacity += ANIMATION_STEP * state.direction;      // Increase or decrease opacity
            
            /* Apply boundary constraints to prevent overflow */
            if (state.opacity < 0) state.opacity = 0;           // Don't go below 0 (invisible)
            if (state.opacity > 1) state.opacity = 1;           // Don't go above 1 (fully visible)
            
            /* 
            * APPLY VISUAL CHANGES TO DOM
            * ============================
            */
            element.style.opacity = state.opacity.toFixed(2); // Set the visual opacity (rounded to 2 decimals)

            /* Handle animation direction changes for pulsing effect */
            if (state.direction === 1 && state.opacity >= state.endOpacity) { // If reached full visibility
                state.direction = -1;                                         // Switch to fading OUT
            } else if (state.direction === -1 && state.opacity <= state.startOpacity) {
                state.direction = 1;                                          // Switch to fading IN
            }
            
            activeAnimations++;   // Count this as an active animation
        });
        
        /* MEMORY CLEANUP: Remove completed/invalid animations */
        elementsToRemove.forEach(element => {                  // Go through broken animations
            animationStateRef.current.delete(element);         // Remove from memory
        });
        
        /* Continue animation loop only if animations are active */
        if (activeAnimations > 0 && isAnimatingRef.current) {            // If rays are still animating
            rafRef.current = requestAnimationFrame(updateAnimations);    // Schedule next frame (60fps)
        }
    };

    /**
     * ANIMATION REGISTRATION SYSTEM
     * =============================
     * Registers DOM elements for continuous ping-pong opacity animation within the main RAF loop.
     * Each registered element will pulse between startOpacity and endOpacity indefinitely until
     * the animation system is reset or the element is removed from the DOM.
     */
    const startOpacityAnimation = (element, startOpacity = 0, endOpacity = 1) => {
        /* Register animation state with pre-calculated step for optimal performance */
        animationStateRef.current.set(element, {
            opacity: startOpacity,        // Begin animation at minimum opacity
            startOpacity,                 // Store lower boundary for direction changes
            endOpacity,                   // Store upper boundary for direction changes
            step: ANIMATION_STEP,         // Use pre-calculated step for optimal performance
            direction: 1                  // Start by fading IN (opacity increasing)
        });
        
        /* Start RAF loop if not already running */
        if (!isAnimatingRef.current) {
            isAnimatingRef.current = true;
            rafRef.current = requestAnimationFrame(updateAnimations);
        }
    };

    /**
     * COMPREHENSIVE ANIMATION STATE RESET
     * ===================================
     * CLEANUP OPERATIONS:
     * 1. Cancel active requestAnimationFrame loop
     * 2. Clear all animation state references for garbage collection
     * 3. Cancel pending stagger timeouts to prevent delayed executions
     * 4. Reset all cached polygon visibility to baseline
     */
    const resetAnimations = () => {
        /* Stop animation loop to prevent memory leaks */
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        isAnimatingRef.current = false;
        
        /* Clear animation states for garbage collection */
        animationStateRef.current.clear();
        
        /* Cancel pending timeouts to prevent delayed executions */
        timeoutRef.current.forEach(timeout => clearTimeout(timeout));
        timeoutRef.current = [];
        
        /* Reset polygon visibility using time-period specific cached references */
        Object.values(polygonCacheRef.current).forEach(timePeriodCache => {
            Object.values(timePeriodCache).forEach(rayPolygons => {
                rayPolygons.forEach(polygon => {
                    if (polygon) {
                        polygon.style.opacity = '0'; // Reset to invisible
                    }
                });
            });
        });
    };

    /**
     * STREAMLINED ANIMATION SETUP
     * ===========================
     * Creates staggered animation startup sequence for all ray groups simultaneously.
     *
     * STAGGERING MATHEMATICS:
     * ----------------------
     * delay = index * STAGGER_DELAY (200ms)
     * 
     * VISUAL EFFECT:
     * • Ray 1 starts immediately (0ms)
     * • Ray 2 starts +200ms later  
     * • Ray 3 starts +400ms later
     * • Creates beautiful cascading wave effect across all ray groups
     */
    const setupAnimations = (timePeriod) => {
        const cache = getPolygonCache(timePeriod); // Get cached DOM elements for current time period
        
        Object.entries(cache).forEach(([_, polygons]) => {     // Loop through each ray group (ray1-ray5)
            polygons.forEach((polygon, index) => {             // Process each polygon in ray group
                const timeout = setTimeout(() => {             // Schedule delayed animation start
                    startOpacityAnimation(polygon);
                }, index * ANIMATION_CONFIG.STAGGER_DELAY);    // Delay = index × 200ms (creates wave effect)

                timeoutRef.current.push(timeout);              // Track timeout for cleanup
            });
        });
    };

    /**
     * ANIMATION ORCHESTRATION CONTROLLER
     * ==================================
     * ORCHESTRATION RESPONSIBILITIES:
     * - Detects time period boundary crossings (MORNING → AFTERNOON → EVENING)
     * - Coordinates animation state transitions with cleanup
     * - Initializes new animation patterns using pre-computed optimizations
     * - Manages complete animation lifecycle with memory leak prevention
     */
    useEffect(() => {
        /* BOUNDARY DETECTION */
        const timePeriodChanged = prevTimePeriodRef.current !== null && 
                                 prevTimePeriodRef.current !== currentTimePeriod;
        
        prevTimePeriodRef.current = currentTimePeriod;
        
        /* Handle time period transitions with cleanup */
        if (timePeriodChanged) {
            resetAnimations();
        }
        
        /* Setup animations using optimized caching and pre-computed patterns */
        setupAnimations(currentTimePeriod);

        /* 
         * CLEANUP FUNCTION
         * ================
         */
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);   // Stop animation loop
            }
            isAnimatingRef.current = false;
            animationStateRef.current.clear();          // Prevent memory leaks
            timeoutRef.current.forEach(timeout => clearTimeout(timeout));
            timeoutRef.current = [];
        };
        
    }, [currentTimePeriod]); /* Only re-run when time period actually changes */
}

export default useSunRaysAnimation;