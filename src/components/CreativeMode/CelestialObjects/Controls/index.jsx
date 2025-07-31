import classes from './Controls.module.css';

function Controls({ 
    rotation, 
    season, 
    weather, 
    onSeasonChange, 
    onWeatherChange 
}) {
    const currentHour = ((12 + Math.floor((rotation % 360) / 15)) % 24);

    return (
        <>
            <div className={classes.timeDisplay}>
                {String(currentHour).padStart(2, '0')}:00
            </div>
            
            <div className={classes.sliderContainer}>
                <label htmlFor="seasonSlider">Season:</label>
                <input
                    id="seasonSlider"
                    type="range"
                    min="0"
                    max="3"
                    value={season}
                    onChange={onSeasonChange}
                    className={classes.slider}
                />
                <div className={classes.sliderLabels}>
                    <span>Spring</span>
                    <span>Summer</span>
                    <span>Fall </span>
                    <span>Winter</span>
                </div>
            </div>

            <div className={classes.sliderContainer}>
                <label htmlFor="weatherSlider">Weather:</label>
                <input
                    id="weatherSlider"
                    type="range"
                    min="0"
                    max="4"
                    value={weather}
                    onChange={onWeatherChange}
                    className={classes.slider}
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
