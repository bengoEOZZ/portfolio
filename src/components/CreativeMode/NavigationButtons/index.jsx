/**
 * NAVIGATIONBUTTONS COMPONENT
 * ===========================
 * 
 * Main navigation component for the creative portfolio mode featuring orbital button animation,
 * renders interactive futiristic-based navigation buttons that orbit around a central point.
 * 
 * COMPONENT ARCHITECTURE:
 * - Uses custom hook (useOrbitAnimation) for elliptical orbital motion
 * - Custom SVG graphics for futuristic aesthetic
 * 
 * ANIMATION SYSTEM:
 * 1. Initial State: All buttons start centered in the container behind celestial objects
 * 2. Outward Transition: Smooth outward movement to orbital positions (1.5s duration)
 * 3. Orbital Motion: After outward transition, apply continuous elliptical rotation
 * 4. Wobble Effect: Apply subtle wobble animation for better orbital effect
 * 5. Hover Effects: Upon hover, apply scale transformations and glow interactions
 */

// DEPENDENCIES
import { useRef } from 'react';
import useOrbitAnimation from './useOrbitAnimation';
import classes from './NavigationButtons.module.css';
import NavButton from '../../../assets/NavButton.svg';

/**
 * NavigationButtons Component
 * ==========================
 */
function NavigationButtons() {
    /* DOM REFERENCE FOR ORBITAL ANIMATION */
    const buttonsWrapperRef = useRef(null); // Provides DOM access for orbital animation calculations

    /* ORBITAL ANIMATION INITIALIZATION */
    useOrbitAnimation(buttonsWrapperRef, classes.btn); // Use custom hook for orbital animation

    /**
     * NAVIGATION DATA CONFIGURATION
     * ============================
     * Static array defining navigation sections and their properties
     */
    const navItems = [
        { id: 'about', text: 'About' },
        { id: 'coding', text: 'Coding' },
        { id: 'projects', text: 'Projects' },
        { id: 'contact', text: 'Contact' }
    ];

    /**
     * COMPONENT OUTPUT
     * ================
     * Renders the orbital navigation system with animated buttons.
     * 
     * STRUCTURE:
     * - Container (buttonsWrapper): Defines the orbital animation space
     * - Navigation links: 4 anchor elements with futuristic SVG icons and text labels
     * - Each button: Icon + text combination for About, Coding, Projects, Contact sections
     */
    return (
        <div ref={buttonsWrapperRef} className={classes.buttonsWrapper}>
            {navItems.map(item => (
                <a key={item.id} href={`#${item.id}`} className={classes.btn}>
                    <img src={NavButton} className={classes.btnIcon} />
                    <span className={classes.btnText}>{item.text}</span>
                </a>
            ))}
        </div>
    );
}

export default NavigationButtons;