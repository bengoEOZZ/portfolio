/**
 * USECLOCKHANDROTATION HOOK
 * =========================
 * 
 * Custom React hook that manages interactive clock hand rotation mechanics for the celestial
 * time interface. Provides system time synchronization at component initialization,
 * and then continuous rotation during user interaction.
 *
 * ROTATION PHASES:
 * 1. Time Initialization: Calculate initial rotation based on current system time
 * 2. Mouse Event Handling: Capture and process mouse hold-down/release interactions
 * 3. Continuous Rotation: Smooth interval-based rotation during mouse hold
 * 
 * PERFORMANCE FEATURES:
 * - Smooth 33fps rotation updates (30ms intervals) for fluid motion
 * - Efficient single interval management (for rotation mechanics) to prevent memory leaks
 */

import { useState, useRef, useEffect } from 'react';

/**
 * CENTRALIZED CONFIGURATIONS
 * =========================
 */

/* Rotation timing constants */
const ROTATION_CONFIG = {
    ROTATION_STEP: 2,                  /* 2° increment per rotation step */
    ROTATION_INTERVAL: 30,             /* 30ms between rotation updates (33fps) */
    HOURS_PER_ROTATION: 24,            /* 24-hour cycle per full rotation */
    DEGREES_PER_HOUR: 15               /* 15° per hour (360° ÷ 24h = 15°) */
};

/**
 * useClockHandRotation Hook Implementation
 * =======================================
 */
const useClockHandRotation = () => {
    /* REFERENCES */
    const rotationIntervalRef = useRef(null);       // Rotation interval ID for cleanup

    /**
     * PHASE 1: TIME INITIALIZATION
     * ============================
     * Calculate initial rotation angle based on current system time
     * 
     * MATHEMATICAL BREAKDOWN:
     * - Current hour from system time (0-23)
     * - Subtract 12 to center rotation around celestial clock (0:00 at bottom, 12:00 at top)
     * - Multiply by 15° per hour to convert to rotation angle
     * - Use modulo (%) to ensure angle is within 0-23 (0-360°)
     *   - Add 24 to allow modulo to handle negative numbers correctly
     * 
     * EXAMPLE CALCULATIONS:
     * - 6 AM: ((6 - 12 + 24) % 24) * 15 = (18 % 24) * 15 = 18 * 15 = 270°
     * - 12 PM: ((12 - 12 + 24) % 24) * 15 = (24 % 24) * 15 = 0 * 15 = 0°
     * - 6 PM: ((18 - 12 + 24) % 24) * 15 = (30 % 24) * 15 = 6 * 15 = 90°
     * 
     * Initial Rotation: rotation = ((hours - 12 + 24) % 24) * 15
     */
    const getInitialRotation = () => {
        const now = new Date();
        const hours = now.getHours();
        
        /* Apply mathematical transformation to convert system time to rotation angle */
        return ((hours - 12 + ROTATION_CONFIG.HOURS_PER_ROTATION) % ROTATION_CONFIG.HOURS_PER_ROTATION) * ROTATION_CONFIG.DEGREES_PER_HOUR;
    };

    /* STATE MANAGEMENT */
    const [rotation, setRotation] = useState(getInitialRotation());    // Current rotation angle (0-∞)
    const [isHolding, setIsHolding] = useState(false);                 // Mouse interaction state

    /**
     * PHASE 2: MOUSE EVENT HANDLING
     * =============================
     * Capture and process mouse interactions for rotation control
     * 
     * EVENT FLOW:
     * 1. Mouse Down → Set isHolding = true → Triggers continuous rotation
     * 2. Mouse Up → Set isHolding = false → Stops continuous rotation
     */
    const handleMouseDown = () => {
        setIsHolding(true);
    };
    
    const handleMouseUp = () => {
        setIsHolding(false);
    };

    /**
     * PHASE 3: CONTINUOUS ROTATION MANAGEMENT
     * ======================================
     * Smooth interval-based rotation during user interaction
     * 
     * ROTATION MATHEMATICS:
     * - Each interval: rotation += ROTATION_STEP (2°)
     * - Update frequency: Every 30ms (approximately 33fps)
     *
     * PERFORMANCE OPTIMIZATION:
     * - Single setInterval per interaction (not multiple timers)
     *
     * INTERVAL LIFECYCLE:
     * 1. isHolding = true → Create new interval → Start rotation
     * 2. isHolding = false → Clear existing interval → Stop rotation
     */
    useEffect(() => {
        if (isHolding) {
            /* START CONTINUOUS ROTATION */
            rotationIntervalRef.current = setInterval(() => {
                setRotation(prev => prev + ROTATION_CONFIG.ROTATION_STEP);
            }, ROTATION_CONFIG.ROTATION_INTERVAL);
        } else if (rotationIntervalRef.current) {
            /* STOP CONTINUOUS ROTATION */
            clearInterval(rotationIntervalRef.current);
            rotationIntervalRef.current = null;
        }

        /* Prevents memory leaks by clearing active intervals */
        return () => {
            if (rotationIntervalRef.current) {
                clearInterval(rotationIntervalRef.current);
                rotationIntervalRef.current = null;
            }
        };
    }, [isHolding]); /* Only re-run when interaction state actually changes */

    /* PUBLIC INTERFACE */
    return {
        rotation,           // Current rotation angle for visual positioning
        handleMouseDown,    // Mouse press handler to start rotation
        handleMouseUp       // Mouse release handler to stop rotation
    };
};

export default useClockHandRotation;