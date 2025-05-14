import React, { useState, useRef, useEffect } from 'react';
import SunRays from './SunRays';
import classes from './CelestialObjects.module.css';
import useClockHandRotation from './useClockHandRotation';

import BenImage from '../../assets/Ben.svg';
import EarthImage from '../../assets/earth2.svg';
import EarthFallImage from '../../assets/earthFall.svg';
import EarthWinterImage from '../../assets/earthWinter.svg';
import SunImage from '../../assets/sun.svg';
import ClockImage from '../../assets/clockSusan.png';
import ClockHand from '../../assets/clockhand.png';

function CelestialObjects() {
    
    const snowflakes = Array.from({ length: 25 });
    const mapleleaves = Array.from({ length: 25 });
    const raindrops = Array.from({ length: 20 });
    const fireflies = Array.from({ length: 15 });
    const windLines = Array.from({ length: 10 });
    const clouds = Array.from({ length: 10 });

    const { rotation, handleMouseDown, handleMouseUp } = useClockHandRotation();

    const [season, setSeason] = useState(0);
    const handleSeasonChange = (e) => {
        setSeason(parseInt(e.target.value));
        setActiveControl('season'); // Season slider is now active
    };

    const [weather, setWeather] = useState(1);
    const handleWeatherChange = (e) => {
        setWeather(parseInt(e.target.value));
        setActiveControl('weather'); // Weather slider is now active
    };

    const [activeControl, setActiveControl] = useState('season');

    return (
        <div>
            
            {activeControl === 'season' && (
                <div className={classes.seasonalChanges}>
                    {/* Keep your existing seasonal rendering logic */}
                    {season === 0 && (
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
                    )}
                    
                    {/* Keep your existing seasonal conditionals */}
                    {season === 1 && (
                        <>
                            <div className={classes.heatDistortion}></div>
                            <div className={classes.fireflies}>
                                {fireflies.map((_, index) => (
                                    <i key={index}></i>
                                ))}
                            </div>
                        </>
                    )}
                    
                    {/* Keep other season conditions */}
                    {season === 2 && (
                        <>
                            {season === 2 && <img src={EarthFallImage} alt="Earth" className={classes.earthSeason}/>}
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
                    )}
                    {season === 3 && (
                        <>
                            {season === 3 && <img src={EarthWinterImage} alt="Earth" className={classes.earthSeason}/>}
                            <img src={EarthWinterImage} alt="Earth" className={classes.earthSeason}/>
                            <div className={classes.snowflakes}>
                            {snowflakes.map((_, index) => (
                                <i key={index} className={classes.snowflake}></i>
                            ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Add new weather effects container */}
            {activeControl === 'weather' && (
                <div className={classes.seasonalChanges}>
                    {weather === 0}
                    
                    {weather === 1 && (
                        <div className={classes.raindrops}>
                            {raindrops.map((_, index) => (
                                <i key={index}></i>
                            ))}
                        </div>
                    )}
                    
                    {weather === 2 && (
                        <div className={classes.windLines}>
                            {windLines.map((_, index) => (
                                <div key={index} className={classes.windLine}></div>
                            ))}
                        </div>
                    )}
                    
                    {weather === 3 && (
                        <div className={classes.clouds}>
                            {clouds.map((_, index) => (
                                <i key={index}></i>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Slider for Seasons */}
            
            <div className={classes.timeDisplay}>
                {String(((12+Math.floor((rotation % 360) / 15)) % 24)).padStart(2, '0')}:00
            </div>
            
            <div className={classes.sliderContainer}>
                <label htmlFor="seasonSlider">Season:</label>
                <input
                    id="seasonSlider"
                    type="range"
                    min="0"
                    max="3"
                    value={season}
                    onChange={handleSeasonChange}
                    className={classes.slider}
                />
                <div className={classes.sliderLabels}>
                    <span>Spring</span>
                    <span>Summer</span>
                    <span>Fall </span>
                    <span>Winter</span>
                </div>
            </div>

            {/* Slider for Weather */}
            <div className={classes.sliderContainer}>
                <label htmlFor="weatherSlider">Weather:</label>
                <input
                    id="weatherSlider"
                    type="range"
                    min="0"
                    max="3"
                    value={weather}
                    onChange={handleWeatherChange}
                    className={classes.slider}
                />
                <div className={classes.sliderLabels}>
                    <span>Clear</span>
                    <span>Rainy</span>
                    <span>Windy</span>
                    <span>Cloudy</span>
                </div>
            </div>

            {/* Placeholder Earth Image */}
            <img src={EarthImage} alt="Earth" className={classes.earth} />
            <img src={BenImage} alt="Benjamin Tiong SVG" className={classes.planet} />
            <img src={SunImage} alt="Sun" className={classes.sun} />
            <div className={classes.clockContainer}>
                <img src={ClockImage} alt="Clock" className={classes.clock} />
                <img 
                    src={ClockHand} 
                    alt="Clock Hand" 
                    className={classes.clockHand}
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp} // Also stop if mouse leaves the element
                />
            </div>

            <div className={classes.sunrays}>
                <SunRays rotation={rotation} />
            </div>
            
            {/*
            <div className={classes.sunrays}>
                <SunRays />
            </div>
            <img src={BenImage} alt="Benjamin Tiong SVG" className={classes.planet} />
                        <div className={classes.seasonalChanges}>
                <div className={classes.fireflies}>
                    {fireflies.map((_, index) => (
                        <i key={index}></i>
                    ))}
                </div>
            div className={classes.heatDistortion}></div>     
            </div>*/}

            
            
            

            {/*
            <div className={classes.rainbowArc}></div>
            <div className={classes.seasonalChanges}>
                <div className={classes.snowflakes}>
                    {snowflakes.map((_, index) => (
                        <i key={index} className={classes.snowflake}></i>
                    ))}
                </div>
            </div>

            <div className={classes.mapleLeaves}>
                {mapleleaves.map((_, index) => (
                    <i key={index} className={classes.mapleLeaves}></i>
                ))}
            </div>
            
            <img src={EarthFallImage} alt="Earth" className={classes.earthSeason}/>
            <img src={SunImage} alt="Sun" className={classes.sun} />
            <div className={classes.sunrays}>
                <SunRays />
            </div>*/}
        </div>
    );
}

export default CelestialObjects;