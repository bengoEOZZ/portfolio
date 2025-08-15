/**
 * USECELESTIALTIME HOOK
 * =====================
 * 
 * Custom React hook that manages interactive clock hand rotation mechanics for the celestial
 * clock time interface. Provides system time synchronization at component initialization,
 * and then tracks continuous rotation during user interaction.
 *
 * ROTATION PHASES:
 * 1. Time Initialization: Calculate initial rotation based on current system time
 * 2. Mouse Event Handling: Capture and process mouse hold-down/release interactions
 * 3. Continuous Rotation: Smooth interval-based rotation during mouse hold
 * 
 * PERFORMANCE FEATURES:
 * - Smooth 33fps rotation updates (30ms intervals) for fluid motion
 * - Proper timer cleanup to avoid multiple timers running at once
 */

import { useState, useRef, useEffect } from 'react';

/**
 * CENTRALIZED CONFIGURATIONS
 * =========================
 */
const ROTATION_CONFIG = {
    ROTATION_STEP: 2,                  /* 2° increment per rotation step */
    ROTATION_INTERVAL: 30,             /* 30ms intervals (1000ms ÷ 30ms = ~33fps) */
    HOURS_PER_DAY: 24,                 /* 24-hour cycle per full day rotation */
    DEGREES_PER_HOUR: 15               /* 15° per hour (360° ÷ 24h = 15°) */
};

/**
 * useClockHandRotation Hook Implementation
 * ========================================
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
     * - Add 12 to visually align with celestial time display (0:00 at bottom, 12:00 at top)
     * - Multiply by 15° per hour to convert to rotation angle
     * - Use modulo (%) to ensure angle is within 0-23 (0-360°)
     * 
     * EXAMPLE CALCULATIONS:
     * - 00:00: ((0 + 12) % 24) * 15 = 12 * 15 = 180°
     * - 06:00: ((6 + 12) % 24) * 15 = 18 * 15 = 270°
     * - 12:00: ((12 + 12) % 24) * 15 = 0 * 15 = 0°
     * - 18:00: ((18 + 12) % 24) * 15 = 6 * 15 = 90°
     * 
     * FORMULA: Initial rotation = ((hours + 12) % 24) * 15
     */
    const getInitialRotation = () => {
        const now = new Date();
        const hours = now.getHours();

        /* Apply Initial Rotation */
        return ((hours + 12) % ROTATION_CONFIG.HOURS_PER_DAY) * ROTATION_CONFIG.DEGREES_PER_HOUR;
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
                setRotation(prev => prev + ROTATION_CONFIG.ROTATION_STEP);  // Add 2° to current rotation
            }, ROTATION_CONFIG.ROTATION_INTERVAL);                          // Every 30ms
        }
        else if (rotationIntervalRef.current) {   // If not holding and interval exists
            /* STOP CONTINUOUS ROTATION */
            clearInterval(rotationIntervalRef.current);                     // Stop the timer
            rotationIntervalRef.current = null;                             // Clear the reference
        }

        /* 
         * CLEANUP FUNCTION
         * ================
         */
        return () => {
            if (rotationIntervalRef.current) {
                clearInterval(rotationIntervalRef.current);     // Stop any running timer
                rotationIntervalRef.current = null;             // Clear the reference
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