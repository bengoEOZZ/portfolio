/**
 * EARTH COMPONENT
 * ===============
 * Dedicated component for rendering Earth with seasonal overlays and dynamic atmospheric effects.
 * Handles all Earth-specific logic including brightness transitions, glow effects, and seasonal variations.
 * 
 * VISUAL STRUCTURE:
 * -----------------
 * • Base Earth: Static SVG image of Earth showing continents and oceans
 * • Seasonal Overlays: Additional images that layer on top to show seasonal changes
 *   - Spring (Index 0): Base Earth only, no overlay
 *   - Summer (Index 1): Base Earth only, no overlay
 *   - Fall (Index 2): Fall overlay with autumn colors and leaf patterns
 *   - Winter (Index 3): Winter overlay with snow coverage on continents
 * • Atmospheric Glow: Dynamic drop-shadow effects simulating Earth's atmosphere
 * 
 * INTERACTIVE FEATURES:
 * ---------------------
 * • Time-Based Brightness: Earth dims and brightens based on current hour (24-hour cycle)
 *   - Day (07:00-17:00): Full brightness (100%)
 *   - Evening (18:00-23:00): Gradual dimming from 100% to 20%
 *   - Night (00:00-06:00): Gradual brightening from 20% to 100%
 * • Dynamic Atmospheric Glow: Color and intensity of glow changes with time
 *   - Daytime (06:00-17:59): Bright blue atmospheric glow (light sky blue)
 *   - Nighttime (18:00-05:59): Deep blue atmospheric glow (dark blue)
 */

import { useMemo, memo } from 'react';
import classes from './Earth.module.css';

// EARTH ASSETS
import EarthImage from '../../../../assets/CreativeMode/earth.svg';
import EarthFallImage from '../../../../assets/CreativeMode/earthFall.svg';
import EarthWinterImage from '../../../../assets/CreativeMode/earthWinter.svg';

/**
 * Calculate brightness based on time of day
 * =========================================
 * Determines the brightness level for Earth based on a 24-hour time cycle.
 * Uses different calculations for day, evening, and night periods to create smooth transitions.
 * 
 * TIME PERIODS:
 * - Day (7 AM - 5 PM): Full brightness (1.0)
 * - Evening (6 PM - 11 PM): Gradual dimming toward midnight
 * - Night (12 AM - 6 AM): Gradual brightening toward dawn
 */
const calculateBrightness = (currentHour) => {
    if (currentHour >= 7 && currentHour <= 17) {
        return 1.0;                                       // Full brightness during day (7 AM - 5 PM)
    } else if (currentHour >= 18 && currentHour <= 23) {
        return 1.0 - ((currentHour - 18) / 6) * 0.8;      // Gradual dimming (6 PM - 11 PM)
    } else {
        return 0.2 + (currentHour / 7) * 0.8;              // Gradual brightening (12 AM - 6 AM)
    }
};

/**
 * Calculate dynamic glow colors based on time period
 * =================================================
 * Generates atmospheric glow colors that change throughout the day.
 * 
 * COLOR PERIODS:
 * - Daytime (06:00 - 18:00): Bright blue atmospheric glow
 * - Night (18:00 - 06:00): Dark blue atmospheric glow
 */
const getGlowColors = (currentHour) => {
    if (currentHour >= 6 && currentHour < 18) {
        // Day: Bright blue atmospheric glow
        return {
            primary: "135, 206, 250, 0.8",     // Light sky blue
            secondary: "70, 130, 180, 0.6"     // Steel blue
        };
    } else {
        // Night: Intense deep blue atmospheric glow
        return {
            primary: "60, 60, 150, 0.9",       // Dark blue
            secondary: "30, 30, 120, 0.7"      // Darker blue
        };
    }
};

/**
 * Earth Component
 * ===============
 */
const Earth = memo(({ currentHour, season, activeControl }) => {
    /* MEMOIZED CALCULATIONS FOR PERFORMANCE */
    const brightness = useMemo(() => calculateBrightness(currentHour), [currentHour]);
    const glowColors = useMemo(() => getGlowColors(currentHour), [currentHour]); // Recalc when hour changes
    
    /* MEMOIZED STYLE OBJECTS */
    const earthStyle = useMemo(() => ({
        filter: `brightness(${brightness}) drop-shadow(0 0 80px rgba(${glowColors.primary}))
            drop-shadow(0 0 120px rgba(${glowColors.secondary}))`,   // Apply brightness + glow effects
        transition: 'filter 1.5s ease-in-out'
    }), [brightness, glowColors]);  // Only rebuild when brightness or colors change
    
    const seasonalEarthStyle = useMemo(() => ({
        filter: `brightness(${brightness})`,    // Maintain brightness for seasonal overlays
        transition: 'filter 1.5s ease-in-out'
    }), [brightness]);                          // Only rebuild when brightness changes
    
    /* SEASONAL RENDERING */
    const seasonalContent = useMemo(() => {
        // Early exit if season control is not active
        if (activeControl !== 'season') return null;
        
        // FALL SEASON OVERLAY (Season Index 2)
        if (season === 2) {
            return (
                <img 
                    key={`fall-${season}`}  // Unique key forces re-render on season change
                    src={EarthFallImage} 
                    className={classes.earthSeason}
                    style={seasonalEarthStyle}
                />
            );
        }
        
        // WINTER SEASON OVERLAY (Season Index 3) 
        if (season === 3) {
            return (
                <img 
                    key={`winter-${season}`}    // Unique key forces re-render on season change
                    src={EarthWinterImage} 
                    className={classes.earthSeason}
                    style={seasonalEarthStyle}
                />
            );
        }
        
        // No seasonal overlay for spring (0) or summer (1)
        return null;
    }, [activeControl, season, seasonalEarthStyle]); // Recalc when control, season, or style changes
    
    /**
     * COMPONENT OUTPUT
     * ================
     */
    return (
        <div className={classes.earthFloatContainer}>
            {/* MAIN EARTH IMAGE */}
            <img 
                src={EarthImage} 
                className={classes.earth} 
                style={earthStyle}
            />

            {/* SEASONAL EARTH OVERLAYS */}
            {seasonalContent}
        </div>
    );
});

export default Earth;