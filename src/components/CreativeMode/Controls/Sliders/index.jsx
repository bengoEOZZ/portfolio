/**
 * SLIDERS COMPONENT
 * =================
 * Interactive range sliders for controlling season and weather states.
 *
 * INTERACTIVE FEATURES:
 * ---------------------
 * Season Control: 4-position slider (Spring/Summer/Fall/Winter)
 * Weather Control: 5-position slider (Season/Clear/Rainy/Windy/Cloudy)
 * 
 * INTERACTION BEHAVIOR:
 * ---------------------
 * WHILE DRAGGING:
 * - Thumb follows mouse/touch position continuously with fluid motion
 * - Values update in real-time using small step increments (0.01)
 * ON RELEASE:
 * - Automatically snaps to nearest discrete position (0, 1, 2, 3 or 4)
 */

// DEPENDENCIES
import { useState } from 'react';
import classes from './Sliders.module.css';

/**
 * Sliders Component
 * =================
 */
function Sliders({ 
    season,             // Current season value (0-3) from parent
    weather,            // Current weather value (0-4) from parent
    onSeasonChange,     // Callback to update season in parent
    onWeatherChange     // Callback to update weather in parent
}) {
    /**
     * LOCAL STATE MANAGEMENT
     * ======================
     * These values can be fractional (e.g., 1.47) while dragging, then snap to integers (0, 1, 2, 3) when the user releases.
     */
    const [tempSeason, setTempSeason] = useState(season);
    const [tempWeather, setTempWeather] = useState(weather);
    
    /**
     * DRAG STATE TRACKING
     * ===================
     * Tracks whether each slider is currently being dragged.
     * Used to apply CSS transitions only when NOT dragging (for smooth snap-back).
     */
    const [isDragging, setIsDragging] = useState({ season: false, weather: false });

    /**
     * SEASON SLIDER - RELEASE HANDLER
     * ================================
     * Triggered when user releases the season slider (mouse up or touch end).
     * 
     * FLOW:
     * 1. Round the continuous temp value to nearest integer (0, 1, 2, or 3)
     * 2. Notify parent component with the snapped value
     * 3. Update local temp state to match the snapped value
     * 4. Clear dragging flag to re-enable CSS transitions
     * 
     * EXAMPLE: If tempSeason = 1.73, it snaps to 2 (Summer)
     */
    const handleSeasonEnd = () => {
        const snapped = Math.round(tempSeason);
        onSeasonChange({ target: { value: snapped } });
        setTempSeason(snapped);
        setIsDragging(prev => ({ ...prev, season: false }));
    };

    /**
     * WEATHER SLIDER - RELEASE HANDLER
     * =================================
     * Triggered when user releases the weather slider (mouse up or touch end).
     * 
     * FLOW:
     * 1. Round the continuous temp value to nearest integer (0, 1, 2, 3, or 4)
     * 2. Notify parent component with the snapped value
     * 3. Update local temp state to match the snapped value
     * 4. Clear dragging flag to re-enable CSS transitions
     * 
     * EXAMPLE: If tempWeather = 3.21, it snaps to 3 (Windy)
     */
    const handleWeatherEnd = () => {
        const snapped = Math.round(tempWeather);
        onWeatherChange({ target: { value: snapped } });
        setTempWeather(snapped);
        setIsDragging(prev => ({ ...prev, weather: false }));
    };

    return (
        <>
            {/* SEASON CONTROL SECTION */}
            <div className={`${classes.sliderContainer} ${classes.seasonSlider}`}>
                <label htmlFor="seasonSlider">Season:</label>
                <input
                    id="seasonSlider"
                    type="range"
                    min="0"                    /* Minimum value (Spring) */
                    max="3"                    /* Maximum value (Winter) */
                    step="0.01"                /* Tiny steps for fluid motion while dragging */
                    value={tempSeason}         /* Controlled by local state for smooth dragging */
                    
                    /* UPDATE HANDLER: Applies continuously while dragging */
                    onChange={(e) => setTempSeason(parseFloat(e.target.value))}
                    
                    /* DRAG START: Mark as dragging to disable CSS transitions */
                    onMouseDown={() => setIsDragging(prev => ({ ...prev, season: true }))}
                    
                    /* DRAG END: Snap to nearest position and notify parent */
                    onMouseUp={handleSeasonEnd}
                    onTouchEnd={handleSeasonEnd}
                    
                    /* STYLING: Apply dragging class to track css */
                    className={`${classes.slider} ${isDragging.season ? classes.dragging : ''}`}
                    
                    /* DATA ATTRIBUTE: Used by CSS to position thumb on correct label */
                    data-value={Math.round(tempSeason)}
                />
                
                {/* POSITION LABELS: Visual markers for each position */}
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
                    min="0"                    /* Minimum value (Season default) */
                    max="4"                    /* Maximum value (Cloudy) */
                    step="0.01"                /* Tiny steps for fluid motion while dragging */
                    value={tempWeather}        /* Controlled by local state for smooth dragging */
                    
                    /* UPDATE HANDLER: Applies continuously while dragging */
                    onChange={(e) => setTempWeather(parseFloat(e.target.value))}
                    
                    /* DRAG START: Mark as dragging to disable CSS transitions */
                    onMouseDown={() => setIsDragging(prev => ({ ...prev, weather: true }))}
                    
                    /* DRAG END: Snap to nearest position and notify parent */
                    onMouseUp={handleWeatherEnd}
                    onTouchEnd={handleWeatherEnd}
                    
                    /* STYLING: Apply dragging class to track css */
                    className={`${classes.slider} ${isDragging.weather ? classes.dragging : ''}`}
                    
                    /* DATA ATTRIBUTE: Used by CSS to position thumb on correct label */
                    data-value={Math.round(tempWeather)}
                />
                
                {/* POSITION LABELS: Visual markers for each position */}
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

export default Sliders;
