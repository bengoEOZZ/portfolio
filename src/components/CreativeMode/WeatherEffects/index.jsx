/**
 * WEATHEREFFECTS COMPONENT
 * ========================
 * 
 * Manages dynamic seasonal and weather-based visual effects for the celestial objects interface.
 * Renders animated particles including snow, rain, fireflies, clouds, and other atmospheric elements
 * based on current season, weather conditions, and time period.
 *
 * VISUAL EFFECTS SYSTEM:
 * - Seasonal Effects: Spring (rain/clouds), Summer (fireflies), Fall (leaves/wind), Winter (snow)
 * - Weather Override: Manual weather controls (rainy, windy, cloudy) 
 * - Night Effects: Always-active fireflies during night hours (21:00-02:59)
 */
import { useMemo } from 'react';
import classes from './WeatherEffects.module.css';

/**
 * WeatherEffects Component
 * =======================
 */
function WeatherEffects({ season, weather, activeControl, isNightTime }) {

    /* Pre-render all particle JSX elements to prevent recreation on every render. */
    const memoizedWeatherEffects = useMemo(() => ({
        snowflakes: Array.from({ length: 25 }, (_, index) => (
            <i key={index} className={classes.snowflake}></i>
        )),
        mapleleaves: Array.from({ length: 25 }, (_, index) => (
            <i key={index}></i>
        )),
        raindrops: Array.from({ length: 20 }, (_, index) => (
            <i key={index}></i>
        )),
        summerFireflies: Array.from({ length: 15 }, (_, index) => (
            <i key={index}></i>
        )),
        windLines: Array.from({ length: 10 }, (_, index) => (
            <div key={index} className={classes.windLine}></div>
        )),
        clouds: Array.from({ length: 10 }, (_, index) => (
            <i key={index}></i>
        )),
        nightFireflies: Array.from({ length: 25 }, (_, index) => (
            <i key={index}></i>
        ))
    }), []); // Empty dependency array since these never change

    /**
     * SEASONAL EFFECTS RENDERER
     * =========================
     * Renders weather effects based on current season setting.
     * Disabled during night time to allow night-specific effects.
     * 
     * SEASONAL MAPPING:
     * - Spring (0): Rainbow arc + rain + clouds
     * - Summer (1): Heat distortion + fireflies  
     * - Fall (2): Maple leaves + wind lines
     * - Winter (3): Snowflakes only
     * 
     * NIGHTTIME EFFECTS:
     * - Night (21:00-02:59): Night fireflies (always active, overrides seasonal effects)
     */
    const renderSeasonalEffects = () => {
        if (isNightTime) return null;

        switch (season) {
            case 0: // Spring
                return (
                    <>
                        <div className={classes.rainbowArc}></div>
                        <div className={classes.raindrops}>
                            {memoizedWeatherEffects.raindrops}
                        </div>
                        <div className={classes.clouds}>
                            {memoizedWeatherEffects.clouds}
                        </div>
                    </>
                );
            case 1: // Summer
                return (
                    <>
                        <div className={classes.heatDistortion}></div>
                        <div className={classes.summerFireflies}>
                            {memoizedWeatherEffects.summerFireflies}
                        </div>
                    </>
                );
            case 2: // Fall
                return (
                    <>
                        <div className={classes.mapleLeaves}>
                            {memoizedWeatherEffects.mapleleaves}
                        </div>
                        <div className={classes.windLines}>
                            {memoizedWeatherEffects.windLines}
                        </div>
                    </>
                );
            case 3: // Winter
                return (
                    <div className={classes.snowflakes}>
                        {memoizedWeatherEffects.snowflakes}
                    </div>
                );
            default:
                return null;
        }
    };

    /**
     * WEATHER OVERRIDE RENDERER
     * =========================
     * Renders specific weather conditions when user manually selects weather mode.
     * Overrides seasonal effects except during night time.
     * 
     * WEATHER MAPPING:
     * - 0: Use seasonal effects (default)
     * - 2: Rainy weather (raindrops only)
     * - 3: Windy weather (wind lines only)
     * - 4: Cloudy weather (clouds only)
     */
    const renderWeatherEffects = () => {
        if (isNightTime) return null;

        if (weather === 0) {
            return renderSeasonalEffects();
        }

        switch (weather) {
            case 2: // Rainy
                return (
                    <div className={classes.raindrops}>
                        {memoizedWeatherEffects.raindrops}
                    </div>
                );
            case 3: // Windy
                return (
                    <div className={classes.windLines}>
                        {memoizedWeatherEffects.windLines}
                    </div>
                );
            case 4: // Cloudy
                return (
                    <div className={classes.clouds}>
                        {memoizedWeatherEffects.clouds}
                    </div>
                );
            default:
                return null;
        }
    };

    /**
     * COMPONENT OUTPUT
     * ================
     */
    return (
        <div className={classes.seasonalChanges}>
            {/* Conditional weather/seasonal rendering based on activeControl state */}
            {activeControl === 'season' && renderSeasonalEffects()}
            {activeControl === 'weather' && renderWeatherEffects()}
            
            {/* Always show night fireflies during night */}
            {isNightTime && (
                <div className={classes.nightFireflies}>
                    {memoizedWeatherEffects.nightFireflies}
                </div>
            )}
        </div>
    );
}

export default WeatherEffects;
