/**
 * PLANETARYBODIES COMPONENT
 * =========================
 * 
 * Renders all celestial visual elements including Earth, sun, planets, and character avatars.
 * Focuses purely on visual rendering without user interaction controls.
 * 
 * COMPONENT ARCHITECTURE:
 * - Earth Rendering: Main Earth with seasonal overlays and dynamic day/night lighting
 * - Personal Moon Representation: Day/night versions of myself as the moon
 * - Celestial Objects: Sun, planets (Mercury, Venus) with positioning
 * - Sun Rays: Dynamic sun ray animations via SunRays component
 */

// DEPENDENCIES
import { useMemo, memo } from 'react';
import SunRays from './SunRays';
import classes from './PlanetaryBodies.module.css';

// CELESTIAL OBJECT ASSETS
import MercuryImage from '../../../../assets/mercury.svg';
import VenusImage from '../../../../assets/venus.svg';
import BenImage from '../../../../assets/Ben.svg';
import BenMoonImage from '../../../../assets/BenMoon.svg';
import EarthImage from '../../../../assets/earth2.svg';
import EarthFallImage from '../../../../assets/earthFall.svg';
import EarthWinterImage from '../../../../assets/earthWinter.svg';
import SunImage from '../../../../assets/sun.svg';

/**
 * Calculate brightness based on time of day
 * =========================================
 * 
 * Determines the brightness level for celestial objects based on a 24-hour time cycle.
 * Uses different calculations for day, evening, and night periods to create smooth transitions.
 * 
 * TIME PERIODS:
 * - Day (7 AM - 5 PM): Full brightness (1.0)
 * - Evening (6 PM - 11 PM): Gradual dimming toward midnight
 * - Night (12 AM - 6 AM): Gradual brightening toward dawn
 */
const calculateBrightness = (currentHour) => {
    if (currentHour >= 7 && currentHour <= 17) {
        return 1; // Full brightness during day (7 AM - 5 PM)
    } else if (currentHour >= 18 && currentHour <= 23) {
        return 1 - ((currentHour - 18) * 0.8 / 6); // Gradual dimming (6 PM - 11 PM)
    } else {
        return 0.2 + ((currentHour + (currentHour < 7 ? 0 : -24)) * 0.8 / 7); // Night to dawn (12 AM - 6 AM)
    }
};

/**
 * Calculate dynamic glow colors based on time period
 * =================================================
 * 
 * Generates atmospheric glow colors that change throughout the day to simulate
 * realistic lighting conditions. Returns primary and secondary color values for layered effects.
 * 
 * COLOR PERIODS:
 * - Daytime: Bright blue atmospheric glow
 * - Evening: Gradual transition from blue to darker tones
 * - Deep Night: Dark blue atmospheric glow
 * - Dawn: Gradual transition from darker tones back to bright blue
 */
const getGlowColors = (currentHour) => {
    if (currentHour >= 7 && currentHour <= 17) {
        // Daytime: Bright blue atmospheric glow
        return {
            primary: "135, 206, 250, 0.8",
            secondary: "70, 130, 180, 0.6"
        };
    } else if (currentHour >= 21 || currentHour <= 3) {
        // Deep night: Dark blue atmospheric glow
        return {
            primary: "60, 60, 150, 0.4",
            secondary: "30, 30, 120, 0.25"
        };
    } else if (currentHour >= 18 && currentHour <= 20) {
        // Evening: Gradual transition from day to night
        return {
            primary: `${135 - ((currentHour - 18) * 75 / 3)}, ${206 - ((currentHour - 18) * 146 / 3)}, ${250 - ((currentHour - 18) * 100 / 3)}, ${0.8 - ((currentHour - 18) * 0.4 / 3)}`,
            secondary: `${70 - ((currentHour - 18) * 40 / 3)}, ${130 - ((currentHour - 18) * 100 / 3)}, ${180 - ((currentHour - 18) * 60 / 3)}, ${0.6 - ((currentHour - 18) * 0.35 / 3)}`
        };
    } else {
        // Dawn: Gradual transition from night to day
        return {
            primary: `${60 + ((currentHour - 4) * 75 / 3)}, ${60 + ((currentHour - 4) * 146 / 3)}, ${150 + ((currentHour - 4) * 100 / 3)}, ${0.4 + ((currentHour - 4) * 0.4 / 3)}`,
            secondary: `${30 + ((currentHour - 4) * 40 / 3)}, ${30 + ((currentHour - 4) * 100 / 3)}, ${120 + ((currentHour - 4) * 60 / 3)}, ${0.25 + ((currentHour - 4) * 0.35 / 3)}`
        };
    }
};

/**
 * PlanetaryBodies Component
 * ========================
 */
const PlanetaryBodies = memo(({ 
    currentHour, 
    isNightTime, 
    rotation,
    season,
    activeControl
}) => {
    /* MEMOIZED CALCULATIONS FOR PERFORMANCE */
    const brightness = useMemo(() => calculateBrightness(currentHour), [currentHour]); // Calculate dynamic brightness based on time
    const glowColors = useMemo(() => getGlowColors(currentHour), [currentHour]); // Calculate atmospheric glow colors
    
    /* MEMOIZED STYLE OBJECTS  */
    const earthStyle = useMemo(() => ({
        filter: `brightness(${brightness}) drop-shadow(0 0 30px rgba(${glowColors.primary})) drop-shadow(0 0 70px rgba(${glowColors.secondary}))`,
        transition: 'filter 1.5s ease-in-out'
    }), [brightness, glowColors]); // Earth filter effects with dynamic brightness and glow
    
    const seasonalEarthStyle = useMemo(() => ({
        filter: `brightness(${brightness})`,
        transition: 'filter 1.5s ease-in-out'
    }), [brightness]); // Seasonal overlay brightness matching main Earth
    
    const dayMoonStyle = useMemo(() => ({
        opacity: isNightTime ? 0 : 1,
        transition: 'opacity 1s ease-in-out',
        position: 'relative'
    }), [isNightTime]); // Day version of me as the moon visibility control
    
    const nightMoonStyle = useMemo(() => ({
        opacity: isNightTime ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        position: 'absolute'
    }), [isNightTime]); // Night version of you as the moon visibility control
    
    /* SEASONAL RENDERING */
    const seasonalContent = useMemo(() => {
        // Early exit if season control is not active - prevents unnecessary rendering
        if (activeControl !== 'season') return null;
        
        // FALL SEASON OVERLAY (Season Index 2)
        if (season === 2) {
            return (
                <img 
                    key={`fall-${season}`} // Forces remount and animation restart
                    src={EarthFallImage} 
                    className={classes.earthSeason}
                    style={seasonalEarthStyle} // Apply same brightness as main Earth for consistency
                />
            );
        }
        
        // WINTER SEASON OVERLAY (Season Index 3) 
        if (season === 3) {
            return (
                <img 
                    key={`winter-${season}`} // Forces remount and animation restart
                    src={EarthWinterImage} 
                    className={classes.earthSeason}
                    style={seasonalEarthStyle} // Apply same brightness as main Earth for consistency
                />
            );
        }
        
        // No seasonal overlay for spring (0) or summer (1) - return null to render base Earth only
        return null;
    }, [activeControl, season, seasonalEarthStyle]); // Re-calculate when season control state, season index, or earth styling changes
    
    /**
     * COMPONENT OUTPUT
     * ================
     */
    return (
        <>
            {/* MAIN EARTH IMAGE */}
            <img 
                src={EarthImage} 
                alt="Earth" 
                className={classes.earth} 
                style={earthStyle}
            />

            {/* SEASONAL EARTH OVERLAYS */}
            {seasonalContent}

            {/* PERSONAL MOON REPRESENTATIONS - DAY/NIGHT SWITCHING */}
            <img 
                src={BenImage} 
                className={classes.dayMoon} 
                style={dayMoonStyle}
            />
            <img 
                src={BenMoonImage}  
                className={classes.nightMoon} 
                style={nightMoonStyle}
            />

            {/* SUN */}
            <img src={SunImage} alt="Sun" className={classes.sun} />

            {/* SUN RAYS ANIMATION */}
            <div className={classes.sunrays}>
                <SunRays rotation={rotation} />
            </div>

            {/* OTHER PLANETS */}
            <img src={MercuryImage} alt="Mercury" className={classes.mercury} />
            <img src={VenusImage} alt="Venus" className={classes.venus} />
        </>
    );
});

export default PlanetaryBodies;
