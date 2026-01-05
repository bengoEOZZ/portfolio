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
    const { rotation, handleMouseDown, handleMouseUp, handleTouchStart, handleTouchEnd } = useClockHandRotation();

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
            
            {/* STARFIELD BACKROUND - Animated twinkling stars */}
            <div className={classes.starfieldContainer}>
                <div className={classes.starfieldLayer}>
                    {/* Tiny micro stars */}
                    {[[4,18],[9,48],[14,82],[19,12],[24,38],[29,65],[34,92],[39,25],[44,55],[49,88],[54,15],[59,42],[64,75],[69,5],[74,32],[79,62],[84,95],[89,28],[94,58],[99,85],[1,35],[6,65],[11,95],[16,25],[21,55],[26,85],[31,15],[36,45],[41,75],[46,5],[51,35],[56,65],[61,95],[66,25],[71,55],[76,85],[81,15],[86,45],[91,75],[96,5],[2,42],[7,72],[12,2],[17,32],[22,62],[27,92],[32,22],[37,52],[42,82],[47,12],[52,42],[57,72],[62,2],[67,32],[72,62],[77,92],[82,22],[87,52],[92,82],[97,12]].map(([l,t],i)=>(
                        <div key={`ty${i}`} className={`${classes.deepStar} ${classes.tiny}`} style={{left:`${l}%`,top:`${t}%`,animationDelay:`${i*0.05}s`}}/>
                    ))}
                    {/* Small distant stars */}
                    {[[2,28],[7,40],[11,62],[16,75],[21,92],[26,18],[31,32],[36,58],[41,85],[46,42],[51,8],[56,25],[61,48],[66,72],[71,95],[76,12],[81,38],[86,55],[91,78],[96,22],[4,55],[9,82],[14,15],[19,48],[24,72],[29,5],[34,38],[39,68],[44,92],[49,25],[54,58],[59,85],[64,18],[69,45],[74,78],[79,10],[84,42],[89,65],[94,92],[99,28],[1,68],[6,95],[11,22],[16,52],[21,82],[26,12],[31,45],[36,75],[41,5],[46,35],[51,65],[56,95],[61,28],[66,58],[71,88],[76,18],[81,48],[86,78],[91,8],[96,38],[3,72],[8,5],[13,38],[18,68],[23,95],[28,28],[33,58],[38,88],[43,18],[48,48],[53,78],[58,8],[63,38],[68,68],[73,98],[78,28],[83,58],[88,88],[93,18],[98,48]].map(([l,t],i)=>(
                        <div key={`sm${i}`} className={`${classes.deepStar} ${classes.small}`} style={{left:`${l}%`,top:`${t}%`,animationDelay:`${i*0.04}s`}}/>
                    ))}
                    {/* Medium stars */}
                    {[[22,88],[28,5],[32,45],[38,62],[42,28],[48,72],[52,18],[58,52],[62,82],[68,25],[72,58],[78,92],[26,42],[36,85],[46,20],[56,95],[66,38],[76,55],[24,82],[34,15],[44,48],[54,78],[64,12],[74,42],[29,62],[39,5],[49,38],[59,85],[69,18],[79,52]].map(([l,t],i)=>(
                        <div key={`md${i}`} className={`${classes.deepStar} ${classes.medium}`} style={{left:`${l}%`,top:`${t}%`,animationDelay:`${i*0.06}s`}}/>
                    ))}
                    {/* Drifting stars - subtle movement */}
                    {[[10,30],[30,15],[50,60],[70,85],[90,40],[20,70],[80,20],[15,50],[35,80],[55,25]].map(([l,t],i)=>(
                        <div key={`dft${i}`} className={`${classes.deepStar} ${classes.medium} ${classes.drift}`} style={{left:`${l}%`,top:`${t}%`,animationDelay:`${i*0.4}s`}}/>
                    ))}
                </div>

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
                    handleTouchStart={handleTouchStart}
                    handleTouchEnd={handleTouchEnd}
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