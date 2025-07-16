/**
 * CREATIVEMODE COMPONENT - INTERACTIVE CELESTIAL PORTFOLIO EXPERIENCE
 * ====================================================================
 * 
 * This component renders the main Creative mode interface of the portfolio application.
 * Features an immersive celestial-themed experience with interactive elements, animations,
 * and creative visual effects to showcase the artistic and innovative side of the portfolio.
 * 
 * Key Features:
 * - Celestial objects with interactive animations
 * - Hello greeting text with personalized messaging
 * - Orbital navigation system for portfolio sections
 * - Code-style remarks and commentary overlay
 * - Responsive design with space-themed aesthetics
 * 
 * Design Philosophy:
 * - Represents creativity, innovation, and artistic expression
 * - Celestial theme suggests limitless possibilities and exploration
 * - Interactive elements encourage user engagement and discovery
 */

import classes from './CreativeMode.module.css'
import HelloText from './HelloText'
import NavigationButtons from './NavigationButtons'
import CodeRemarks from './CodeRemarks'
import CelestialObjects from './CelestialObjects'

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