/**
 * PERSONALMOON COMPONENT
 * ======================
 * Renders day/night versions of personal moon representation with smooth fade transitions.
 * Displays different moon appearances based on time of day, switching between day and night states.
 * 
 * VISUAL STATES:
 * --------------
 * Day Moon (03:00-20:59): Full moon avatar visible during daylight hours
 * Night Moon (21:00-02:59): Crescent moon avatar visible during nighttime hours
 * 
 * INTERACTIVE FEATURES:
 * ---------------------
 * Automatic Time Detection: Moon appearance changes based on Day/Night time periods
 */

import { useMemo, memo } from 'react';
import classes from './Moon.module.css';

// MOON ASSETS
import MoonDayAvatarImage from '../../../../assets/CreativeMode/moonDayAvatar.svg';
import MoonNightAvatarImage from '../../../../assets/CreativeMode/moonNightAvatar.svg';

/**
 * PersonalMoon Component
 * ======================
 */
const Moon = memo(({ isNightTime }) => {
    /* MEMOIZED STYLE OBJECTS */
    const dayMoonStyle = useMemo(() => ({
    opacity: isNightTime ? 0 : 1,                    // Hide during night, show during day
    transition: 'opacity 1s ease-in-out',            // Smooth 1-second fade transition
    }), [isNightTime]);                              // Only recalculate when day/night changes

    const nightMoonStyle = useMemo(() => ({
    opacity: isNightTime ? 1 : 0,                    // Show during night, hide during day
    transition: 'opacity 1s ease-in-out',            // Smooth 1-second fade transition  
    }), [isNightTime]);                              // Only recalculate when day/night changes
    
    return (
        <>
            {/* DAY VERSION */}
            <img 
                src={MoonDayAvatarImage} 
                className={classes.dayMoon} 
                style={dayMoonStyle}
            />
            
            {/* NIGHT VERSION */}
            <img 
                src={MoonNightAvatarImage}  
                className={classes.nightMoon} 
                style={nightMoonStyle}
            />
        </>
    );
});

export default Moon;