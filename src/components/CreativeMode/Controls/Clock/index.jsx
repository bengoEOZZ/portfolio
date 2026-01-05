/**
 * CLOCK COMPONENT
 * ===============
 * Interactive analog clock with digital time display.
 * Handles time manipulation through click-and-hold clock hand.
 *
 * FEATURES:
 * ---------
 * - Analog clock with rotating hand
 * - Digital time display (24-hour format)
 * - Mouse interaction for time manipulation
 * 
 * INTERACTIVE FEATURES:
 * ---------------------
 * Click & Hold: Press and hold the clock hand for manual time adjustment
 */

// DEPENDENCIES
import classes from './Clock.module.css';

// CLOCK ASSETS
import ClockImage from "../../../../assets/CreativeMode/clock.png";
import ClockHand from '../../../../assets/CreativeMode/clockhand.png';

/**
 * Clock Component
 * ===============
 */
function Clock({ 
    rotation,
    currentHour,
    handleMouseDown, 
    handleMouseUp,
    handleTouchStart,
    handleTouchEnd
}) {

    return (
        <>
            {/* INTERACTIVE CLOCK SECTION */}
            <div className={classes.clockContainer}>
                <img src={ClockImage} className={classes.clock} />
                <img 
                    src={ClockHand} 
                    className={classes.clockHand}
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                />
            </div>

            {/* TIME DISPLAY SECTION */}
            <div className={classes.timeDisplay}>
                {String(currentHour).padStart(2, '0')}:00
            </div>
        </>
    );
}

export default Clock;
