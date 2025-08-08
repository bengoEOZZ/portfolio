/**
 * CELESTIALOBJECTS COMPONENT
 * ==========================
 * 
 * Main orchestrator component for the celestial objects interface featuring interactive
 * planetary bodies, dynamic weather effects, and user controls. Manages the complete
 * celestial system with time-based animations and seasonal transitions.
 * 
 * COMPONENT ARCHITECTURE:
 * - Modular sub-components for maintainability
 *   1. WeatherEffects: Handles all seasonal/weather visual animations (snow, rain, clouds)
 *   2. Controls: Manages unified control panel (clock, time display, sliders)
 *   3. PlanetaryBodies: Renders celestial objects with time-based styling (Earth, sun, moon, planets)
 * - Uses custom hook (useClockHandRotation) for interactive time manipulation
 * - Uses custom hook (useSunRaysAnimation) for sun ray animations based upon time period
 */

// DEPENDENCIES
import {useState} from 'react';
import WeatherEffects from './WeatherEffects'; // This will import from ./WeatherEffects/index.jsx
import Controls from './Controls'; // This will import from ./Controls/index.jsx
import PlanetaryBodies from './PlanetaryBodies'; // This will import from ./PlanetaryBodies/index.jsx
import useClockHandRotation from './useClockHandRotation';

/**
 * CelestialObjects Component
 * =========================
 */
function CelestialObjects() {
    /* CLOCK ROTATION MANAGEMENT */
    const { rotation, handleMouseDown, handleMouseUp } = useClockHandRotation();

    /* Calculate initial season based on current date */
    const getCurrentSeason = () => {
        const now = new Date();
        const month = now.getMonth();            // 0-11 (January = 0, December = 11)
        
        if (month >= 2 && month <= 4) return 0;  // Spring: March (2), April (3), May (4)
        if (month >= 5 && month <= 7) return 1;  // Summer: June (5), July (6), August (7)
        if (month >= 8 && month <= 10) return 2; // Fall: September (8), October (9), November (10)
        return 3;                                // Winter: December (11), January (0), February (1)
    };

    /* STATE MANAGEMENT */
    const [season, setSeason] = useState(getCurrentSeason());     // Current seasonal setting
    const [weather, setWeather] = useState(0);            // Use seasonal as default weather
    const [activeControl, setActiveControl] = useState('season'); // Season control active as default

    /* When user interacts with season slider, weather system switches to 'season' mode */
    const handleSeasonChange = (e) => {
        setSeason(parseInt(e.target.value));
        setActiveControl('season');
    };

    /* When user interacts with weather slider, weather system switches to 'weather' mode */
    const handleWeatherChange = (e) => {
        setWeather(parseInt(e.target.value));
        setActiveControl('weather');
    };

    /**
     * TIME CALCULATION CONSTANTS
     * ==========================
     * Convert rotation angle to time display to determine day/night periods
     * 
     * CURRENT TIME CALCULATION:
     * - rotation from (0-∞°), representing continuous clock hand position  
     * - Each 15° = 1 hour (360° ÷ 24h = 15°/h)
     * - Add 12 offset to center noon at 0° rotation
     * - Modulo 24 to wrap total rotation hours into 0-23 range
     * 
     * NIGHT DETECTION:
     * - Night period: 21:00-02:59 (9 PM to 3 AM)
     */
    const currentHour = ((12 + Math.floor((rotation % 360) / 15)) % 24);
    const isNightTime = (currentHour >= 21 || currentHour < 3);
    
    /**
     * COMPONENT OUTPUT
     * ================
     */
    return (
        <div>
            <WeatherEffects 
                season={season}
                weather={weather}
                activeControl={activeControl}
                isNightTime={isNightTime}
            />

            <Controls 
                rotation={rotation}
                season={season}
                weather={weather}
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                onSeasonChange={handleSeasonChange}
                onWeatherChange={handleWeatherChange}
            />

            <PlanetaryBodies 
                currentHour={currentHour}
                isNightTime={isNightTime}
                rotation={rotation}
                season={season}
                activeControl={activeControl}
            />
        </div>
    );
}

export default CelestialObjects;