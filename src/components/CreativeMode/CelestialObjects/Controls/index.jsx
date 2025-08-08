/**
 * CONTROLS COMPONENT
 * ==================
 *
 * Unified control panel managing time display, interactive clock, and slider weather effects.
 *
 * COMPONENT ARCHITECTURE:
 * - Time Display: Real-time 24 hour digital visualization based on sun/moon rotation
 * - Interactive Clock: Analog clock with clickable hand for time manipulation
 * - Season Control: 4-position slider for seasonal transitions (Spring/Summer/Fall/Winter)
 * - Weather Control: 5-position slider for weather overrides (Season/Clear/Rainy/Windy/Cloudy)
 */

// DEPENDENCIES
import classes from './Controls.module.css';

// CLOCK ASSETS
import ClockImage from '../../../../assets/clockSusan.png';
import ClockHand from '../../../../assets/clockhand.png';

/**
 * Controls Component
 * =================
 */
function Controls({ 
    rotation, 
    season, 
    weather, 
    handleMouseDown, 
    handleMouseUp,
    onSeasonChange, 
    onWeatherChange 
}) {
    /* Calculate current hour based on rotation angle (See useClockHandRotation.jsx) */
    const currentHour = ((12 + Math.floor((rotation % 360) / 15)) % 24);

    /**
     * COMPONENT OUTPUT
     * ================
     */
    return (
        <>
            {/* INTERACTIVE CLOCK SECTION */}
            <div className={classes.clockContainer}>
                <img src={ClockImage} alt="Clock" className={classes.clock} />
                <img 
                    src={ClockHand} 
                    alt="Clock Hand" 
                    className={classes.clockHand}
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                />
            </div>

            {/* TIME DISPLAY SECTION */}
            <div className={classes.timeDisplay}>
                {String(currentHour).padStart(2, '0')}:00
            </div>
            
            {/* SEASON CONTROL SECTION */}
            <div className={`${classes.sliderContainer} ${classes.seasonSlider}`}>
                <label htmlFor="seasonSlider">Season:</label>
                <input
                    id="seasonSlider"
                    type="range"
                    min="0"
                    max="3"
                    value={season}
                    onChange={onSeasonChange}
                    className={classes.slider}
                    data-value={season}
                />
                <div className={classes.sliderLabels}>
                    <span>Spring</span>
                    <span>Summer</span>
                    <span>Fall </span>
                    <span>Winter</span>
                </div>
            </div>

            {/* WEATHER CONTROL SECTION */}
            <div className={`${classes.sliderContainer} ${classes.weatherSlider}`}>
                <label htmlFor="weatherSlider">Weather:</label>
                <input
                    id="weatherSlider"
                    type="range"
                    min="0"
                    max="4"
                    value={weather}
                    onChange={onWeatherChange}
                    className={classes.slider}
                    data-value={weather}
                />
                <div className={classes.sliderLabels}>
                    <span>Season</span>
                    <span>Clear</span>
                    <span>Rainy</span>
                    <span>Windy</span>
                    <span>Cloudy</span>
                </div>
            </div>
        </>
    );
}

export default Controls;
