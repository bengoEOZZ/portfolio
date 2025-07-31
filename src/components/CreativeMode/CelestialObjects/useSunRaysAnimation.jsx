/**
 * USESUNRAYSANIMATION HOOK
 * ========================
 * 
 * Custom React hook that manages complex time-based sun ray animations that change throughout
 * the celestial day cycle. Creates dynamic, staggered ray patterns corresponding to morning,
 * afternoon, and evening periods based on the sun's rotation.
 * 
 * ANIMATION PHASES:
 * 1. Time Period Detection: Calculate current time period from sun rotation (0-360°)
 * 2. DOM Element Caching: Locate and cache all target SVG polygon elements
 * 3. Pattern Index Calculation: Pre-calculate ray patterns and indices for each time period
 * 4. Hardware Acceleration: Initialize GPU-optimized elements for performance
 * 5. Main Animation Loop: Single requestAnimationFrame loop manages all ray opacity transitions
 * 6. Animation Lifecycle Management: Setup, reset, and coordinate all animation transitions
 * 
 * TIME PERIOD SYSTEM:
 * - MORNING (0-12h): Gentle, sparse patterns with linear progression (104 total rays)
 * - AFTERNOON (13-18h): Dense, vibrant patterns for peak intensity (323 total rays)
 * - EVENING (19-23h): Dramatic spacing with 3x gaps for sunset effect (107 rays, spaced)
 * 
 * COORDINATE SYSTEM:
 * - Uses SVG polygon elements with IDs formatted as "ray{1-5}-{1-150}"
 *   - Each ray is a polygon element that animates opacity based on time period
 * - Time period determines which rays are active and their opacity animation patterns
 * 
 * PERFORMANCE FEATURES:
 * - Single DOM cache eliminates 750+ queries per transitionsrc/components/CreativeMode/CelestialObjects/WeatherEffects.jsx
 * - Hardware-accelerated transforms for performance improvement
 * - Single requestAnimationFrame loop for all animations (vs individual timers)
 * - Memoized time detection prevents unnecessary recalculations
 */

import { useEffect, useRef, useMemo } from 'react';

/**
 * CENTRALIZED CONFIGURATIONS
 * ==========================
 */

/* Ray pattern configurations for each time period */
const RAY_CONFIGURATIONS = {    // Gentle glow patterns
    MORNING: {
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
 * useSunRaysAnimation Hook Implementation
 * ======================================
 */
function useSunRaysAnimation(rotation) {
    /* REFERENCES */
    const polygonCacheRef = useRef(null);           // DOM element cache (built once)
    const animationStateRef = useRef(new Map());    // Active animation states
    const timeoutRef = useRef([]);                  // Stagger timeout references
    const prevTimePeriodRef = useRef(null);         // Previous time period tracking
    const rafRef = useRef(null);                    // RequestAnimationFrame ID
    const isAnimatingRef = useRef(false);           // Animation loop status flag

    /**
     * PHASE 1: TIME PERIOD DETECTION
     * ==============================
     * Memoized time period detection based on sun rotation
     * 
     * MATHEMATICAL BREAKDOWN:
     * - rotation (0-360) represents 24-hour cycle
     * - Each hour = 15 degrees (360 ÷ 24 = 15)
     * - Math.floor((rotation % 360) / 15) = current hour
     *
     * PERFORMANCE OPTIMIZATION:
     * The useMemo dependency [Math.floor((rotation % 360) / 15)] ensures this
     * expensive calculation only runs when the HOUR actually changes.
     */
    const currentTimePeriod = useMemo(() => {
        const currentHour = ((12 + Math.floor((rotation % 360) / 15)) % 24);
        
        if (currentHour >= 0 && currentHour <= 12) return 'MORNING';
        if (currentHour >= 13 && currentHour <= 18) return 'AFTERNOON';
        return 'EVENING';
    }, [Math.floor((rotation % 360) / 15)]); /* Only recalc when hour changes */

    /**
     * PHASE 2: DOM ELEMENT CACHING
     * ============================
     * Locate and cache all target SVG polygon elements
     * 
     * CACHE STRUCTURE:
     * {
     *   ray1: { 1: polygonElement, 2: polygonElement, ... },
     *   ray2: { 1: polygonElement, 2: polygonElement, ... },
     *   ray3: { 1: polygonElement, 2: polygonElement, ... },
     *   ray4: { 1: polygonElement, 2: polygonElement, ... },
     *   ray5: { 1: polygonElement, 2: polygonElement, ... }
     * }
     */
    const getPolygonCache = () => {
        if (!polygonCacheRef.current) {
            polygonCacheRef.current = {};
            
            /* Build comprehensive polygon cache for all 5 ray groups */
            for (let rayNum = 1; rayNum <= 5; rayNum++) {
                polygonCacheRef.current[`ray${rayNum}`] = {};
                
                /* Cache all possible polygon indices (1-150) for this ray group */
                for (let i = 1; i <= 150; i++) {
                    const polygon = document.querySelector(`polygon[id="ray${rayNum}-${i}"]`);
                    if (polygon) {
                        polygonCacheRef.current[`ray${rayNum}`][i] = polygon;
                    }
                }
            }
        }
        
        return polygonCacheRef.current;
    };

    /**
     * PHASE 3: PATTERN INDEX CALCULATION
     * ==================================
     * Pre-calculate ray patterns and indices for optimal performance
     */

    /**
     * PRE-CALCULATED PATTERN INDICES
     * ============================= =
     * Calculate pattern indices once instead of repeatedly during animation
     * 
     * PATTERN EXAMPLES:
     * - MORNING/AFTERNOON: i => i + 1 produces [1,2,3,4,5...]
     * - EVENING: i => i * 3 + 1 produces [1,4,7,10,13...] for dramatic spacing
     */
    const getPatternIndices = (length, pattern) => {
        return Array.from({ length }, (_, i) => pattern(i));
    };

    /**
     * EFFICIENT RAY POLYGON SELECTION
     * ===============================
     * Uses cached polygons with pre-calculated patterns
     * 
     * PROCESS FLOW:
     * 1. Get cached polygon references (zero DOM queries)
     * 2. Apply pre-calculated pattern indices
     * 3. Filter out null/undefined elements
     * 4. Return ready-to-animate polygon array
     */
    const getRayPolygons = (rayNum, config) => {
        const cache = getPolygonCache();
        const indices = getPatternIndices(config.length, config.pattern);
        
        return indices
            .map(i => cache[`ray${rayNum}`][i])
            .filter(Boolean); // Remove any null/undefined elements
    };

    /**
     * PHASE 4: HARDWARE ACCELERATION
     * ==============================
     * Initialize GPU-optimized elements for performance
     * 
     * TECHNICAL BREAKDOWN:
     * - willChange: 'transform, opacity' → Signals browser to optimize these properties
     * - translateZ(0) → Forces GPU layer creation for hardware acceleration
     *   - "hack" that tricks the browser into GPU acceleration
     * - opacity: '0' → Set initial visibility
     * - dataset.optimized → Custom data attribute to mark "this element is already optimized"
     *   - Prevents running this expensive setup multiple times on same element
     */
    const initializeHardwareAcceleration = (elements) => {
        elements.forEach(element => {
            if (element && !element.dataset.optimized) {
                element.style.willChange = 'transform, opacity';  // Signal browser optimization
                element.style.transform = 'translateZ(0)';        // Force GPU layer
                element.style.opacity = '0';                      // Set initial visibility
                element.dataset.optimized = 'true';               // Mark as optimized
            }
        });
    };

    /**
     * PHASE 5: MAIN ANIMATION LOOP
     * ============================
     * Single requestAnimationFrame loop manages all ray opacity transitions
     * 
     * EXPLANATION:
     * -------------------------
     * BEFORE: Each ray had its own setInterval timer (potentially 323+ timers running)
     *   - Massive performance intensity
     *   - Browser struggles to deal with many individual timers
     * 
     * AFTER: One unified requestAnimationFrame loop handles everything
     *   - Perfect 60fps sync with browser refresh rate
     *   - All animations stay perfectly synchronized
     *   - Massive performance improvement
     * 
     * ANIMATION STATE STRUCTURE:
     * -------------------------
     * Each ray element has state: {
     *   opacity: #,          // Current opacity value (0-1)
     *   startOpacity: 0,     // Minimum opacity in ping-pong cycle
     *   endOpacity: 1,       // Maximum opacity in ping-pong cycle
     *   step: #,             // How much to change opacity each frame
     *   direction: #         // 1 = fading in, -1 = fading out
     * }
     * 
     * PING-PONG ANIMATION MATHEMATICS:
     * -------------------------------
     * 1. Start with opacity = 0, direction = 1 (fading in)
     * 2. Each frame: opacity += step * direction
     * 3. When opacity reaches endOpacity (1): flip direction = -1 (start fading out)
     * 4. When opacity reaches startOpacity (0): flip direction = 1 (start fading in)
     * 5. Repeat forever = continuous shining/pulsing effect
     */
    const updateAnimations = () => {
        let activeAnimations = 0;   // Counter to track how many rays are currently animating
        
        /* Update all active animations in single efficient loop */
        animationStateRef.current.forEach((state, element) => {
            /* Calculate new opacity value */
            state.opacity += state.step * state.direction;
            
            /* Apply boundary constraints to prevent overflow */
            if (state.opacity < 0) state.opacity = 0;
            if (state.opacity > 1) state.opacity = 1;
            
            /* 
            * APPLY VISUAL CHANGES TO DOM
            * ============================
            * Update the actual visual appearance
            * - Rounds to 2 decimal places for clean CSS values (toFixed(2))
            * - Directly setting element.style.opacity is GPU-accelerated
            * - This is the ONLY DOM manipulation per ray per frame
            */
            element.style.opacity = state.opacity.toFixed(2);
            
            /* Ensure the translateZ(0) is still present to keep GPU layer active */
            if (!element.style.transform.includes('translateZ(0)')) {
                element.style.transform = 'translateZ(0)';
            }

            /* Handle animation direction changes for shining/pulsing effect */
            if (state.direction === 1 && state.opacity >= state.endOpacity) {
                state.direction = -1; // Start fading out
            } else if (state.direction === -1 && state.opacity <= state.startOpacity) {
                state.direction = 1;  // Start fading in
            }
            
            activeAnimations++;
        });
        
        /* Continue animation loop only if one or more animations are active */
        if (activeAnimations > 0 && isAnimatingRef.current) {
            rafRef.current = requestAnimationFrame(updateAnimations);
        }
    };

    /**
     * PHASE 6: ANIMATION LIFECYCLE MANAGEMENT
     * =====================================
     * Setup, reset, and coordinate all animation transitions
     */

    /**
     * START OPACITY ANIMATION AND ELEMENT REGISTRATION
     * ================================================
     * Register individual elements for unified animation control and start their opacity animation
     * 
     * MATHEMATICAL PRECISION:
     * step = (endOpacity - startOpacity) / [duration / (1000 / FPS)]
     *
     * Example: 1000ms fade, 60fps target
     * step = (1 - 0) / (1000 / 16.67) = 1 / 60 = 0.0167 per frame
     * 
     * FORMULA BREAKDOWN:
     * -----------------
     * • (endOpacity - startOpacity) = Total opacity change needed (usually 1 - 0 = 1)
     * • [duration / (1000 / FPS)] = Total number of frames needed for animation
     *   • (1000 / FPS) = Milliseconds per frame at target FPS
     * • step = Total change ÷ Total frames = Change per frame
     */
    const startOpacityAnimation = (element, startOpacity, endOpacity, duration) => {
        /* Calculate precise step animation parameters for smooth transitions */
        const step = (endOpacity - startOpacity) / (duration / (1000 / ANIMATION_CONFIG.ANIMATION_FPS));
        
        /* Register animation state for centralized loop management */
        animationStateRef.current.set(element, {
            opacity: startOpacity,
            startOpacity,
            endOpacity,
            step,
            direction: 1
        });
        
        /* Start RAF loop if not already running */
        if (!isAnimatingRef.current) {
            isAnimatingRef.current = true;
            rafRef.current = requestAnimationFrame(updateAnimations);
        }
    };

    /**
     * ANIMATION STATE RESET
     * ====================
     * Prevents memory leaks and ensures clean state boundary transitions
     * 
     * CLEANUP OPERATIONS:
     * 1. Cancel active requestAnimationFrame loop
     * 2. Clear all animation state references
     * 3. Cancel pending stagger timeouts
     * 4. Reset all polygon visibility to baseline
     * 5. Maintain hardware acceleration optimizations
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
        
        /* Reset polygon visibility using cached references */
        const cache = getPolygonCache();
        Object.values(cache).forEach(rayPolygons => {
            Object.values(rayPolygons).forEach(polygon => {
                if (polygon) {
                    polygon.style.opacity = '0';               // Reset to invisible
                    polygon.style.transform = 'translateZ(0)'; // Maintain GPU acceleration
                }
            });
        });
    };

    /**
     * STAGGERED ANIMATION SETUP
     * ========================
     * Sets up complex staggered animations efficiently using cached elements
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
     * 
     * EXECUTION FLOW:
     * --------------
     * 1. Get time period configuration (MORNING/AFTERNOON/EVENING)
     * 2. For each ray group (ray1-ray5):
     *    - Extract ray number and configuration
     *    - Get cached polygon elements using pattern
     *    - Apply hardware acceleration
     *    - Start staggered animations with timeout delays
     * 3. Store timeout references for cleanup management
     */
    const setupAnimations = (timePeriod) => {
        const config = RAY_CONFIGURATIONS[timePeriod];
        
        /* Setup animations for all ray groups using pre-calculated configurations */
        Object.keys(config).forEach(rayKey => {
            const rayNum = rayKey.replace('ray', '');
            const rayConfig = config[rayKey];
            const polygons = getRayPolygons(rayNum, rayConfig);
            
            /* Enable hardware acceleration for optimal performance */
            initializeHardwareAcceleration(polygons);
            
            /* Create beautiful staggered animation sequence */
            polygons.forEach((polygon, index) => {
                const timeout = setTimeout(() => {
                    startOpacityAnimation(polygon, 0, 1, ANIMATION_CONFIG.FADE_DURATION);
                }, index * ANIMATION_CONFIG.STAGGER_DELAY);
                
                timeoutRef.current.push(timeout);
            });
        });
    };

    /**
     * ANIMATION ORCHESTRATION CONTROLLER
     * ==================================
     * Primary controller that orchestrates the entire sun ray animation lifecycle.
     * 
     * ORCHESTRATION RESPONSIBILITIES:
     * - Detects time period boundary crossings (MORNING → AFTERNOON → EVENING)
     * - Coordinates animation state transitions and cleanup
     * - Initializes new animation patterns for each time period
     * - Manages complete animation lifecycle and memory cleanup
     * 
     * TRIGGER CONDITIONS:
     * - Only executes when currentTimePeriod actually changes
     * - Prevents unnecessary re-renders and animation conflicts
     */
    useEffect(() => {
        /* BOUNDARY DETECTION */
        const timePeriodChanged = prevTimePeriodRef.current !== null && 
                                 prevTimePeriodRef.current !== currentTimePeriod;
        
        prevTimePeriodRef.current = currentTimePeriod;
        
        /* Handle time period transitions */
        if (timePeriodChanged) {
            resetAnimations();
        }
        
        /* Setup animations for current time period */
        setupAnimations(currentTimePeriod);
        
        /* CLEANUP FUNCTION */
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);   // Stop animation loop
            }
            isAnimatingRef.current = false;
            animationStateRef.current.clear();
            timeoutRef.current.forEach(timeout => clearTimeout(timeout));
        };
        
    }, [currentTimePeriod]); /* Only re-run when time period actually changes */
}

export default useSunRaysAnimation;