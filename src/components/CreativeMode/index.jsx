/**
 * CREATIVEMODE COMPONENT - INTERACTIVE CELESTIAL PORTFOLIO EXPERIENCE
 * ====================================================================
 * This component renders the main Creative mode interface of the portfolio application.
 * Features an immersive celestial-themed experience with interactive elements, animations,
 * and creative visual effects to showcase the artistic and innovative side of the portfolio.
 * 
 * COMPONENT ARCHITECTURE:
 * -----------------------
 * - SpaceNavigationBar: Cosmic-themed header with constellation logo and orbital menu
 * - CelestialObjects: Interactive planetary system (Earth, Moon, Sun, planets)
 * - Controls: Interactive user interface panel (clock, season/weather sliders)
 * - WeatherEffects: Dynamic atmospheric particle system (rain, snow, wind, fireflies)
 * - HelloText: Personal introduction and user guidance
 * - NavigationButtons: Orbital navigation system for portfolio sections
 *
 * Design Philosophy:
 * ------------------
 * - Represents creativity, innovation, and artistic expression
 * - Celestial theme suggests limitless possibilities and exploration
 * - Interactive elements encourage user engagement and discovery
 */

// DEPENDENCIES
import { useState } from 'react';
import classes from './CreativeMode.module.css'
import NavigationBar from './NavigationBar'
import HelloText from './HelloText'
import NavigationButtons from './NavigationButtons'
import CelestialObjects from './CelestialObjects'
import WeatherEffects from './WeatherEffects';
import Controls from './Controls';
import useClockHandRotation from './Controls/Clock/useClockHandRotation';

/**
 * CreativeMode Component
 * ======================
 */
function CreativeMode() {
    /* CLOCK ROTATION MANAGEMENT (See ./Controls/Clock/useClockHandRotation.jsx) */
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

    /**
     * STATE MANAGEMENT - WEATHER & SEASONAL CONTROLS
     * ==============================================
     * DUAL CONTROL SYSTEM:
     * - Season Slider: Controls 4 seasonal states (Spring/Summer/Fall/Winter)
     * - Weather Slider: Overrides with 5 weather states (Season/Clear/Rainy/Windy/Cloudy)
     * - Active Control: Tracks which slider the user last interacted with
     * 
     * SMART SWITCHING BEHAVIOR:
     * - When user moves season slider → activeControl becomes 'season' → seasonal weather
     * - When user moves weather slider → activeControl becomes 'weather' → manual weather override
     * 
     * INITIALIZATION:
     * - Season starts based on current real-world date (auto-detected)
     * - Weather starts at 0 by default (seasonal weather pattern)
     * - Active control starts as 'season' (seasonal mode by default)
     */
    const [season, setSeason] = useState(getCurrentSeason());
    const [weather, setWeather] = useState(0);
    const [activeControl, setActiveControl] = useState('season');

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
        <div className={classes.body}>
            <NavigationBar />
            
            <div className={classes.container}>
                
                <CelestialObjects 
                    currentHour={currentHour}
                    isNightTime={isNightTime}
                    rotation={rotation}
                    season={season}
                    activeControl={activeControl}
                />

                <Controls 
                    rotation={rotation}
                    currentHour={currentHour}
                    season={season}
                    weather={weather}
                    handleMouseDown={handleMouseDown}
                    handleMouseUp={handleMouseUp}
                    onSeasonChange={handleSeasonChange}
                    onWeatherChange={handleWeatherChange}
                />

                <WeatherEffects 
                    season={season}
                    weather={weather}
                    activeControl={activeControl}
                    isNightTime={isNightTime}
                />

                <HelloText />

                <NavigationButtons />
            </div>
        </div>
    );
}

export default CreativeMode;