import SunRays from './SunRays';
import classes from './CelestialObjects.module.css';

import BenImage from '../../assets/Ben.svg';
import EarthImage from '../../assets/earth2.svg';
import EarthFallImage from '../../assets/earthFall.svg';
import EarthWinterImage from '../../assets/earthWinter.svg';
import SunImage from '../../assets/sun.svg';

function CelestialObjects() {
    const snowflakes = Array.from({ length: 25 })
    const mapleleaves = Array.from({ length: 25 })
    const raindrops = Array.from({ length: 20 })
    const fireflies = Array.from({ length: 10 });

    return (
        <>
            {/*<img src={BenImage} alt="Benjamin Tiong SVG" className={classes.planet} />*/}
            <div className={classes.seasonalChanges}>
                <div className={classes.fireflies}>
                    {fireflies.map((_, index) => (
                        <i key={index}></i>
                    ))}
                </div>
                
            </div>
            <div className={classes.heatDistortion}></div>

            <img src={EarthImage} alt="Earth" className={classes.earth} />

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
        </>
    );
}

export default CelestialObjects;