import SunRays from './SunRays';
import classes from './CelestialObjects.module.css';

import BenImage from '../../assets/Ben.svg';
import EarthImage from '../../assets/earth2.svg';
import SunImage from '../../assets/sun.svg';

function CelestialObjects() {
    return (
        <>
            <img src={BenImage} alt="Benjamin Tiong SVG" className={classes.planet} />
            <img src={EarthImage} alt="Earth" className={classes.earth} />
            <img src={SunImage} alt="Sun" className={classes.sun} />
            <div className={classes.sunrays}>
                <SunRays />
            </div>
        </>
    );
}

export default CelestialObjects;