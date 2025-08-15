/**
 * CELESTIALOBJECTS COMPONENT
 * ==========================
 * 
 * Direct orchestrator for all celestial visual elements.
 * Contains Earth, Moon, Sun, and other planets.
 * 
 * COMPONENT ARCHITECTURE:
 * - Earth: Main Earth with seasonal overlays and atmospheric effects
 * - Moon: Day/night versions of personal moon representation
 * - Sun: Sun rendering with potential for future enhancements
 * - OtherPlanets: Mercury and Venus positioning
 */

// DEPENDENCIES
import { memo } from 'react';
import Earth from './Earth';
import Moon from './Moon';
import Sun from './Sun';
import OtherPlanets from './OtherPlanets';

/**
 * CelestialObjects Component
 * =========================
 */
const CelestialObjects = memo(({ 
    currentHour, 
    isNightTime, 
    rotation,
    season,
    activeControl
}) => {
    return (
        <>
            {/* EARTH WITH SEASONAL OVERLAYS */}
            <Earth 
                currentHour={currentHour}
                season={season}
                activeControl={activeControl}
            />
            
            {/* PERSONAL MOON REPRESENTATION */}
            <Moon isNightTime={isNightTime} />
            
            {/* SUN WITH INTEGRATED RAYS */}
            <Sun currentHour={currentHour} />
            
            {/* OTHER PLANETS */}
            <OtherPlanets />
        </>
    );
});

export default CelestialObjects;