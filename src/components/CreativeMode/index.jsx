/**
 * CREATIVEMODE COMPONENT - INTERACTIVE CELESTIAL PORTFOLIO EXPERIENCE
 * ====================================================================
 * 
 * This component renders the main Creative mode interface of the portfolio application.
 * Features an immersive celestial-themed experience with interactive elements, animations,
 * and creative visual effects to showcase the artistic and innovative side of the portfolio.
 * 
 * Key Features:
 * - Celestial objects with interactive animation
 *      - Dynamic planetary system (Mercury, Venus, Earth with seasonal variants)
 *      - Interactive sun with animated rays based upon Sun/Moon position
 *      - Interactive clock with clickable hand for time control
 *           - 24-hour time display with visual time representation
 *      - Season slider (Spring, Summer, Fall, Winter)
 *      - Weather control slider (Season-based, Clear, Rainy, Windy, Cloudy)
 * - Hello greeting text with personalized messaging
 * - Orbital navigation buttons for portfolio sections
 * - Code-style star remarks
 * 
 * Design Philosophy:
 * - Represents creativity, innovation, and artistic expression
 * - Celestial theme suggests limitless possibilities and exploration
 * - Interactive elements encourage user engagement and discovery
 */

// DEPENDENCIES
import classes from './CreativeMode.module.css'
import HelloText from './HelloText'
import NavigationButtons from './NavigationButtons'
import CodeRemarks from './CodeRemarks'
import CelestialObjects from './CelestialObjects'

/**
 * CreativeMode Component
 * ======================
 */
function CreativeMode() {
    return (
        <div className={classes.body}>
            <div className={classes.container}>
                <CelestialObjects />
                <HelloText />
                <NavigationButtons />
                <CodeRemarks />
            </div>
        </div>
    );
}

export default CreativeMode