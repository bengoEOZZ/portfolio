/**
 * HOME CREATIVE BACKGROUND COMPONENT
 * ===================================
 * Renders all celestial-themed decorative elements for the right half of the home page.
 * 
 * Includes:
 * - Northern Lights: Aurora borealis effectw
 * - Starfield: Multi-layered twinkling stars (large, medium, small)
 * - Floating Planet: 3D-rendered planet with glow effects
 * - Giant Star: Cross-shaped star with extending light beams
 * - Asteroid Belt: Space rocks with irregular shapes
 * 
 * All elements are positioned absolutely and use the right 50% of the viewport.
 */


// DEPENDENCIES
import classes from './HomeCreativeBackground.module.css';

function HomeCreativeBackground() {
    return (
        <>
            {/* NORTHERN LIGHTS - Aurora effect */}
            <div className={classes.northernLights}>
                <div className={classes.auroraStreak}></div>
                <div className={classes.auroraStreak}></div>
                <div className={classes.auroraStreak}></div>
            </div>
            
            {/* STARFIELD DEPTH LAYERS - Multi-layered stars */}
            <div className={classes.starfieldLayer}>
                {/* Large bright stars */}
                <div className={`${classes.deepStar} ${classes.large}`}></div>
                <div className={`${classes.deepStar} ${classes.large}`}></div>
                <div className={`${classes.deepStar} ${classes.large}`}></div>
                <div className={`${classes.deepStar} ${classes.large}`}></div>
                <div className={`${classes.deepStar} ${classes.large}`}></div>
                {/* Medium stars */}
                <div className={`${classes.deepStar} ${classes.medium}`}></div>
                <div className={`${classes.deepStar} ${classes.medium}`}></div>
                <div className={`${classes.deepStar} ${classes.medium}`}></div>
                <div className={`${classes.deepStar} ${classes.medium}`}></div>
                <div className={`${classes.deepStar} ${classes.medium}`}></div>
                {/* Small distant stars */}
                <div className={`${classes.deepStar} ${classes.small}`}></div>
                <div className={`${classes.deepStar} ${classes.small}`}></div>
                <div className={`${classes.deepStar} ${classes.small}`}></div>
                <div className={`${classes.deepStar} ${classes.small}`}></div>
                <div className={`${classes.deepStar} ${classes.small}`}></div>
            </div>
            
            {/* FLOATING PLANET */}
            <div className={classes.floatingPlanet}></div>
            
            {/* GIANT STAR */}
            <div className={classes.giantStar}></div>
            
            {/* ASTEROID BELT - Floating space rocks */}
            <div className={classes.asteroidBelt}>
                <div className={classes.asteroid}></div>
                <div className={classes.asteroid}></div>
                <div className={classes.asteroid}></div>
                <div className={classes.asteroid}></div>
                <div className={classes.asteroid}></div>
            </div>
        </>
    );
}

export default HomeCreativeBackground;
