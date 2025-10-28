/**
 * CONTROLS COMPONENT
 * ==================
 * Unified control panel for the Clock and Sliders components.
 *
 * COMPONENT ARCHITECTURE:
 * - Clock: Interactive analog clock with digital time display
 * - Sliders: Season and weather control sliders
 */

// DEPENDENCIES
import Clock from './Clock';
import Sliders from './Sliders';

/**
 * Controls Component
 * =================
 */
function Controls({ 
    rotation, 
    currentHour,
    season, 
    weather, 
    handleMouseDown, 
    handleMouseUp,
    onSeasonChange, 
    onWeatherChange 
}) {
    return (
        <>
            <Clock 
                rotation={rotation}
                currentHour={currentHour}
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
            />
            
            <Sliders 
                season={season}
                weather={weather}
                onSeasonChange={onSeasonChange}
                onWeatherChange={onWeatherChange}
            />
        </>
    );
}

export default Controls;