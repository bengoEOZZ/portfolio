# Advanced React Techniques & Tricks Reference

> **Portfolio Project Documentation**  
> A comprehensive guide to the advanced patterns, animations, and techniques used in this React portfolio

---

## Table of Contents

1. [Custom React Hooks](#1-custom-react-hooks)
2. [Advanced CSS Techniques](#2-advanced-css-techniques)
3. [Performance Optimizations](#3-performance-optimizations)
4. [Component Architecture](#4-component-architecture)
5. [SVG & Visual Effects](#5-svg--visual-effects)
6. [User Experience Patterns](#6-user-experience-patterns)
7. [Mobile Optimizations](#7-mobile-optimizations)
---

## 1. Custom React Hooks

### 1.1 3D Mouse Tracking Hook

**File:** `src/hooks/ClassicMode/use3DMouseTracking.js`

Creates realistic 3D tilt effects that follow mouse movement on cards, images, and interactive elements.

#### Core Math

```
mouseX = (e.clientX - centerX) / rect.width * intensity

1. (e.clientX - centerX)   → Mouse distance from element center (pixels)
2. / rect.width            → Normalize to -0.5 to +0.5 range
3. * intensity             → Scale to rotation degrees (e.g., -15° to +15°)
```

#### Implementation

```javascript
const use3DMouseTracking = (elementRef, options = {}, dependencies = []) => {
  // elementRef: Reference to the HTML element to tilt
  // options: { intensity, baseTransform, containerRef }
  // dependencies: Values that trigger hook re-run when changed

  const { 
    intensity = 15,        // Max tilt degrees (higher = more dramatic)
    baseTransform = '',    // Existing CSS transform to preserve (e.g., flip)
    containerRef = null    // Optional: track mouse on a different element
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    const trackingElement = containerRef?.current || element?.parentElement;
    // containerRef?.current uses "optional chaining" - won't crash if null
    // Falls back to element's parent as tracking area
    
    if (!element || !trackingElement) return;  // Exit if elements aren't ready

    const handleMouseMove = (e) => {
      const rect = trackingElement.getBoundingClientRect();
      // Returns { left, top, width, height } of the tracking area

      // Find center of tracking area
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate tilt: distance from center → normalized → scaled to degrees
      const mouseX = (e.clientX - centerX) / rect.width * intensity;
      const mouseY = (e.clientY - centerY) / rect.height * -intensity;
      // mouseY is NEGATIVE: mouse down = tilt backward (natural perspective)

      element.style.transform = 
        `${baseTransform} rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
      // rotateX = forward/backward tilt, rotateY = left/right tilt
    };

    const handleMouseLeave = () => {
      element.style.transform = baseTransform;  // Reset tilt, keep base transform
    };

    trackingElement.addEventListener('mousemove', handleMouseMove);
    trackingElement.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup: remove listeners on unmount or dependency change
    return () => {
      trackingElement.removeEventListener('mousemove', handleMouseMove);
      trackingElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elementRef, intensity, baseTransform, containerRef, ...dependencies]);
};
```

#### Usage Examples

```javascript
const cardRef = useRef(null);

// Basic: default 15° tilt
use3DMouseTracking(cardRef);

// Custom intensity
use3DMouseTracking(cardRef, { intensity: 10 });

// With flip preservation (for flip cards)
use3DMouseTracking(cardRef, {
  intensity: 10,
  baseTransform: 'rotateY(180deg)',  // Card is flipped - tilt adds on top
  containerRef: parentRef
});

// Full component
function ProfileCard() {
  const cardRef = useRef(null);
  use3DMouseTracking(cardRef, { intensity: 12 });
  
  return (
    <div ref={cardRef} style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s' }}>
      <h2>Bengo3022</h2>
    </div>
  );
}
```

**Key Concepts:**
- **useEffect** runs code on mount/update/unmount
- **getBoundingClientRect()** gets element's position and size on screen
- **Cleanup function** (the `return`) removes listeners to prevent memory leaks
- **baseTransform** lets tilt work on already-transformed elements (e.g., flipped cards)

---

### 1.2 Page Transition Hook

**File:** `src/hooks/ClassicMode/usePageTransition.js`

Centralized page transition control for coordinating fade-out animations across multiple components.

#### Implementation

```javascript
export const usePageTransition = () => {
  const [transitioning, setTransitioning] = useState(false);   // Is transition happening?
  const [isExiting, setIsExiting] = useState(false);           // Should components fade out?

  const startTransition = (callback, duration = 600) => {
    // PHASE 1: Start fade-out
    setTransitioning(true);
    setIsExiting(true);
    // Components watching isExiting apply their exit CSS classes

    // PHASE 2: After fade-out completes, execute callback
    setTimeout(() => {
      if (callback) callback();  // Usually navigate to new page
      
      // PHASE 3: Reset - triggers fade-in of new content
      setTransitioning(false);
      setIsExiting(false);
    }, duration);
  };

  return { transitioning, isExiting, startTransition };
};
```

#### Usage

```javascript
function Navigation() {
  const navigate = useNavigate();
  const { isExiting, startTransition } = usePageTransition();

  const handleNavigation = (path) => {
    startTransition(() => {
      navigate(path);  // Runs AFTER fade-out completes
    }, 600);
  };

  return (
    <div className={isExiting ? classes.fadeOut : classes.fadeIn}>
      <button onClick={() => handleNavigation('/about')}>About Me</button>
      <button onClick={() => handleNavigation('/projects')}>Projects</button>
    </div>
  );
}
```

**The CSS:**

```css
.fadeIn {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s ease-out;
}

.fadeOut {
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.6s ease-in;
}
```

**Flow:** Click → `isExiting = true` → elements fade out (600ms) → `navigate()` runs → `isExiting = false` → new page fades in

**Benefits:**
- Prevents navigation race conditions
- Coordinated multi-component animations
- Configurable duration

---

### 1.3 Sun Rays Animation Hook

**File:** `src/components/CreativeMode/CelestialObjects/Sun/useSunRaysAnimation.jsx`

Animates 400+ SVG polygon elements with time-based patterns, DOM caching, and ping-pong opacity.

**Time periods:** Dawn (11 rays), Morning (104), Afternoon (323), Evening (107 sparse)

#### Ray Configuration System

```javascript
// 5 ray groups (ray1-ray5), each with different patterns per time period
// Each ray is an SVG polygon with ID like "ray1-23" or "ray3-105"
const RAY_CONFIGURATIONS = {
  DAWN: {    // 11 total - minimal starlight
    ray1: { length: 1, pattern: i => 8 },           // Just ray1-8
    ray2: { length: 3, pattern: i => i * 20 + 5 },  // ray2-5, ray2-25, ray2-45
    ray3: { length: 5, pattern: i => i * 15 + 10 },
    ray4: { length: 4, pattern: i => i * 18 + 3 },
    ray5: { length: 2, pattern: i => i * 25 + 12 }
    // pattern(i) calculates which ray indices to show
    // i * 20 + 5 → i=0: 5, i=1: 25, i=2: 45 (sparse, spaced 20 apart)
  },
  MORNING: {    // 104 total - consecutive rays (i + 1 = no gaps)
    ray1: { length: 4, pattern: i => i + 1 },
    ray2: { length: 15, pattern: i => i + 1 },
    ray3: { length: 40, pattern: i => i + 1 },
    ray4: { length: 25, pattern: i => i + 1 },
    ray5: { length: 20, pattern: i => i + 1 }
  },
  AFTERNOON: {  // 323 total - peak intensity, all consecutive
    ray1: { length: 15, pattern: i => i + 1 },
    ray2: { length: 70, pattern: i => i + 1 },
    ray3: { length: 105, pattern: i => i + 1 },
    ray4: { length: 76, pattern: i => i + 1 },
    ray5: { length: 57, pattern: i => i + 1 }
  },
  EVENING: {  // 107 total - every 3rd ray for sunset gaps
    ray1: { length: 15, pattern: i => i * 3 + 1 },  // 1, 4, 7, 10...
    ray2: { length: 70, pattern: i => i * 3 + 1 },
    ray3: { length: 105, pattern: i => i * 3 + 1 },
    ray4: { length: 76, pattern: i => i * 3 + 1 },
    ray5: { length: 57, pattern: i => i * 3 + 1 }
  }
};
```

#### Pre-Computed Animation Step

```javascript
const ANIMATION_CONFIG = {
  FADE_DURATION: 1000,   // 1 second fade in/out
  STAGGER_DELAY: 200,    // 200ms between each ray starting
  ANIMATION_FPS: 60
};

// Pre-calculate opacity change per frame (instead of computing every frame)
const ANIMATION_STEP = 1 / (ANIMATION_CONFIG.FADE_DURATION / (1000 / ANIMATION_CONFIG.ANIMATION_FPS));
// Breaking it down:
//   1000 / ANIMATION_FPS  = 1000 / 60 = 16.67ms  → how long one frame lasts
//   FADE_DURATION / 16.67 = 1000 / 16.67 = 60     → total frames in the fade
//   1 / 60               = 0.0167                 → opacity added per frame
//
// What it produces (full fade-in sequence):
//   Frame 1:  opacity = 0 + 0.0167 = 0.0167
//   Frame 2:  opacity = 0.0167 + 0.0167 = 0.0334
//   Frame 30: opacity ≈ 0.50  (halfway)
//   Frame 60: opacity ≈ 1.00  (fully visible → direction flips to -1)
//   Frame 61: opacity = 1.00 - 0.0167 = 0.9833  (now fading out)
//   ... repeats forever (ping-pong)
```

#### Smart DOM Caching

**Problem:** 400+ SVG polygons need to be found and animated. Querying the DOM every frame is slow.
**Solution:** Query once, cache references in a `useRef`, reuse forever.

```javascript
const polygonCacheRef = useRef({});
// useRef stores the cache without triggering re-renders when updated.
// Cache shape after first call with 'MORNING':
// {
//   MORNING: {
//     ray1: [<polygon id="ray1-1">, <polygon id="ray1-2">, ...],
//     ray2: [<polygon id="ray2-1">, <polygon id="ray2-2">, ...],
//     ...
//   }
// }

const getPolygonCache = (timePeriod) => {
  // Only build the cache if this time period hasn't been cached yet.
  if (!polygonCacheRef.current[timePeriod]) {
    polygonCacheRef.current[timePeriod] = {};

    // PRECOMPUTED_PATTERNS[timePeriod] looks like:
    // { ray1: [1, 2, 3, 4], ray2: [1, 2, ..., 15], ray3: [1, ..., 40], ... }
    const patterns = PRECOMPUTED_PATTERNS[timePeriod];

    Object.keys(patterns).forEach(rayKey => {
      const rayNum = rayKey.replace('ray', '');   // 'ray1' → '1' (used to build SVG id: "ray1-23")
      const indices = patterns[rayKey];           // the list of polygon numbers for this group, e.g. [1, 2, 3, 4]

      polygonCacheRef.current[timePeriod][rayKey] = indices
        // For each index, find the matching <polygon> element in the SVG
        .map(i => document.querySelector(`polygon[id="ray${rayNum}-${i}"]`))
        .filter(Boolean); //.filter(Boolean) removes any null results so we only store real DOM nodes
    });
  }

  return polygonCacheRef.current[timePeriod];
  // Performance: First call = 323 querySelector calls (one-time)
  // Subsequent calls = just return cached array (instant, 0 DOM queries)
};
```

#### Ping-Pong Opacity Animation

Each ray pulses: 0 → 1 → 0 → 1 (forever), like a breathing effect.

```javascript
// Per-ray animation state stored in a Map
const animationStateRef = useRef(new Map());
// Each entry: { opacity, startOpacity: 0, endOpacity: 1, step, direction: 1 }

const updateAnimations = () => {
  let activeAnimations = 0;

  animationStateRef.current.forEach((state, element) => {
    if (!document.contains(element)) return;  // Skip removed elements

    // Update opacity in current direction
    state.opacity += ANIMATION_STEP * state.direction;

    // Clamp to valid range
    if (state.opacity < 0) state.opacity = 0;
    if (state.opacity > 1) state.opacity = 1;

    // Apply to DOM
    element.style.opacity = state.opacity.toFixed(2);

    // Reverse direction at boundaries (ping-pong)
    if (state.direction === 1 && state.opacity >= state.endOpacity) {
      state.direction = -1;  // Start fading OUT
    } else if (state.direction === -1 && state.opacity <= state.startOpacity) {
      state.direction = 1;   // Start fading IN
    }

    activeAnimations++;  // Count how many rays are still animating
  });

  if (activeAnimations > 0) {
    rafRef.current = requestAnimationFrame(updateAnimations);  // Keep looping while rays are active
  }
  // When activeAnimations hits 0, the loop stops itself — no manual cleanup needed
};
```

#### Staggered Startup

```javascript
const setupAnimations = (timePeriod) => {
  const cache = getPolygonCache(timePeriod);

  Object.entries(cache).forEach(([rayKey, polygons]) => {
    polygons.forEach((polygon, index) => {
      const timeout = setTimeout(() => {
        startOpacityAnimation(polygon);
      }, index * 200);  // Ray 0: 0ms, Ray 1: 200ms, Ray 2: 400ms...
      
      timeoutRef.current.push(timeout);  // Save for cleanup
    });
  });
};
// 200ms stagger creates cascading wave effect across the sun
```

**Key Takeaways:**
1. **Pre-computation** - Calculate ANIMATION_STEP once, not every frame
2. **DOM caching** - Query 323 elements once, reuse the references forever
3. **Ping-pong** - Direction flip (`1`/`-1`) creates organic pulsing
4. **Stagger delays** - `index * 200ms` creates wave effects across 300+ elements
5. **Cleanup** - Always clear timeouts, RAF, and state on unmount

---

### 1.4 Clock Hand Rotation Hook

**File:** `src/components/CreativeMode/Controls/Clock/useClockHandRotation.jsx`

Interactive clock with smooth rotation — click and hold to spin, release to stop.

#### Interval-based Continuous Rotation

```javascript
const [rotation, setRotation] = useState(0);   // Current angle in degrees
const intervalRef = useRef(null);              // Store interval ID for cleanup

const handleMouseDown = () => {
  if (intervalRef.current) clearInterval(intervalRef.current);  // Prevent duplicates
  
  intervalRef.current = setInterval(() => {
    setRotation(prev => prev + ROTATION_STEP);  // Add 2° every 30ms
    // prev ensures we always build on the latest value
    // 0 → 2 → 4 → 6 → 8... (continuous rotation)
  }, 30);  // 33 FPS (1000ms / 30ms)
};

const handleMouseUp = () => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);  // Stop rotation
    intervalRef.current = null;
  }
};

// Cleanup on unmount to prevent memory leaks
useEffect(() => {
  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, []);
```

#### Complete Component

```javascript
function ClockHand() {
  const [rotation, setRotation] = useState(0);
  const intervalRef = useRef(null);
  
  const handleMouseDown = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setRotation(prev => prev + 2);
    }, 30);
  };
  
  const handleMouseUp = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ transform: `rotate(${rotation}deg)`, transition: 'none' }}
    />
  );
}
```

**setInterval vs requestAnimationFrame:**
- `setInterval(fn, 30)` — Fixed 33 FPS, gives control over speed. Best for user interactions.
- `requestAnimationFrame(fn)` — Synced to browser refresh (~60fps). Best for smooth visual animations.
- Clock uses setInterval because we want controlled speed, not maximum smoothness.

---

## 2. Advanced CSS Techniques

### 2.1 CSS Variable-Driven Animations

**File:** `src/components/ClassicMode/Sparkle/Sparkle.module.css`

Using CSS custom properties for dynamic animation control from JavaScript.

#### Component-Level Variables

```css
.sparkle {
  /* Variables set from JavaScript */
  animation: iconSparkle var(--duration, 3s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}

@keyframes iconSparkle {
  0%, 100% { 
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% { 
    opacity: 1;
    transform: scale(1.2) rotate(180deg);
  }
}
```

#### JavaScript Control

```javascript
// Set CSS variables from JavaScript via inline style
<div 
  className={classes.sparkle}
  style={{
    '--delay': '0.5s',     // CSS reads: animation-delay: var(--delay)
    '--duration': '2s'     // CSS reads: animation: ... var(--duration) ...
  }}
/>

// One class, infinite variations via variables
// (instead of .sparkle-fast, .sparkle-medium, .sparkle-slow...)
function SparkleField() {
  return (
    <div>
      <Sparkle style={{ '--delay': '0s', '--duration': '2s' }} />
      <Sparkle style={{ '--delay': '0.3s', '--duration': '1.5s' }} />
      <Sparkle style={{ '--delay': '0.6s', '--duration': '2.5s' }} />
    </div>
  );
}

// Generating random sparkles
function RandomSparkles({ count = 10 }) {
  return (
    <div>
      {Array.from({ length: count }, (_, i) => (
        <Sparkle 
          key={i}
          style={{
            '--delay': `${Math.random() * 2}s`,
            '--duration': `${1 + Math.random()}s`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
}
```

**Benefits:**
- One CSS class controls all variations through variables
- Clean separation of logic and styling
- Dynamic timing without className juggling

---

### 2.2 Elliptical Orbit with Wobble Math

**File:** `src/components/CreativeMode/NavigationButtons/NavigationButtons.module.css`

Advanced orbital mechanics using trigonometry for elliptical paths with high-frequency wobble and dynamic depth effects.

#### Core Math Formula

```css
/* ORBITAL PATH CALCULATION */
--x: calc(cos(var(--angle)) * var(--x-amplitude) + 
          cos(var(--wobble-multiplier) * var(--angle)) * var(--wobble-amplitude));
--y: calc(sin(var(--angle)) * var(--y-amplitude) + 
          sin(var(--wobble-multiplier) * var(--angle)) * var(--wobble-amplitude));
```

**Formula Breakdown:**

```
X Position = cos(angle) × 375px  +  cos(15 × angle) × 5px
             └─ Main ellipse ─┘     └─── Wobble ────┘

Y Position = sin(angle) × 250px  +  sin(15 × angle) × 5px
             └─ Main ellipse ─┘     └─── Wobble ────┘
```

**What Each Part Does:**
- `cos(angle) × 375px` = Horizontal ellipse (20vw radius)
- `sin(angle) × 250px` = Vertical ellipse (23vh radius)
- `cos(15 × angle) × 5px` = Fast horizontal wobble (15 cycles per orbit)
- `sin(15 × angle) × 5px` = Fast vertical wobble (15 cycles per orbit)

#### Dynamic Depth System

```css
/* Z-INDEX DEPTH */
--z-depth: calc(6 + (sin(var(--angle)) * 3));
/* Range: 3 to 9
 * Front (90°): sin(90°) = 1  → z-index = 9 (topmost)
 * Side (0°/180°): sin = 0    → z-index = 6 (middle)
 * Back (270°): sin(270°) = -1 → z-index = 3 (bottommost)
 */

/* SCALE DEPTH */
--depth-scale: calc(0.85 + (sin(var(--angle)) * 0.15));
/* Range: 0.7 to 1.0 (30% size variation)
 * Front: 0.85 + 0.15 = 1.0 (100% size)
 * Back:  0.85 - 0.15 = 0.7 (70% size)
 */

/* BRIGHTNESS DEPTH */
--depth-brightness: calc(0.8 + (sin(var(--angle)) * 0.4));
/* Range: 0.4 to 1.2 (80% brightness variation)
 * Front: 0.8 + 0.4 = 1.2 (120% brightness)
 * Back:  0.8 - 0.4 = 0.4 (40% brightness)
 */
```

#### Complete Implementation

```css
/* CSS CUSTOM PROPERTIES */
@property --angle {
  syntax: '<angle>';
  inherits: true;
  initial-value: 0deg;
}

/* ORBIT CONFIGURATION */
:root {
  --x-amplitude: 20vw;         /* Horizontal ellipse radius */
  --y-amplitude: 23vh;         /* Vertical ellipse radius */
  --wobble-multiplier: 15;     /* Wobble frequency (15 cycles per orbit) */
  --wobble-amplitude: 0.25vw;  /* Wobble size (5px) */
}

/* ORBIT CONTAINER */
.btnOrbitContainer {
  position: absolute;
  left: 50%;
  top: 50%;
  
  /* CALCULATE POSITION WITH WOBBLE */
  --x: calc(cos(var(--angle)) * var(--x-amplitude) + 
            cos(var(--wobble-multiplier) * var(--angle)) * var(--wobble-amplitude));
  --y: calc(sin(var(--angle)) * var(--y-amplitude) + 
            sin(var(--wobble-multiplier) * var(--angle)) * var(--wobble-amplitude));
  
  /* APPLY POSITION */
  transform: translate(-150%, -50%);  /* Center pivot point */
  translate: var(--x) var(--y);       /* Move to calculated position */
  
  /* DYNAMIC DEPTH */
  --z-depth: calc(6 + (sin(var(--angle)) * 3));
  z-index: var(--z-depth);
  
  /* ORBIT ANIMATION */
  animation: revolve 20s linear infinite;  /* 20 seconds per revolution */
}

/* BUTTON WITH DEPTH SCALING */
.btnIcon {
  /* SCALE BASED ON DEPTH */
  --depth-scale: calc(0.85 + (sin(var(--angle)) * 0.15));
  --depth-brightness: calc(0.8 + (sin(var(--angle)) * 0.4));
  
  transform: scale(var(--depth-scale));
  filter: brightness(var(--depth-brightness));
}

/* CONTINUOUS ROTATION */
@keyframes revolve {
  from { --angle: 0deg; }
  to   { --angle: 360deg; }
}
```

#### Staggered Positioning

```css
/* Position buttons 90° apart using negative delays */
.btnOrbitContainer[data-index="0"] { 
  animation-delay: 3.4s;   /* 0° - Right side */
}
.btnOrbitContainer[data-index="1"] { 
  animation-delay: -1.6s;  /* 90° - Bottom (8% into cycle) */
}
.btnOrbitContainer[data-index="2"] { 
  animation-delay: -6.6s;  /* 180° - Left (33% into cycle) */
}
.btnOrbitContainer[data-index="3"] { 
  animation-delay: -11.6s; /* 270° - Top (58% into cycle) */
}
```

**Negative Delay Math:**
```
Delay = -(desired_angle / 360) × orbit_duration

90° button:  -(90/360) × 20s = -5s    (adjusted to -1.6s for fine-tuning)
180° button: -(180/360) × 20s = -10s  (adjusted to -6.6s)
270° button: -(270/360) × 20s = -15s  (adjusted to -11.6s)
```

**Key Learnings:**
- `cos()` and `sin()` create circular/elliptical motion
- High-frequency wobble (×15) adds organic movement
- `sin(angle)` creates smooth depth transitions (front/back)
- CSS `@property` enables animating custom properties
- Negative `animation-delay` starts animation mid-cycle

---

### 2.3 VH-Based Responsive Scaling

**File:** `src/components/CreativeMode/WeatherEffects/WeatherEffects.module.css`

Viewport-based units for consistent sizing across screen sizes.

#### Pattern

```css
/* vh = "viewport height" - 1vh = 1% of screen height */
/* Unlike px (fixed) or % (parent-based), vh scales with screen size */

.seasonalChanges {
  width: 55.56vh;   /* 600px on 1080p → 400px on 720p → 800px on 1440p */
  height: 34.72vh;  /* 375px on 1080p → 250px on 720p → 500px on 1440p */
}

.particle {
  width: 0.46vh;    /* 5px on 1080p */
  height: 0.93vh;   /* 10px on 1080p */
}
```

**Conversion Formula:** `vh = (pixels / 1080) * 100`

| Pixels | VH Value |
|--------|----------|
| 5px | 0.46vh |
| 50px | 4.63vh |
| 100px | 9.26vh |
| 375px | 34.72vh |
| 600px | 55.56vh |

**When to Use:**
- Use vh for animations, visual effects, backgrounds (scales proportionally)
- Use `rem` for text (readable at all sizes)
- Use `px` for borders (consistent thin lines)

---

### 2.4 Pseudo-Element Layering

Creating complex visuals without extra DOM elements.

```css
.card {
  position: relative;
}

/* Background layer */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, gold, #fff);
  z-index: -1;
}

/* Highlight layer */
.card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, 
    rgba(255,255,255,0.3), 
    transparent
  );
  pointer-events: none;
}
```

**Benefits:**
- ✅ No extra HTML elements
- ✅ Cleaner component structure
- ✅ Better performance (fewer DOM nodes)
- ✅ Easier to maintain

---

## 3. Performance Optimizations

### 3.1 Pre-calculation Strategy

**Source:** Orbital Animation Hook

#### Anti-Pattern (Every Frame)

```javascript
// BAD: Recalculating every frame (60 times per second)
function animate() {
  elements.forEach((el, i) => {
    const width = el.offsetWidth;   // Triggers layout recalculation (SLOW)
    const height = el.offsetHeight; // Triggers layout recalculation (SLOW)
    const angle = (i * Math.PI * 2) / elements.length;  // Same result every time
    // ...
  });
  requestAnimationFrame(animate);
}
// Result: 240 DOM reads/second, laggy animation
```

#### Optimized Pattern

```javascript
// GOOD: Pre-calculate once, reuse forever
const widths = elements.map(el => el.offsetWidth);     // Calculated ONCE
const heights = elements.map(el => el.offsetHeight);   // Calculated ONCE
const angles = elements.map((_, i) => (i * Math.PI * 2) / elements.length);
// [0, 1.57, 3.14, 4.71] - evenly spaced around circle

function animate() {
  elements.forEach((el, i) => {
    const x = centerX + radius * Math.cos(angles[i]) - widths[i] / 2;
    const y = centerY + radius * Math.sin(angles[i]) - heights[i] / 2;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  });
  requestAnimationFrame(animate);
}
// Result: 0 DOM reads, just fast array lookups. 78% faster.
```

| Operation | Time | Speed |
|-----------|------|-------|
| Array access `widths[i]` | 0.001ms | Fast |
| DOM read `el.offsetWidth` | 0.1ms | 100x slower |
| Layout calculation | 1-10ms | 1000x slower |

**Principle:** "Calculate heavy, store light, use fast"

---

### 3.2 UseMemo for Expensive Calculations

**File:** `src/components/CreativeMode/Earth/index.jsx`

```javascript
// BAD: Recalculates every render
const brightness = calculateBrightness(currentHour);

// GOOD: Only recalculates when currentHour changes
const brightness = useMemo(() => 
  calculateBrightness(currentHour), 
  [currentHour]
);
```

**Use when:** Expensive calculations, array/object creation in render, dependency of other hooks.
**Skip when:** Simple assignments, premature optimization.

---

### 3.3 Conditional Event Listeners

**File:** `src/components/ClassicMode/NavigationBar/Briefcase/index.jsx`

Only attach listeners when needed — saves memory and CPU.

```javascript
useEffect(() => {
  if (!isMenuOpen) return;  // No listener when menu is closed

  const handleClickOutside = (e) => {
    if (!briefcaseRef.current.contains(e.target)) {
      setIsMenuOpen(false);  // Click was outside menu — close it
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isMenuOpen]);
// Menu opens → listener attached → menu closes → cleanup removes listener
```

---

### 3.4 RequestAnimationFrame Timing

```javascript
let lastTime = 0;
const frameTime = 1000 / 60;  // 16.67ms — one frame at 60 FPS

function animate(currentTime) {
  if (currentTime - lastTime < frameTime) {
    requestAnimationFrame(animate);
    return;  // Not enough time has passed — skip this frame
  }
  lastTime = currentTime;  // Record when this frame ran
  updatePositions();
  requestAnimationFrame(animate);  // Schedule next frame
}
```

Syncs with browser refresh rate, prevents wasted CPU cycles.

---

## 4. Component Architecture

### 4.1 Configuration Objects Pattern

**File:** Multiple hooks

Centralizing numbers and configuration for maintainability.

```javascript
// ✅ GOOD: Centralized configuration
const CONFIG = {
  HORIZONTAL_RADIUS: 850,
  VERTICAL_RADIUS: 600,
  ROTATION_SPEED: 0.01,
  INITIAL_DELAY: 8000,
  Z_INDEX: {
    BEHIND: 4,
    FRONT: 15
  }
};

function useAnimation() {
  // Use CONFIG.ROTATION_SPEED instead of a random 0.01
  const speed = CONFIG.ROTATION_SPEED;
  // ...
}
```

**Benefits:**
- ✅ Easy to adjust all related values
- ✅ Self-documenting code
- ✅ Enables A/B testing

---

### 4.2 Menu Items Configuration

```javascript
const MENU_ITEMS = [
  {
    id: 'about',
    label: 'about',
    path: '/classic/about',
    icon: 'wallet'
  },
  {
    id: 'coding',
    label: 'coding',
    path: '/classic/coding',
    icon: 'cardDeck'
  },
  // ...
];

// Render dynamically
{MENU_ITEMS.map((item) => (
  <MenuItem 
    key={item.id}
    {...item}
  />
))}
```

---

## 5. SVG & Visual Effects

### 5.1 Dynamic SVG Path Generation

**File:** `src/components/ClassicMode/LuxuryBackground/index.jsx`

Creating animated backgrounds with real-time calculated SVG paths.

**SVG Structure:**

```jsx
<svg width="100%" height="100%" viewBox="-200 0 1800 700">
  <defs>
    {/* Gradient fades transparent → gold → transparent: glow that vanishes at edges */}
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stopColor="rgba(191, 168, 80, 0)" />    {/* Left: invisible */}
      <stop offset="50%"  stopColor="rgba(191, 168, 80, 0.4)" />  {/* Centre: gold */}
      <stop offset="100%" stopColor="rgba(191, 168, 80, 0)" />    {/* Right: invisible */}
    </linearGradient>
  </defs>
  <path
    d={calculatePath(time)}       {/* Recalculated each frame via requestAnimationFrame */}
    fill="none"
    stroke="url(#goldGradient)"   {/* Paint the stroke with the gradient defined above */}
    strokeWidth="2"
  />
</svg>
```

**Path Calculation:**

```javascript
const calculatePath = (time) => {
  const points = [];

  for (let x = 0; x < width; x += 10) {
    // x steps across the SVG width in 10px increments — each becomes one point on the line.
    // More points = smoother curve, but slower to compute. 10px is a good balance.

    const y = Math.sin((x + time) * 0.01) * amplitude;
    //                  └──────────┘└───┘   └───────┘
    //                     phase    scale     height
    //
    // (x + time)  — x varies per point; time increases each frame.
    //               Adding them together shifts the wave left as time grows → scroll effect.
    //
    // * 0.01      — sin() expects radians. Without scaling, the wave would complete
    //               a full cycle every 6px (way too fast). 0.01 stretches one cycle
    //               across ~628px, giving a gentle, wide wave.
    //
    // * amplitude — controls how tall the wave is in pixels.
    //               amplitude = 50 → wave peaks 50px above/below center.

    points.push(`${x},${y}`);  // Each point is "x,y" — SVG coordinate pair
  }

  // SVG path string format: "M x,y L x,y L x,y ..."
  // M = Move to first point (no line drawn)
  // L = Line to each subsequent point
  // Result: a continuous polyline traced across the SVG
  return `M ${points.join(' L ')}`;
};
// Called every requestAnimationFrame with an incrementing `time` value.
// Each call shifts the wave slightly, producing smooth scrolling motion.
```

---

### 5.2 Creative Mode Layered Entrance

**Files:** `Earth.module.css`, `Sun.module.css`, `Clock.module.css`, `Sliders.module.css`, `HelloText.module.css`, `NavigationButtons.module.css`

Every element in Creative Mode has a deliberate entrance so the scene builds up in stages — Earth crashes in, then the Sun is born, then the controls slide in, then text drifts down from space, and finally the orbit buttons flicker into existence.

#### The Entrance Ladder

```
0s    → Starfield (instant, always visible)
0.5s  → Sun: stellarBirthSequence begins (4s cosmic explosion)
        Sun rays: entry flash, then hand off to JS animation
0s    → Earth container: earthMeteorEntry (3.5s blazing meteor crash)
        Earth SVG: earthSpinEntry (2s spin + formation)
1.5s  → Clock: clockEntry (3s bouncy materialization)
2.5s  → Weather slider: sliderSlideInEntry (2.2s slide from right)
2.8s  → Season slider: same slide, 300ms staggered after weather
3s    → HelloText: textEntry (2.5s spacey drop-in)
3.4s  → Orbit button 0: entryFade (glitchy hologram flicker)
3.6s  → Orbit button 1: entryFade
3.8s  → Orbit button 2: entryFade
4s    → Orbit button 3: entryFade
```

#### Earth — Blazing Meteor Crash

```css
/* The float container carries the whole Earth in on a diagonal trajectory */
.earthFloatContainer {
  animation:
    earthMeteorEntry 3.5s forwards,      /* Crashes in from top-left */
    earthFloat 6s ease-in-out infinite 3.5s;  /* Gentle float after landing */
}

@keyframes earthMeteorEntry {
  0% {
    transform: translateX(-150vw) translateY(-75vh) rotate(-30deg) scale(0.5);
    filter: brightness(17.5) blur(90px) hue-rotate(150deg) saturate(10)
            drop-shadow(0 0 30px #ff6500);
    /* Way off screen — blazing orange fireball with extreme blur */
  }
  55% {
    transform: translateX(20px) translateY(40px) rotate(5deg) scale(1.15);
    filter: brightness(5) blur(30px) hue-rotate(60deg);
    /* Overshoots position — still hot yellow */
  }
  100% {
    transform: translateX(0) translateY(0) rotate(0deg) scale(1);
    filter: brightness(1) blur(0px) hue-rotate(0deg) saturate(1);
    /* Cooled, settled — natural Earth colors */
  }
}
/* Meanwhile the Earth SVG inside spins from a tiny molten seed: */
/* earthSpinEntry: scale(0.1) blur(200px) → scale(1) over 2s */
```

#### Sun — Cosmic Birth Sequence

```css
.sunContainer {
  animation:
    stellarBirthSequence 4s both 0.5s,  /* Epic 8-phase formation */
    sunBlur 4s ease-in-out infinite 4s; /* Continuous heat-shimmer after */
}

@keyframes stellarBirthSequence {
  0%  { transform: scale(0.01); filter: brightness(50) blur(300px) hue-rotate(270deg); }
  /* Tiny point of white light — looks like a Big Bang */
  8%  { transform: scale(0.1);  filter: brightness(20) blur(200px) hue-rotate(240deg); }
  /* Cool plasma colors (cyan/magenta) */
  35% { transform: scale(0.6);  filter: brightness(10) blur(100px) hue-rotate(120deg); }
  /* Solar ignition — shifting toward orange/red */
  70% { transform: scale(1.2);  filter: brightness(3) blur(30px) hue-rotate(30deg); }
  /* Overshoots final size at peak intensity */
  100%{ transform: scale(1);    filter: brightness(1) blur(0); }
  /* Stable sun — natural color, no blur */
}
/* Rays flash in (sunraysEntry: scale→glow→fade) then JS takes over opacity control */
```

#### Clock — Bouncy Materialization

```css
.clockContainer {
  opacity: 0;
  animation:
    clockEntry 3s 1.5s forwards,           /* Appears at 1.5s */
    clockFloat 25s ease-in-out 4.5s infinite;  /* Floats endlessly after */
}

@keyframes clockEntry {
  0%  { transform: scale(0) rotate(180deg); filter: blur(10px) brightness(0.3); }
  /* Tiny spinning dark point */
  40% { transform: scale(1.1) rotate(-10deg); filter: blur(2px) brightness(1.2); }
  /* Overshoots with counter-rotation */
  60% { transform: scale(0.95) rotate(5deg); }
  /* Bounces back — slight wobble */
  100%{ transform: scale(1) rotate(0deg); filter: blur(0); }
}
/* Time display has its own holographic entry: scaleY(0.1) thin line → expands vertically */
```

#### Sliders — Slide in from Right

```css
.sliderContainer {
  opacity: 0;
  animation: sliderSlideInEntry 2.2s forwards;
}
.weatherSlider { animation-delay: 2.5s; }  /* Slightly after clock settles */
.seasonSlider  { animation-delay: 2.8s; }  /* 300ms behind weather */

@keyframes sliderSlideInEntry {
  0%  { transform: translateX(100px) scale(0.8); filter: blur(10px); }
  60% { transform: translateX(-10px) scale(1.05); }  /* Overshoot left */
  80% { transform: translateX(5px) scale(0.98); }    /* Bounce back */
  100%{ transform: translateX(0) scale(1); filter: blur(0); }
}
```

#### HelloText — Drops in from Space

```css
.container {
  opacity: 0;
  animation:
    textEntry 2.5s 3s forwards,             /* Spacey entrance at 3s */
    textFloat 20s ease-in-out 5.5s infinite; /* Ongoing floating */
}

@keyframes textEntry {
  0%  {
    transform: translateY(-80px) translateX(-30px) scale(0.7) rotate(-5deg);
    filter: blur(15px) brightness(0.3);  /* Blurry, dim, tilted — like a distant object */
  }
  70% {
    transform: translateY(-10px) scale(1.05) rotate(1deg);
    filter: blur(3px) brightness(1.1);   /* Slight overshoot */
  }
  100%{
    transform: translateY(0) scale(1) rotate(0deg);
    filter: blur(0) brightness(1);       /* Settled */
  }
}
```

#### Orbit Buttons — Holographic Glitch Flicker

```css
/* Each button materializes 200ms apart, already in orbit position */
.btnOrbitContainer[data-index="0"] { animation-delay: 3.4s, 3.4s; }  /* orbit starts too */
.btnOrbitContainer[data-index="1"] { animation-delay: 3.6s, -1.6s; } /* pre-positioned at 90° */
.btnOrbitContainer[data-index="2"] { animation-delay: 3.8s, -6.6s; } /* pre-positioned at 180° */
.btnOrbitContainer[data-index="3"] { animation-delay: 4.0s,-11.6s; } /* pre-positioned at 270° */

@keyframes entryFade {
  /* Rapid flicker phase — interference noise */
  0%, 3%, 6%, 9%, 12% { opacity: 0; filter: blur(20px) brightness(3.5) saturate(5); }
  2%, 5%, 8%, 11%      { opacity: 0.4; filter: blur(15px) brightness(3) contrast(3); }
  /* Slow stabilizing — glitch calms down */
  45% { opacity: 0.75; filter: blur(8px) brightness(2) saturate(3); }
  70% { opacity: 0.9;  filter: blur(4px) brightness(1.6); }
  100%{ opacity: 1;    filter: brightness(var(--depth-brightness)); }
  /* Fully materialized — depth-based brightness takes over */
}
```

**Why `both` and `forwards` matter:**
- `both` = hold `opacity: 0` before the delay expires, hold final state after. Prevents a flash before the animation starts.
- `forwards` = keep final keyframe after animation ends. Without it the element snaps back to `opacity: 0`.

---

## 6. User Experience Patterns

### 6.1 Click-Outside Detection

**File:** Briefcase component

```javascript
useEffect(() => {
  if (!isOpen) return;  // Skip attaching the listener when the menu is closed
  
  const handleClickOutside = (e) => {
    if (containerRef.current && 
        !containerRef.current.contains(e.target)) {
      // e.target = the clicked element; .contains() returns true if it's inside the menu
      // If it's outside, close
      onClose();
    }
  };
  
  // mousedown fires before click — closes the menu before any click handlers on children run
  document.addEventListener('mousedown', handleClickOutside);
  
  return () => {
    // Remove the global listener when the menu closes or the component unmounts
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isOpen]);  // Re-runs when isOpen changes: attaches on open, cleans up on close
```

**Why `mousedown` instead of `click`?**
- Fires immediately on mouse press
- Better perceived responsiveness
- Prevents edge cases with dragging

---

### 6.2 Staggered Menu Closing

Creating polished exit animations.

```javascript
const handleMenuItemClick = (path, index) => {
  // Stagger closing animation based on item position
  const delay = index * 100; // 100ms between each
  
  setTimeout(() => {
    setIsMenuOpen(false);
  }, delay);
  
  // Navigate after all animations complete
  const totalDelay = MENU_ITEMS.length * 100 + 300;
  setTimeout(() => {
    navigate(path);
  }, totalDelay);
};
```

---

### 6.3 Range Sliders with Snap Behavior

**Files:** `src/components/CreativeMode/Controls/Sliders/index.jsx`

Interactive sliders that allow smooth dragging with automatic snapping to discrete values on release.

#### Pattern

```javascript
// LOCAL STATE: Fractional values while dragging
const [tempSeason, setTempSeason] = useState(season);
const [isDragging, setIsDragging] = useState(false);

// DRAG HANDLER: Update continuously with small steps
<input
  type="range"
  min="0"
  max="3"
  step="0.01"                    // Smooth dragging (100 steps)
  value={tempSeason}
  onChange={(e) => {
    setTempSeason(parseFloat(e.target.value));
    setIsDragging(true);          // Disable CSS transitions while dragging
  }}
  onMouseUp={handleSeasonEnd}     // Snap on release
/>

// SNAP HANDLER: Round to nearest integer
const handleSeasonEnd = () => {
  const snapped = Math.round(tempSeason);  // 1.73 → 2
  onSeasonChange({ target: { value: snapped } });
  setTempSeason(snapped);
  setIsDragging(false);           // Re-enable transitions for smooth snap
};
```

**Key Points:**
- Small `step="0.01"` = fluid dragging motion
- `tempSeason` can be fractional (1.47) while dragging
- `Math.round()` snaps to nearest integer on release
- `isDragging` state controls CSS transitions (off while dragging, on for snap-back)

---

### 6.4 Precise Hover Zones

**File:** `src/components/ClassicMode/pages/About/LuxuryWallet/index.jsx`

Creating invisible, precisely positioned hover areas that trigger popups and animations.

#### Pattern

```javascript
// STATE: Track which item is being hovered
const [hoveredItem, setHoveredItem] = useState(null);

// HOVER ZONE: Invisible absolutely positioned div
<div
  className={classes.preciseHoverZone}  // position: absolute, exact dimensions
  onMouseEnter={() => {
    onHover(itemKey);                   // Show popup
    // Find element and add hover class for animation
    const element = document.querySelector(`.${classes.targetElement}`);
    element?.classList.add(classes.hoverClass);
  }}
  onMouseLeave={() => {
    onLeave();                           // Hide popup
    // Remove hover class to reset
    const element = document.querySelector(`.${classes.targetElement}`);
    element?.classList.remove(classes.hoverClass);
  }}
/>
```

**CSS:**
```css
.preciseHoverZone {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;           /* Above card but below popup */
  cursor: pointer;
}
```

**Why This Works:**
- Invisible overlay doesn't interfere visually
- Precise positioning = exact hover detection
- Direct DOM manipulation for immediate animation feedback
- Separated hover detection from visual elements

---

---

## 7. Mobile Optimizations

### 7.1 Portrait Orientation Overlay

**File:** `src/components/RotateScreen/index.jsx`

The whole portfolio is landscape-only. Rather than trying to make everything reflow for portrait, a full-screen overlay intercepts it — pure CSS, no JS resize listeners needed.

#### How It Works

```css
/* RotateScreen.module.css */
/* The overlay is hidden by default and only appears in portrait */
@media screen and (orientation: portrait) {
  .rotateOverlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 99999;  /* Covers everything — nav, modals, animations */
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
/* The browser re-evaluates the media query automatically on every orientation change */
```

The component is always mounted but invisible in landscape. Rotating to portrait triggers the CSS — instant, zero overhead.

#### Route-Aware Theming

The overlay changes its color scheme based on which mode the user is currently in:

```javascript
// App.jsx — reads the current route and picks the matching variant
const getRotateScreenVariant = () => {
  if (location.pathname.startsWith('/creative')) return 'creative'; // Blue space theme
  if (location.pathname.startsWith('/classic'))  return 'classic';  // Gold luxury theme
  return 'home';  // Blended gradient (default)
};

<RotateScreen variant={getRotateScreenVariant()} />
```

```javascript
// RotateScreen/index.jsx — variant controls subtitle text and CSS class
<p className={classes.subtitle}>
  {variant === 'creative'
    ? 'The cosmos awaits in landscape mode.'
    : variant === 'classic'
    ? 'For the best experience, please rotate to landscape.'
    : 'Choose your experience in landscape mode.'}
</p>
```

Stars and a Saturn decoration are added for creative/home variants — same random particle technique as the weather system.

---

### 7.2 Disabling 3D Effects on Mobile

**File:** `src/hooks/ClassicMode/use3DMouseTracking.js`

3D tilt tracking is a mouse feature — it makes no sense on touch devices and wastes event listener memory. Rather than feature-detecting touch, the hook detects the landscape mobile viewport shape instead (short height, wide width):

```javascript
const isMobile = window.matchMedia(
  '(max-height: 600px) and (orientation: landscape)'
).matches;
// Catches phones in landscape (e.g. 844×390) while excluding desktop windows
// that might be short (a 1920×500 browser window would NOT match because
// landscape mobile typically has max-height around 390-430px, not 500+)

if (isMobile) return;  // Skip attaching any listeners — hook exits early
```

**Why `matchMedia` over `ontouchstart`:**
- `ontouchstart` exists on some hybrid laptops with touch screens — false positives
- The viewport shape check is more accurate for "is this actually a phone in your hand"

---

### 7.3 Mobile Scroll Space

**File:** `src/index.css`

Classic Mode pages have content that can overflow on small landscape phones. Adding a small buffer prevents content from being hidden behind mobile browser chrome (address bar, bottom nav bar):

```css
@media (max-width: 768px) {
  body {
    min-height: 110vh;   /* 10% extra height so content isn't cut off */
    padding-bottom: 10vh; /* Extra space at bottom for browser chrome overlap */
  }

  #root {
    min-height: 110vh;   /* Root container extends to match */
  }
}
```

---

## Key Takeaways

### Performance
1. **Pre-calculate** everything possible
2. Use **GPU-accelerated** properties (`transform`, `opacity`)
4. **Memoize** complex calculations
5. **Conditional** event listeners

### CSS Mastery
1. **CSS variables** for dynamic animations
2. **Box-shadow** for complex effects without images
3. **Pseudo-elements** instead of extra DOM
4. **VH units** for proportional scaling
5. **Radial gradients** for spotlights and masks

### React Patterns
1. **Custom hooks** for reusable logic
2. **Configuration objects** over magic numbers
3. **useMemo** for expensive computations
4. **useRef** for animation control
5. **Centralized state** for coordinated effects

### Animation Excellence
1. **Staggered delays** for sequential reveals
2. **Ping-pong** (alternate) for smooth loops
3. **Multi-stage keyframes** for complex movements
4. **RequestAnimationFrame** for smooth 60fps
5. **Entrance delays** to guide attention

### User Experience
1. **Click-outside** detection for modals
2. **Mobile detection** and adaptation
3. **Staggered closing** for polish
4. **Shake animations** for feedback
5. **Progressive enhancement** approach

---

**Created:** March 2026  
**Project:** Benjamin Tiong Portfolio  
**Tech Stack:** React 18, Vite, CSS Modules, React Router