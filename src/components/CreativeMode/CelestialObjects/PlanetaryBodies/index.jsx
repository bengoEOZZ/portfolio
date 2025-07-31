import SunRays from './SunRays'; // Now importing from same folder
import classes from './PlanetaryBodies.module.css';

import MercuryImage from '../../../../assets/mercury.svg';
import VenusImage from '../../../../assets/venus.svg';
import BenImage from '../../../../assets/Ben.svg';
import BenMoonImage from '../../../../assets/BenMoon.svg';
import EarthImage from '../../../../assets/earth2.svg';
import EarthFallImage from '../../../../assets/earthFall.svg';
import EarthWinterImage from '../../../../assets/earthWinter.svg';
import SunImage from '../../../../assets/sun.svg';
import ClockImage from '../../../../assets/clockSusan.png';
import ClockHand from '../../../../assets/clockhand.png';

function PlanetaryBodies({ 
    currentHour, 
    isNightTime, 
    rotation, 
    handleMouseDown, 
    handleMouseUp,
    season,
    activeControl
}) {
    // Calculate brightness based on time of day
    const calculateBrightness = () => {
        if (currentHour >= 7 && currentHour <= 17) {
            return 1;
        } else if (currentHour >= 18 && currentHour <= 23) {
            return 1 - ((currentHour - 18) * 0.8 / 6);
        } else {
            return 0.2 + ((currentHour + (currentHour < 7 ? 0 : -24)) * 0.8 / 7);
        }
    };

    // Calculate dynamic glow colors
    const getGlowColors = () => {
        if (currentHour >= 7 && currentHour <= 17) {
            return {
                primary: "135, 206, 250, 0.8",
                secondary: "70, 130, 180, 0.6"
            };
        } else if (currentHour >= 21 || currentHour <= 3) {
            return {
                primary: "60, 60, 150, 0.4",
                secondary: "30, 30, 120, 0.25"
            };
        } else if (currentHour >= 18 && currentHour <= 20) {
            return {
                primary: `${135 - ((currentHour - 18) * 75 / 3)}, ${206 - ((currentHour - 18) * 146 / 3)}, ${250 - ((currentHour - 18) * 100 / 3)}, ${0.8 - ((currentHour - 18) * 0.4 / 3)}`,
                secondary: `${70 - ((currentHour - 18) * 40 / 3)}, ${130 - ((currentHour - 18) * 100 / 3)}, ${180 - ((currentHour - 18) * 60 / 3)}, ${0.6 - ((currentHour - 18) * 0.35 / 3)}`
            };
        } else {
            return {
                primary: `${60 + ((currentHour - 4) * 75 / 3)}, ${60 + ((currentHour - 4) * 146 / 3)}, ${150 + ((currentHour - 4) * 100 / 3)}, ${0.4 + ((currentHour - 4) * 0.4 / 3)}`,
                secondary: `${30 + ((currentHour - 4) * 40 / 3)}, ${30 + ((currentHour - 4) * 100 / 3)}, ${120 + ((currentHour - 4) * 60 / 3)}, ${0.25 + ((currentHour - 4) * 0.35 / 3)}`
            };
        }
    };

    const brightness = calculateBrightness();
    const glowColors = getGlowColors();

    return (
        <>
            {/* Main Earth Image */}
            <img 
                src={EarthImage} 
                alt="Earth" 
                className={classes.earth} 
                style={{
                    filter: `brightness(${brightness}) drop-shadow(0 0 30px rgba(${glowColors.primary})) drop-shadow(0 0 70px rgba(${glowColors.secondary}))`,
                    transition: 'filter 1.5s ease-in-out'
                }}
            />

            {/* Seasonal Earth Images */}
            {activeControl === 'season' && (
                <>
                    {season === 2 && (
                        <img 
                            src={EarthFallImage} 
                            alt="Earth Fall" 
                            className={classes.earthSeason}
                            style={{
                                filter: `brightness(${brightness})`,
                                transition: 'filter 1.5s ease-in-out'
                            }}
                        />
                    )}

                    {season === 3 && (
                        <img 
                            src={EarthWinterImage} 
                            alt="Earth Winter" 
                            className={classes.earthSeason}
                            style={{
                                filter: `brightness(${brightness})`,
                                transition: 'filter 1.5s ease-in-out'
                            }}
                        />
                    )}
                </>
            )}

            {/* Ben Day/Night Images */}
            <img 
                src={BenImage} 
                alt="Benjamin Tiong SVG" 
                className={classes.planet} 
                style={{ 
                    opacity: isNightTime ? 0 : 1,
                    transition: 'opacity 1s ease-in-out',
                    position: 'relative'
                }} 
            />
            <img 
                src={BenMoonImage} 
                alt="Benjamin Tiong Moon" 
                className={classes.moon} 
                style={{ 
                    opacity: isNightTime ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                    position: 'absolute'
                }} 
            />

            {/* Sun */}
            <img src={SunImage} alt="Sun" className={classes.sun} />

            {/* Clock */}
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

            {/* Sun Rays */}
            <div className={classes.sunrays}>
                <SunRays rotation={rotation} />
            </div>

            {/* Other Planets */}
            <img src={MercuryImage} alt="Mercury" className={classes.mercury} />
            <img src={VenusImage} alt="Venus" className={classes.venus} />
        </>
    );
}

export default PlanetaryBodies;
