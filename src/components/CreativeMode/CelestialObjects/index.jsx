import React, { useState, useRef, useEffect } from 'react';
import SunRays from './SunRays';
import classes from './CelestialObjects.module.css';
import useClockHandRotation from './useClockHandRotation';

import MercuryImage from '../../../assets/mercury.svg';
import VenusImage from '../../../assets/venus.svg';
import BenImage from '../../../assets/Ben.svg';
import BenMoonImage from '../../../assets/BenMoon.svg';
import EarthImage from '../../../assets/earth2.svg';
import EarthFallImage from '../../../assets/earthFall.svg';
import EarthWinterImage from '../../../assets/earthWinter.svg';
import SunImage from '../../../assets/sun.svg';
import ClockImage from '../../../assets/clockSusan.png';
import ClockHand from '../../../assets/clockhand.png';

function CelestialObjects() {
    
    const snowflakes = Array.from({ length: 25 });
    const mapleleaves = Array.from({ length: 25 });
    const raindrops = Array.from({ length: 20 });
    const fireflies = Array.from({ length: 15 });
    const windLines = Array.from({ length: 10 });
    const clouds = Array.from({ length: 10 });

    const { rotation, handleMouseDown, handleMouseUp } = useClockHandRotation();

    // Calculate initial season based on current date
    const getCurrentSeason = () => {
        const now = new Date();
        const month = now.getMonth(); // 0-11 (January = 0, December = 11)
        
        if (month >= 2 && month <= 4) return 0; // Spring: March (2), April (3), May (4)
        if (month >= 5 && month <= 7) return 1; // Summer: June (5), July (6), August (7)
        if (month >= 8 && month <= 10) return 2; // Fall: September (8), October (9), November (10)
        return 3; // Winter: December (11), January (0), February (1)
    };

    const [season, setSeason] = useState(getCurrentSeason());
    const handleSeasonChange = (e) => {
        setSeason(parseInt(e.target.value));
        setActiveControl('season'); // Season slider is now active
    };

    // Initialize weather to "Season" (0) to match current season
    const [weather, setWeather] = useState(0);
    const handleWeatherChange = (e) => {
        setWeather(parseInt(e.target.value));
        setActiveControl('weather'); // Weather slider is now active
    };

    const [activeControl, setActiveControl] = useState('season');

    const currentHour = ((12 + Math.floor((rotation % 360) / 15)) % 24);
    const isNightTime = (currentHour >= 21 || currentHour < 3);
    
    const nightFireflies = Array.from({ length: 25 });

    return (
        <div>
            
            {activeControl === 'season' && (
                <div className={classes.seasonalChanges}>
                    {/* Show seasonal Earth images regardless of time (always visible) */}
                    {season === 2 && (
                        <img 
                            src={EarthFallImage} 
                            alt="Earth" 
                            className={classes.earthSeason}
                            style={{
                                filter: `brightness(${
                                    (() => {
                                        if (currentHour >= 7 && currentHour <= 17) {
                                            return 1;
                                        } else if (currentHour >= 18 && currentHour <= 23) {
                                            return 1 - ((currentHour - 18) * 0.8 / 6);
                                        } else {
                                            return 0.2 + ((currentHour + (currentHour < 7 ? 0 : -24)) * 0.8 / 7);
                                        }
                                    })()
                                })`,
                                transition: 'filter 1.5s ease-in-out'
                            }}
                        />
                    )}

                    {season === 3 && (
                        <img 
                            src={EarthWinterImage} 
                            alt="Earth" 
                            className={classes.earthSeason}
                            style={{
                                filter: `brightness(${
                                    (() => {
                                        if (currentHour >= 7 && currentHour <= 17) {
                                            return 1;
                                        } else if (currentHour >= 18 && currentHour <= 23) {
                                            return 1 - ((currentHour - 18) * 0.8 / 6);
                                        } else {
                                            return 0.2 + ((currentHour + (currentHour < 7 ? 0 : -24)) * 0.8 / 7);
                                        }
                                    })()
                                })`,
                                transition: 'filter 1.5s ease-in-out'
                            }}
                        />
                    )}

                    {/* Show seasonal effects only during day */}
                    {!isNightTime && (
                        <>
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
                            
                            {season === 2 && (
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
                            )}
                            
                            {season === 3 && (
                                <>
                                    <div className={classes.snowflakes}>
                                    {snowflakes.map((_, index) => (
                                        <i key={index} className={classes.snowflake}></i>
                                    ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    
                    {/* Always show night fireflies during night */}
                    {isNightTime && (
                        <div className={classes.nightFireflies}>
                            {nightFireflies.map((_, index) => (
                                <i key={index}></i>
                            ))}
                        </div>
                    )}
                </div>
            )}

    
            {/* Add new weather effects container */}
            {activeControl === 'weather' && (
                <div className={classes.seasonalChanges}>
                    {!isNightTime && (
                        <>
                            {/* Show season-appropriate weather when weather=0 (Season) */}
                            {weather === 0 && (
                                <>
                                    {/* Spring weather */}
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
                                    
                                    {/* Summer weather */}
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
                                    
                                    {/* Fall weather */}
                                    {season === 2 && (
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
                                    )}
                                    
                                    {/* Winter weather */}
                                    {season === 3 && (
                                        <div className={classes.snowflakes}>
                                            {snowflakes.map((_, index) => (
                                                <i key={index} className={classes.snowflake}></i>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                            
                            {/* Regular weather options */}
                            {weather === 2 && (
                                <div className={classes.raindrops}>
                                    {raindrops.map((_, index) => (
                                        <i key={index}></i>
                                    ))}
                                </div>
                            )}
                            
                            {weather === 3 && (
                                <div className={classes.windLines}>
                                    {windLines.map((_, index) => (
                                        <div key={index} className={classes.windLine}></div>
                                    ))}
                                </div>
                            )}
                            
                            {weather === 4 && (
                                <div className={classes.clouds}>
                                    {clouds.map((_, index) => (
                                        <i key={index}></i>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                    
                    {/* Always show night fireflies during night */}
                    {isNightTime && (
                        <div className={classes.nightFireflies}>
                            {nightFireflies.map((_, index) => (
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
                    max="4"
                    value={weather}
                    onChange={handleWeatherChange}
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

            {/* Placeholder Earth Image */}
            <img 
                src={EarthImage} 
                alt="Earth" 
                className={classes.earth} 
                style={{
                    filter: `brightness(${
                        // Calculate brightness based on time of day
                        (() => {
                            if (currentHour >= 7 && currentHour <= 17) {
                                // Daytime: full brightness
                                return 1;
                            } else if (currentHour >= 18 && currentHour <= 23) {
                                // Evening: gradual darkening
                                // 1.0 at 18:00 to 0.2 at 00:00
                                return 1 - ((currentHour - 18) * 0.8 / 6);
                            } else {
                                // Early morning: gradual brightening
                                // 0.2 at 00:00 to 1.0 at 07:00
                                return 0.2 + ((currentHour + (currentHour < 7 ? 0 : -24)) * 0.8 / 7);
                            }
                        })()
                    }) drop-shadow(0 0 30px rgba(${
                        // Dynamic glow color based on time of day
                        currentHour >= 7 && currentHour <= 17
                            ? "135, 206, 250, 0.8"  // Day: bright blue glow
                            : currentHour >= 21 || currentHour <= 3
                                ? "60, 60, 150, 0.4"  // Night: lighter blue glow (50% lighter)
                                : currentHour >= 18 && currentHour <= 20
                                    ? `${135 - ((currentHour - 18) * 75 / 3)}, ${206 - ((currentHour - 18) * 146 / 3)}, ${250 - ((currentHour - 18) * 100 / 3)}, ${0.8 - ((currentHour - 18) * 0.4 / 3)}`  // Dusk: transition color & opacity
                                    : `${60 + ((currentHour - 4) * 75 / 3)}, ${60 + ((currentHour - 4) * 146 / 3)}, ${150 + ((currentHour - 4) * 100 / 3)}, ${0.4 + ((currentHour - 4) * 0.4 / 3)}`  // Dawn: transition color & opacity
                    })) drop-shadow(0 0 70px rgba(${
                        // Secondary outer glow that changes color with time
                        currentHour >= 7 && currentHour <= 17
                            ? "70, 130, 180, 0.6"  // Day: steel blue
                            : currentHour >= 21 || currentHour <= 3
                                ? "30, 30, 120, 0.25"  // Night: lighter deeper blue (50% lighter)
                                : currentHour >= 18 && currentHour <= 20
                                    ? `${70 - ((currentHour - 18) * 40 / 3)}, ${130 - ((currentHour - 18) * 100 / 3)}, ${180 - ((currentHour - 18) * 60 / 3)}, ${0.6 - ((currentHour - 18) * 0.35 / 3)}`  // Dusk transition
                                    : `${30 + ((currentHour - 4) * 40 / 3)}, ${30 + ((currentHour - 4) * 100 / 3)}, ${120 + ((currentHour - 4) * 60 / 3)}, ${0.25 + ((currentHour - 4) * 0.35 / 3)}`  // Dawn transition
                    }))`,
                    transition: 'filter 1.5s ease-in-out'
                }}
            />
            <img 
                src={BenImage} 
                alt="Benjamin Tiong SVG" 
                className={classes.planet} 
                style={{ 
                    opacity: isNightTime ? 0 : 1,
                    transition: 'opacity 1s ease-in-out',
                    position: 'relative'  // Both elements in same position
                }} 
            />
            <img 
                src={BenMoonImage} 
                alt="Benjamin Tiong Moon" 
                className={classes.moon} 
                style={{ 
                    opacity: isNightTime ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                    position: 'absolute'  // Both elements in same position
                }} 
            />

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

            <img src={MercuryImage} alt="Mercury" className={classes.mercury} />
            <img src={VenusImage} alt="Venus" className={classes.venus} />
        </div>
    );
}

export default CelestialObjects;