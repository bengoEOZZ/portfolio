/**
 * NAVIGATIONBUTTONS COMPONENT
 * ===========================
 * Main navigation component for the creative portfolio mode featuring orbital button animation.
 * 
 * ANIMATION SYSTEM:
 * -----------------
 * 1. Initial State (0-3.4s): All buttons hidden  with opacity 0 and scale 0.6
 * 2. Entry Animation (3.4-5.2s): Heavy hologram interference materialization effect
 * 3. Orbital Motion: CSS @property --angle calculates continuous 20s elliptical rotation
 *    - Elliptical path: 375px horizontal × 250px vertical radius
 *    - Wobble effect: 15x frequency sine wave (5px amplitude)
 *    - Each button positioned 90° apart (0°, 90°, 180°, 270°)
 * 4. Dynamic Depth System:
 *    - z-index: Calculated via orbital motion positioning and moon overlap
 *    - Scale: larger near front (1.0), smaller near back (0.6)
 * 5. Side Wobble (4s infinite): Buttons rotate ±10° for better orbital motion
 * 
 * INTERACTIVE FEATURES:
 * ---------------------
 * Navigation: Click buttons to navigate to portfolio sections (About, Coding, Projects, Contact)
 * Hover Effect: Buttons scale up and have a glitchy colour effect on hover
 */

// DEPENDENCIES
import classes from './NavigationButtons.module.css';
import NavButton from '../../../assets/CreativeMode/navButton.svg';

/**
 * NavigationButtons Component
 * ==========================
 */
function NavigationButtons() {
    /**
     * NAVIGATION DATA CONFIGURATION
     * ============================
     */
    const navItems = [
        { id: 'about', text: 'ABOUT' },      // Position: 0° (right)
        { id: 'coding', text: 'CODING' },    // Position: 90° (bottom)
        { id: 'projects', text: 'PROJECT' }, // Position: 180° (left)
        { id: 'contact', text: 'CONTACT' }   // Position: 270° (top)
    ];

    /**
     * HANDLE NAVIGATION CLICK (DELETE LATER)
     * ======================================
     */
    const handleNavClick = (e, sectionName) => {
        e.preventDefault(); // Prevent default anchor behavior
        alert(`🚧 ${sectionName} Section - Under Construction 🚧\n\nThis section is currently being developed. Please check back soon!`);
    };

    /**
     * COMPONENT OUTPUT
     * ================
     */
    return (
        <div className={classes.buttonsWrapper}>
            {navItems.map((item, index) => (
                /* ORBITAL BUTTON CONTAINER (Handles unique elliptical path positioning) */
                <div key={item.id} className={classes.btnOrbitContainer} data-index={index}>
                    {/* NAVIGATION LINK */}
                    <a href={`#${item.id}`} className={classes.btn}
                        onClick={(e) => handleNavClick(e, item.text)}> {/* TODO: UNDER CONSTRUCTION */}
                            {/* BUTTON ICON */}
                            <img src={NavButton} className={classes.btnIcon} />
                            {/* BUTTON TEXT */}
                            <span className={classes.btnText}>{item.text}</span>
                    </a>
                </div>
            ))}
        </div>
    );
}

export default NavigationButtons;