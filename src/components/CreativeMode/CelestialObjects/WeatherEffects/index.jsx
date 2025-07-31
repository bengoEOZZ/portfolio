import classes from './WeatherEffects.module.css';

function WeatherEffects({ season, weather, activeControl, isNightTime }) {
    const snowflakes = Array.from({ length: 25 });
    const mapleleaves = Array.from({ length: 25 });
    const raindrops = Array.from({ length: 20 });
    const fireflies = Array.from({ length: 15 });
    const windLines = Array.from({ length: 10 });
    const clouds = Array.from({ length: 10 });
    const nightFireflies = Array.from({ length: 25 });

    const renderSeasonalEffects = () => {
        if (isNightTime) return null;

        switch (season) {
            case 0: // Spring
                return (
                    <>
                        <div className={classes.rainbowArc}></div>
                        <div className={classes.raindrops}>
                            {raindrops.map((_, index) => (
                                <i key={index}></i>
                            ))}
                        </div>
                        <div className={classes.clouds}>
                            {clouds.map((_, index) => (
                                <i key={index}></i>
                            ))}
                        </div>
                    </>
                );
            case 1: // Summer
                return (
                    <>
                        <div className={classes.heatDistortion}></div>
                        <div className={classes.fireflies}>
                            {fireflies.map((_, index) => (
                                <i key={index}></i>
                            ))}
                        </div>
                    </>
                );
            case 2: // Fall
                return (
                    <>
                        <div className={classes.mapleLeaves}>
                            {mapleleaves.map((_, index) => (
                                <i key={index}></i>
                            ))}
                        </div>
                        <div className={classes.windLines}>
                            {windLines.map((_, index) => (
                                <div key={index} className={classes.windLine}></div>
                            ))}
                        </div>
                    </>
                );
            case 3: // Winter
                return (
                    <div className={classes.snowflakes}>
                        {snowflakes.map((_, index) => (
                            <i key={index} className={classes.snowflake}></i>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    const renderWeatherEffects = () => {
        if (isNightTime) return null;

        if (weather === 0) {
            // Show season-appropriate weather
            return renderSeasonalEffects();
        }

        switch (weather) {
            case 2: // Rainy
                return (
                    <div className={classes.raindrops}>
                        {raindrops.map((_, index) => (
                            <i key={index}></i>
                        ))}
                    </div>
                );
            case 3: // Windy
                return (
                    <div className={classes.windLines}>
                        {windLines.map((_, index) => (
                            <div key={index} className={classes.windLine}></div>
                        ))}
                    </div>
                );
            case 4: // Cloudy
                return (
                    <div className={classes.clouds}>
                        {clouds.map((_, index) => (
                            <i key={index}></i>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={classes.seasonalChanges}>
            {activeControl === 'season' && renderSeasonalEffects()}
            {activeControl === 'weather' && renderWeatherEffects()}
            
            {/* Always show night fireflies during night */}
            {isNightTime && (
                <div className={classes.nightFireflies}>
                    {nightFireflies.map((_, index) => (
                        <i key={index}></i>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WeatherEffects;
