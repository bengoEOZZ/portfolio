/**
 * HELLOTEXT COMPONENT - PORTFOLIO INTRODUCTION & INTERACTIVE GUIDANCE
 * ===================================================================
 * This component renders the main introductory text section for the Creative Mode interface.
 * 
 * Key Features:
 * -------------
 * - Visual personalized greeting with glowing "Hello World..." heading and descriptive paragraph
 * - Interactive guidance for celestial controls (clock hand, weather/seasonal sliders)
 */

// DEPENDENCIES
import classes from './HelloText.module.css';

/**
 * HelloText Component
 * ===================
 */
function HelloText() {
    return (
        <div className={classes.container}>
            <h1 className={classes.header}>Hello World...</h1>
            <p className={classes.text}>
                I'm <strong>Benjamin Tiong</strong>, 
                a software developer whose work orbits around the possibilities of code and innovation.
                Dive into my universe, and discover more about me.<br/>
                <strong> Click and Hold</strong> the clock hand or adjust the weather/seasonal controls 
                to witness how time transforms the celestial cycle of the Sun, Moon, and Earth.
            </p>
        </div>
    );
}

export default HelloText;