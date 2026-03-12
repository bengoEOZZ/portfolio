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
7. [State Management Patterns](#7-state-management-patterns)

---

## 1. Custom React Hooks

### 1.1 3D Mouse Tracking Hook

**File:** `src/hooks/ClassicMode/use3DMouseTracking.js`

Creates realistic 3D tilt effects that follow mouse movement on cards, images, and interactive elements.

#### Core Math

```
mouseX = (e.clientX - centerX) / rect.width * intensity

1. (e.clientX - centerX) → Mouse distance from element center (pixels)
2. / rect.width           → Normalize to -0.5 to +0.5 range
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
  const [transitioning, setTransitioning] = useState(false);  // Is transition happening?
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
// = 1 / (1000 / 16.67) = 1 / 60 = 0.0167 per frame
// Over 60 frames: 0 → 0.0167 → 0.0334 → ... → 1.0 (then reverses)
```

#### Smart DOM Caching

**Problem:** 400+ SVG polygons need to be found and animated. Querying the DOM every frame is slow.
**Solution:** Query once, cache references in a `useRef`, reuse forever.

```javascript
const polygonCacheRef = useRef({});
// Cache structure: { 'MORNING': { ray1: [<polygon>, ...], ray2: [...] }, ... }

const getPolygonCache = (timePeriod) => {
  if (!polygonCacheRef.current[timePeriod]) {
    polygonCacheRef.current[timePeriod] = {};
    const patterns = PRECOMPUTED_PATTERNS[timePeriod];

    Object.keys(patterns).forEach(rayKey => {
      const rayNum = rayKey.replace('ray', '');  // 'ray1' → '1'
      const indices = patterns[rayKey];           // e.g., [1, 2, 3, 4]

      // Find each polygon in the DOM, filter out any that don't exist
      polygonCacheRef.current[timePeriod][rayKey] = indices
        .map(i => document.querySelector(`polygon[id="ray${rayNum}-${i}"]`))
        .filter(Boolean);  // Remove nulls (elements that weren't found)
    });
  }
  return polygonCacheRef.current[timePeriod];
  // Second call with same timePeriod skips all DOM queries - instant!
};

// Performance: First call = 323 querySelector calls (one-time)
// Subsequent calls = just return cached array (instant, 0 DOM queries)
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

    activeAnimations++;
  });

  if (activeAnimations > 0) {
    rafRef.current = requestAnimationFrame(updateAnimations);
  }
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
const [rotation, setRotation] = useState(0);  // Current angle in degrees
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
/* CSS CUSTOM PROPERTIES (Houdini API) */
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
- CSS Houdini `@property` enables animating custom properties
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
const frameTime = 1000 / 60;  // Target 60 FPS

function animate(currentTime) {
  if (currentTime - lastTime < frameTime) {
    requestAnimationFrame(animate);
    return;  // Skip frame if too soon
  }
  lastTime = currentTime;
  updatePositions();
  requestAnimationFrame(animate);
}
```

Syncs with browser refresh rate, prevents wasted CPU cycles.

---

### 3.5 Debouncing Resize Events

Only recalculate after user **stops** resizing (not on every pixel).

```javascript
useEffect(() => {
  let timeoutId;

  const handleResize = () => {
    clearTimeout(timeoutId);  // Cancel previous timer
    timeoutId = setTimeout(() => {
      recalculateLayout();    // Runs 250ms after LAST resize event
    }, 250);
  };

  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(timeoutId);
  };
}, []);
```

**How it works:** Each resize event resets the 250ms timer. Only when resizing stops does the timer expire and trigger the recalculation. Result: 1 recalculation instead of 120.

**Common durations:** 50-100ms (autocomplete), 150-250ms (resize/scroll), 500-1000ms (API calls)

---

## 4. Component Architecture

### 4.1 Configuration Objects Pattern

**File:** Multiple hooks

Centralizing magic numbers and configuration for maintainability.

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
  // Use CONFIG.ROTATION_SPEED instead of magic 0.01
  const speed = CONFIG.ROTATION_SPEED;
  // ...
}
```

**Benefits:**
- ✅ Single source of truth
- ✅ Easy to adjust all related values
- ✅ Self-documenting code
- ✅ Enables A/B testing

---

### 4.2 Icon Component Mapping

**File:** `src/components/ClassicMode/NavigationBar/Briefcase/index.jsx`

```javascript
const ICON_COMPONENTS = {
  wallet: (
    <div className={classes.wallet}>
      <div className={classes.walletBack}></div>
      <div className={classes.walletFlap}></div>
      <div className={classes.walletClasp}></div>
    </div>
  ),
  cardDeck: (
    <div className={classes.cardDeck}>
      <div className={classes.card}></div>
      <div className={classes.card}></div>
      <div className={classes.card}></div>
    </div>
  ),
  // ...
};

// Usage
const icon = ICON_COMPONENTS[menuItem.icon];
```

**Pattern Benefits:**
- Clean separation of data and presentation
- Easy to add new icons
- Type-safe with TypeScript
- Reusable icon library

---

### 4.3 Menu Items Configuration

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

### 4.4 Reusable Sparkle Component

**File:** `src/components/ClassicMode/Sparkle/index.jsx`

```javascript
const Sparkle = ({ 
  style = {}, 
  animationDelay = '0s', 
  duration = '3s' 
}) => {
  return (
    <div 
      className={classes.sparkle}
      style={{
        ...style,
        '--delay': animationDelay,
        '--duration': duration
      }}
    />
  );
};
```

**Usage:**

```javascript
<Sparkle 
  style={{ top: '10%', left: '20%' }}
  animationDelay="0.5s"
  duration="2s"
/>
```

---

### 4.5 Philosophical Code Remarks Pattern

**File:** `src/components/Home/CodeRemarks/index.jsx`

Expressing ideas through code syntax—creative and educational.

```javascript
const remarks = [
  'if (user.isCurious) { explore(); }',
  'try { learn(); } catch (failure) { grow(); }',
  'if (world.needsChange) { buildSolution(); }',
  'do { expandPerspective(); } while (truth.isVast);',
  'for (idea in ideas) { innovate(idea); }'
];
```

**Creative Applications:**
- Loading states: `while (loading) { displaySpinner(); }`
- Error messages: `throw new Error('User too awesome!')`
- About sections: `const skills = ['React', 'Node', 'CSS'];`

---

## 5. SVG & Visual Effects

### 5.1 Dynamic SVG Path Generation

**File:** `src/components/ClassicMode/LuxuryBackground/index.jsx`

Creating animated backgrounds with real-time calculated SVG paths.

```javascript
<svg width="100%" height="100%" viewBox="-200 0 1800 700">
  <defs>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="rgba(191, 168, 80, 0)" />
      <stop offset="50%" stopColor="rgba(191, 168, 80, 0.4)" />
      <stop offset="100%" stopColor="rgba(191, 168, 80, 0)" />
    </linearGradient>
  </defs>
  
  <path
    d={calculatePath(time)}
    fill="none"
    stroke="url(#goldGradient)"
    strokeWidth="2"
  />
</svg>
```

**Path Calculation:**

```javascript
const calculatePath = (time) => {
  const points = [];
  for (let x = 0; x < width; x += 10) {
    const y = Math.sin((x + time) * 0.01) * amplitude;
    points.push(`${x},${y}`);
  }
  return `M ${points.join(' L ')}`;
};
```

---

### 5.2 SVG Gradient Patterns

```svg
<defs>
  <!-- Radial gradient for glows -->
  <radialGradient id="glow">
    <stop offset="0%" stopColor="rgba(255, 215, 0, 1)" />
    <stop offset="100%" stopColor="rgba(255, 215, 0, 0)" />
  </radialGradient>
  
  <!-- Multi-stop for complex effects -->
  <linearGradient id="sunset" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stopColor="#ff6b6b" />
    <stop offset="50%" stopColor="#ffd93d" />
    <stop offset="100%" stopColor="#6bcf7f" />
  </linearGradient>
</defs>
```

---

### 5.3 Weather Particle Systems

**File:** `src/components/CreativeMode/WeatherEffects/index.jsx`

Generating hundreds of particles efficiently.

```javascript
const generateSnowflakes = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * -20,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2
  }));
};

const snowflakes = useMemo(() => 
  generateSnowflakes(100), 
  []
);

return (
  <div className={classes.particleContainer}>
    {snowflakes.map(flake => (
      <div
        key={flake.id}
        className={classes.snowflake}
        style={{
          left: `${flake.x}%`,
          '--size': `${flake.size}px`,
          '--delay': `${flake.delay}s`,
          '--duration': `${flake.duration}s`
        }}
      />
    ))}
  </div>
);
```

---

## 6. User Experience Patterns

### 6.1 Click-Outside Detection

**File:** Briefcase component

```javascript
useEffect(() => {
  if (!isOpen) return;
  
  const handleClickOutside = (e) => {
    if (containerRef.current && 
        !containerRef.current.contains(e.target)) {
      onClose();
    }
  };
  
  // Use mousedown, not click (fires earlier)
  document.addEventListener('mousedown', handleClickOutside);
  
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isOpen]);
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

### 6.3 Mobile Detection and Adaptation

**File:** `use3DMouseTracking.js`

```javascript
const isMobile = window.matchMedia(
  '(max-height: 600px) and (orientation: landscape)'
).matches;

if (isMobile) {
  // Disable 3D effects
  return;
}
```

**Other Detection Patterns:**

```javascript
// Touch device
const isTouchDevice = 'ontouchstart' in window;

// Reduced motion preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Dark mode
const prefersDark = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches;
```

---

### 6.4 Shake Animation on Interaction

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.briefcase:active {
  animation: shake 0.6s ease-in-out;
}
```

---

### 6.5 Entrance Delay Strategy

Preventing sensory overload on page load.

```javascript
const ENTRANCE_DELAYS = {
  background: 0,
  mainContent: 500,
  navigation: 1000,
  weatherEffects: 3000,
  sparkles: 2000
};

// In CSS
.weatherEffects {
  animation: fadeIn 0.5s ease-in 3s forwards;
}
```

---

### 6.6 Range Sliders with Snap Behavior

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

### 6.7 Precise Hover Zones

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

### 6.8 Modal Popup with Backdrop Frames

**File:** `src/components/ClassicMode/pages/Projects/DemoPopup/index.jsx`

Full-screen modal popup with layered decorative frames and smooth animations.

#### Pattern

```javascript
// STATE MANAGEMENT
const [isOpen, setIsOpen] = useState(false);
const [isClosing, setIsClosing] = useState(false);

// CLOSE WITH ANIMATION
const handleClose = () => {
  setIsClosing(true);                    // Trigger exit animation
  setTimeout(() => {
    setIsOpen(false);                    // Remove from DOM
    setIsClosing(false);                 // Reset state
  }, 300);                               // Match CSS animation duration
};

// RENDER
{isOpen && (
  <div 
    className={`${classes.overlay} ${isClosing ? classes.closing : ''}`}
    onClick={handleClose}                // Click outside to close
  >
    <div 
      className={classes.content}
      onClick={(e) => e.stopPropagation()} // Prevent close when clicking content
    >
      {/* Decorative backdrop frames */}
      <div className={classes.backdropFrame}></div>
      <div className={classes.backdropFrame}></div>
      <div className={classes.backdropFrame}></div>
      
      {/* Actual content */}
      <img src={demoGif} />
      <button onClick={handleClose}>×</button>
    </div>
  </div>
)}
```

**CSS:**
```css
.overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(ellipse, rgba(0,0,0,0.8), rgba(0,0,0,0.95));
  backdrop-filter: blur(15px);
  animation: fadeIn 0.3s ease-out;
}

.overlay.closing {
  animation: fadeOut 0.3s ease-out;
}

.content {
  animation: slideUp 0.3s ease-out;
}

.closing .content {
  animation: slideDown 0.3s ease-out;
}
```

---

### 6.9 3D Card Flip

**File:** `src/components/ClassicMode/pages/Contact/index.jsx`

Interactive card that flips on click to reveal back side, with 3D mouse tracking on both faces.

#### Pattern

```javascript
// FLIP STATE
const [isFlipped, setIsFlipped] = useState(false);

// 3D TRACKING WITH FLIP
use3DMouseTracking(
  cardRef,
  {
    intensity: 15,
    baseTransform: isFlipped ? 'rotateY(180deg)' : '',  // Maintain flip while tracking
  },
  [isFlipped]  // Re-initialize when flip changes
);

// FLIP HANDLER
const handleFlip = () => setIsFlipped(!isFlipped);

// RENDER
<div className={`${classes.card} ${isFlipped ? classes.flipped : ''}`} ref={cardRef}>
  {/* Front face */}
  <div className={classes.cardFront}>
    <div className={classes.flipIndicator} onClick={handleFlip}></div>
    <IDCard />
  </div>
  
  {/* Back face (rotated 180deg in CSS) */}
  <div className={classes.cardBack}>
    <div className={classes.flipIndicator} onClick={handleFlip}></div>
    <IDCardBack />
  </div>
</div>
```

**CSS:**
```css
.card {
  position: relative;
  transform-style: preserve-3d;    /* Enable 3D space */
  transition: transform 0.6s;
}

.card.flipped {
  transform: rotateY(180deg);      /* Flip 180° on Y-axis */
}

.cardFront, .cardBack {
  position: absolute;
  backface-visibility: hidden;     /* Hide back when facing away */
}

.cardBack {
  transform: rotateY(180deg);      /* Pre-rotate back face */
}
```

**Key Points:**
- `preserve-3d` enables 3D transforms
- `backface-visibility: hidden` prevents see-through effect
- Back face pre-rotated 180° so it appears correct when card flips
- 3D mouse tracking works on both sides using `baseTransform`

---

## 7. State Management Patterns

### 7.1 Centralized Transition State

```javascript
// Parent component
const { isExiting, startTransition } = usePageTransition();

// Pass down to all children
<NavigationBar 
  isExiting={isExiting}
  onNavigate={(path) => startTransition(() => navigate(path))}
/>
<Content isExiting={isExiting} />
<Footer isExiting={isExiting} />
```

---

### 7.2 Ref-Based Animation Control

```javascript
const animationRef = useRef(null);

const startAnimation = () => {
  // Cancel any existing animation
  if (animationRef.current) {
    cancelAnimationFrame(animationRef.current);
  }
  
  // Start new animation
  const animate = () => {
    updateFrame();
    animationRef.current = requestAnimationFrame(animate);
  };
  
  animationRef.current = requestAnimationFrame(animate);
};

const stopAnimation = () => {
  if (animationRef.current) {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
  }
};
```

---

### 7.3 Boolean State Composition

```javascript
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isShaking, setIsShaking] = useState(false);
const [isClosing, setIsClosing] = useState(false);

// Computed class names
const className = classNames({
  [classes.briefcase]: true,
  [classes.open]: isMenuOpen,
  [classes.shaking]: isShaking,
  [classes.closing]: isClosing
});
```

---

## Key Takeaways

### Performance
1. **Pre-calculate** everything possible
2. Use **GPU-accelerated** properties (`transform`, `opacity`)
3. **Debounce** expensive operations
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

## Further Learning

**React Performance:**
- React DevTools Profiler
- React.memo() for component memoization
- useCallback() for function memoization

**CSS Animations:**
- Cubic-bezier easing functions
- Will-change property for optimization
- Intersection Observer for scroll animations

**Advanced Patterns:**
- Compound components
- Render props pattern
- Higher-order components

---

**Created:** March 2026  
**Project:** Benjamin Tiong Portfolio  
**Tech Stack:** React 18, Vite, CSS Modules, React Router
