/**
 * OTHERPLANETS COMPONENT
 * ======================
 * 
 * Renders Mercury and Venus.
 */

import { memo } from 'react';
import classes from './OtherPlanets.module.css';

// PLANET ASSETS
import MercuryImage from "../../../../assets/CreativeMode/mercury.svg";
import VenusImage from "../../../../assets/CreativeMode/venus.svg";

/**
 * OtherPlanets Component
 * ======================
 */
const OtherPlanets = memo(() => {
    return (
        <>
            {/* MERCURY */}
            <img 
                src={MercuryImage} 
                className={classes.mercury} 
            />
            
            {/* VENUS */}
            <img 
                src={VenusImage} 
                className={classes.venus} 
            />
        </>
    );
});

export default OtherPlanets;