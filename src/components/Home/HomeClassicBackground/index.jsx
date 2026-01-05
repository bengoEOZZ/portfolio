/**
 * HOME CLASSIC BACKGROUND COMPONENT
 * ==================================
 * Renders all luxury-themed decorative elements for the left half of the home page.
 * 
 * Includes:
 * - Glow Orb: Large ambient golden light source with pulsing animation
 * - Background Rings: Three floating golden circular rings at various depths
 * - Constellation Lines: Angled decorative lines forming geometric patterns
 * - Glow Dots: Small pulsing glowing dots
 * - Sparkle Particles: 20 twinkling gold sparkles scattered across the left side
 * 
 * All elements are positioned absolutely and use the left 50% of the viewport.
 */

// DEPENDENCIES
import classes from './HomeClassicBackground.module.css';
import Sparkle from '../../ClassicMode/Sparkle';

// Sparkle configurations for left side - gold tinted
const CLASSIC_SPARKLES = [
    { top: '8%', left: '5%', delay: '0s', duration: '4s' },
    { top: '15%', left: '18%', delay: '0.3s', duration: '3.5s' },
    { top: '12%', left: '35%', delay: '0.7s', duration: '4.2s' },
    { top: '22%', left: '8%', delay: '1s', duration: '3.8s' },
    { top: '25%', left: '28%', delay: '0.2s', duration: '4s' },
    { top: '30%', left: '42%', delay: '1.2s', duration: '3.5s' },
    { top: '35%', left: '12%', delay: '0.5s', duration: '4.5s' },
    { top: '40%', left: '22%', delay: '0.8s', duration: '3.8s' },
    { top: '45%', left: '38%', delay: '1.5s', duration: '4s' },
    { top: '48%', left: '5%', delay: '0.1s', duration: '3.5s' },
    { top: '55%', left: '30%', delay: '0.9s', duration: '4.2s' },
    { top: '58%', left: '15%', delay: '1.3s', duration: '3.8s' },
    { top: '65%', left: '40%', delay: '0.4s', duration: '4s' },
    { top: '68%', left: '8%', delay: '1.1s', duration: '3.5s' },
    { top: '72%', left: '25%', delay: '0.6s', duration: '4.5s' },
    { top: '78%', left: '45%', delay: '1.4s', duration: '3.8s' },
    { top: '82%', left: '12%', delay: '0.2s', duration: '4s' },
    { top: '85%', left: '32%', delay: '0.8s', duration: '3.5s' },
    { top: '90%', left: '20%', delay: '1s', duration: '4.2s' },
    { top: '92%', left: '42%', delay: '0.5s', duration: '3.8s' },
];

function HomeClassicBackground() {
    return (
        <>
            {/* GLOW ORB */}
            <div className={classes.glowOrb}></div>
            
            {/* BACKGROUND RINGS */}
            <div className={classes.backgroundRings}>
                <div className={classes.backgroundRing}></div>
                <div className={classes.backgroundRing}></div>
                <div className={classes.backgroundRing}></div>
            </div>
            
            {/* BACKGROUND LINES AND DOTS */}
            <div className={classes.backgroundLines}>
                <div className={classes.backgroundLine}></div>
                <div className={classes.backgroundLine}></div>
                <div className={classes.backgroundLine}></div>
                <div className={classes.backgroundLine}></div>
                <div className={classes.backgroundGlowDot}></div>
                <div className={classes.backgroundGlowDot}></div>
                <div className={classes.backgroundGlowDot}></div>
                <div className={classes.backgroundGlowDot}></div>
                <div className={classes.backgroundGlowDot}></div>
                <div className={classes.backgroundGlowDot}></div>
            </div>

            {/* SPARKLE PARTICLES */}
            {CLASSIC_SPARKLES.map((sparkle, index) => (
                <Sparkle
                    key={index}
                    style={{ top: sparkle.top, left: sparkle.left }}
                    animationDelay={sparkle.delay}
                    duration={sparkle.duration}
                />
            ))}
        </>
    );
}

export default HomeClassicBackground;
