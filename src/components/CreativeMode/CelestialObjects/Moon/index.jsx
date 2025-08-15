/**
 * PERSONALMOON COMPONENT
 * ======================
 * 
 * Renders day/night versions of personal moon representation with smooth transitions.
 * Handles the switching between day and night moon appearances based on time period.
 * Night hours: (21:00-02:59)
 */

import { useMemo, memo } from 'react';
import classes from './Moon.module.css';

// MOON ASSETS
import BenMoonDayImage from '../../../../assets/CreativeMode/BenMoonDay.svg';
import BenMoonNightImage from '../../../../assets/CreativeMode/BenMoonNight.svg';

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
                src={BenMoonDayImage} 
                className={classes.dayMoon} 
                style={dayMoonStyle}
            />
            
            {/* NIGHT VERSION */}
            <img 
                src={BenMoonNightImage}  
                className={classes.nightMoon} 
                style={nightMoonStyle}
            />
        </>
    );
});

export default Moon;