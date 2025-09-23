/**
 * SLIDERS COMPONENT
 * =================
 * Control sliders for season and weather manipulation.
 *
 * FEATURES:
 * - Season Control: 4-position slider (Spring/Summer/Fall/Winter)
 * - Weather Control: 5-position slider (Season/Clear/Rainy/Windy/Cloudy)
 */

// DEPENDENCIES
import classes from './Sliders.module.css';

/**
 * Sliders Component
 * =================
 */
function Sliders({ 
    season, 
    weather, 
    onSeasonChange, 
    onWeatherChange 
}) {
    return (
        <>
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

export default Sliders;
