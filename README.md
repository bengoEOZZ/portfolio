# Benjamin Tiong - Portfolio Website

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: CSS Modules
- **Assets**: SVG icons and images
- **Responsive Design**: Desktop & Mobile (landscape) optimized

## Credits

**./assets/CreativeMode/clock.png**
- Clock design based on Genshin Impact © miHoYo/HoYoverse | Modified/shared by susanoo-sama

**./assets/ClassicMode/hollowKnightEmblem.png**
- Icon from Hollow Knight © Team Cherry

**./assets/ClassicMode/dustinessEmblem.png**
- Emblem from Konosuba Anime © Natsume Akatsuki/KADOKAWA

**Company Logos & Brand Assets**
- All company logos and brand assets are property of their respective owners and are used for identification purposes only

---

# Technical Documentation

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture & Component Structure](#architecture--component-structure)
- [Interactive Features Overview](#interactive-features-overview)
- [Development Achievements](#development-achievements)

---

## Project Overview

**Portfolio Application** is a modern frontend React application project I built as a Single Page Application (SPA) that transforms the traditional portfolio concept into an interactive digital experience. The project runs entirely in the browser using client-side JavaScript, with no backend server required. This comprehensive showcase demonstrates my modern React development expertise through advanced component architecture, custom complex mathematical hook animations, and performance optimizations- all wrapped in extensive technical documentation. 

**Landing Page** provides a split-screen dual-mode selection interface with contrasting themes - a professional gray gradient on the left leading to Classic mode, and a celestial blue gradient on the right leading to Creative mode.

**Classic Mode** is a luxury-themed professional portfolio featuring Louis Vuitton-inspired aesthetics, interactive 3D elements, and elegant page transitions. This mode provides straightforward navigation, allowing users to easily explore my professional skills and experience.

**CreativeMode** is an immersive, interactive celestial-themed portfolio experience that showcases my creativity, innovation, and technical expertise through a creative planetary system interface. This mode was made to invite users to explore and discover my skills in an interactive, engaging, and hands-on experience.

### Core Philosophy
- **Interactive Experience**: Invites exploration and encourages hands-on discovery
- **Technical Excellence**: Demonstrates advanced React patterns and CSS mastery
- **Creative Innovation**: Pushes boundaries with artistic expression and experimentation
- **Professional Showcase**: Balances creativity with technical competence
- **Dual Approach**: Offers both creative and professional presentation modes
- **Mobile Responsive**: Optimized performance for mobile landscape orientation with adaptive layouts

---

## Architecture & Component Structure

### Modular Component Hierarchy
```
Portfolio Application/
├── App.jsx                     # Root routing component
├── App.module.css              # Split-screen landing page styles
├── main.jsx                    # Application entry point
├── index.css                   # Global styles
├── components/
│   ├── Home/                   # Landing page components
│   │   ├── ButtonClassic/      # Professional mode navigation button
│   │   ├── ButtonCreative/     # Creative mode navigation button
│   │   └── CodeRemarks/        # Animated code snippets (shared)
│   ├── ClassicMode/            # Professional portfolio mode
│   │   ├── index.jsx           # Main orchestrator with page transitions
│   │   ├── ClassicMode.module.css
│   │   ├── HelloText/          # Hero introduction section
│   │   ├── NavigationBar/      # Header with logo and briefcase menu
│   │   ├── NavigationBelt/     # Luxury leather belt navigation system
│   │   ├── LuxuryButton/       # Reusable golden button component
│   │   ├── SophisticatedBackground/ # Mathematical flowing curves
│   │   ├── Sparkle/            # Reusable sparkle effect component
│   │   └── pages/              # Page components
│   │       ├── PageHeader/     # Shared page header component
│   │       ├── About/          # About page with wallet interaction
│   │       │   ├── LuxuryWallet/ # Interactive wallet with credential cards
│   │       │   ├── CredentialsCard/ # Company/education cards
│   │       │   └── GymCard/    # Fitness philosophy flip card
│   │       ├── Projects/       # Projects showcase with document stack
│   │       │   ├── ProjectDocument/ # Individual project cards
│   │       │   └── DemoPopup/  # Project demo GIF viewer
│   │       ├── Contact/        # Contact page with 3D flip card
│   │       │   ├── IDCard/     # Front of ID card
│   │       │   └── IDCardBack/ # Back with contact details
│   │       └── Coding/         # Technical skills page (in development)
│   └── CreativeMode/           # Interactive celestial experience
│       ├── index.jsx           # Main orchestrator component
│       ├── CreativeMode.module.css # Core styling with starfield effects
│       ├── HelloText/          # Portfolio introduction section
│       ├── NavigationBar/      # Header navigation
│       ├── NavigationButtons/  # Orbital navigation system
│       │   └── useOrbitAnimation.jsx (redacted) # Old custom orbit animation hook
│       ├── CodeRemarks/        # Floating philosophical code snippets
│       ├── WeatherEffects/     # Dynamic atmospheric effects
│       ├── Controls/           # User interaction panel
│       │   ├── Clock/          # Time manipulation interface
│       │   │   └── useClockHandRotation.jsx # Clock interaction hook
│       │   └── Sliders/        # Season/weather controls
│       └── CelestialObjects/   # Interactive planetary system
│           ├── index.jsx       # State management & coordination
│           ├── Earth/          # Earth with seasonal overlays
│           ├── Moon/           # Day/night moon transitions
│           ├── Sun/            # Sun with animated rays
│           │   └── useSunRaysAnimation.jsx # Ray animation hook
│           └── OtherPlanets/   # Mercury, Venus, outer planets
├── hooks/                      # Custom React hooks
│   └── ClassicMode/            # Classic mode hooks
│       ├── use3DMouseTracking.js   # 3D card tilt effect
│       └── usePageTransition.js    # Page transition coordination
└── assets/                     # Static assets
    ├── ClassicMode/            # Classic mode assets
    │   ├── dumbell.png         # Gym card icon
    │   ├── dustinessEmblem.png # Coding emblem
    │   ├── emailIcon.png       # Email contact icon
    │   ├── githubIcon.png      # GitHub contact icon
    │   ├── LinkedInIcon.png    # LinkedIn contact icon
    │   ├── hollowKnightEmblem.png # Philosophy card icon
    │   ├── manulifeLogo.png    # Manulife credential card logo
    │   ├── monerisLogo.png     # Moneris credential card logo
    │   ├── queensLogo.png      # Queens University credential card logo
    │   └── gifs/               # Project demo GIFs
    │       ├── QBNB.gif        # QB&B housing platform demo
    │       ├── QBUZZ.gif       # QBUZZ trivia game demo
    │       ├── glowstickGuy.gif # Portfolio project demo
    │       └── StressfulEscape.gif # Game project demo
    └── CreativeMode/           # Celestial-themed assets
        ├── clock.png
        ├── clockhand.png
        ├── earth.svg
        ├── earthFall.svg
        ├── earthWinter.svg
        ├── sun.svg
        ├── mercury.svg
        ├── venus.svg
        ├── BenMoonDay.svg
        ├── BenMoonNight.svg
        └── stardust.png
```

---

## Interactive Features Overview

### **ClassicMode Interactive Features**

#### **Navigation Systems**
- **Luxury Belt Navigation**: Louis Vuitton-inspired leather belt with golden buckle and navigation cards
- **Briefcase Menu**: Slide-down navigation panel with animation and navigation
- **Page Transitions**: Coordinated fade-out animations with 1.5s delay for smooth transitions
- **Navigation Buttons**: Golden luxury buttons with shimmer effects and page navigation

#### **Interactive 3D Elements**
- **Luxury Wallet**: Opens to reveal credential cards with 3D tilt effect and hover interactions
- **Credential Cards**: Company/education cards with popup information display (Queens, Moneris, Manulife)
- **Contact ID Card**: 3D flip card with mouse-tracking tilt effect responding to cursor position
- **Gym Card**: Fitness philosophy card with flip animation

#### **Project Showcase System**
- **Document Stack**: Interactive project cards with stacked display and flip-through functionality
- **Fan-Out Mode**: Toggle between stacked and fanned display with staggered animations
- **Demo Popup**: Modal viewer displaying project GIF demonstrations
- **Live Navigation**: Previous/next buttons with current position indicator

#### **Visual Effects & Animations**
- **Golden Shimmer**: Text highlights with animated shimmer sweeps and sparkle particles
- **Mathematical Background**: Flowing curves with dynamic wave animations
- **Entrance Animations**: Coordinated page element animations with staggered timing
- **Hover Effects**: Golden glow, scale transforms, and depth effects on interactive elements

### **CreativeMode Interactive Features**

#### **Navigation & Interface Elements**
- **Orbital Navigation Buttons**: Portfolio section links with custom orbit animations
- **Floating Code Remarks**: Philosophical JavaScript snippets with twinkle and drift animations
- **Personal Introduction**: Hello World text with interactive guidance for controls

#### **Real-Time Clock System**
- Hold-and-release analog clock hand for time manipulation
- Mathematical time calculations with 24-hour display conversion
- Continuous rotation support with proper time wrapping

#### **Dynamic Seasonal/Weather Sliders**
- **Seasonal System**: 4-position slider (Spring/Summer/Fall/Winter) with auto-detection based on current date
- **Weather Override**: 5-position system (Season/Clear/Rainy/Windy/Cloudy) for manual control
- **Smart Switching**: Control modes automatically switch based on user interaction

#### **Advanced Weather Particle System**
- **Weather-Responsive Particles**: 100+ elements including rain, snow, wind, clouds, and fireflies
- **Night-Exclusive Effects**: Exclusive firefly displays that activate during night hours (21:00-02:59)
- **Seasonal Particle Modes**: Unique particle combinations for each season's distinctive weather patterns

#### **Celestial Object Interactions**
- **Moon Day/Night Cycling**: Smooth moon avatar transitions between day and night representations
- **Seasonal Overlays**: Dynamic Earth variants (orange-brown fall overlay, pale white snow overlay)
- **Sun Ray Animation**: Dynamic ray movements that have different intensities based on time period
- **Atmospheric Earth Glow Effect**: Dynamic color aura glow effects emitting off Earth's atmosphere

---

## Development Achievements

### Code Documentation Excellence
- **2000+ lines** of extensive technical documentation across both modes
- **Comprehensive component headers** with JSDoc-style architecture explanations
- **Inline documentation** for complex logic and mathematical operations
- **Consistent documentation patterns** across all components

### Component Architecture Mastery
- **Dual-Mode Architecture**: Two complete portfolio experiences (Classic & Creative) with distinct feature sets
- **30+ Modular Components**: Clean, reusable component hierarchy with clear separation of concerns
- **5+ Custom React Hooks**: Advanced math-based hooks for animations and interactions
  - `usePageTransition` - Coordinated page transition state management
  - `use3DMouseTracking` - Real-time 3D card tilt calculations
  - `useClockHandRotation` - Complex clock hand dragging with time conversion
  - `useSunRaysAnimation` - Dynamic sun ray rotation with time-based intensity
  - `useOrbitAnimation` - Mathematical orbital path calculations (redacted)
- **Shared Component Library**: Reusable components (Sparkle, PageHeader, LuxuryButton, CodeRemarks)
- **State Management**: Clean coordination between multiple interactive systems without external libraries
- **Performance Optimization**: React.memo, useMemo, useCallback, pre-rendered arrays, GPU acceleration with will-change

### Advanced Animation & CSS Creativity

**CreativeMode Animations:**
- **Complex Particle Systems**: 100+ animated elements with realistic physics simulations
- **Dynamic Weather Simulations**: Seasonal-specific animations with particle variety
- **Time-Responsive Visual Effects**: Smooth celestial transitions with adaptive changes
- **Mathematical Animations**: Trigonometric calculations for orbital and rotational effects
- **Mobile Optimizations**: Static positioning for navigation buttons with floating animations on mobile

**ClassicMode Animations:**
- **3D Interactive Elements**: Mouse-tracking tilt effects and flip card animations
- **Luxury Visual Effects**: Golden shimmer sweeps, sparkle particles, and glow effects
- **Mathematical Background**: Flowing curves with dynamic wave animations
- **Coordinated Transitions**: State-based entrance/exit animations with onAnimationEnd cleanup
- **Mobile Performance**: Disabled intensive animations (sparkles, shimmer, pulse effects) for mobile devices

**Shared Animation Techniques:**
- **Keyframe Animations**: Sophisticated CSS animations
- **GPU Acceleration**: Transform and opacity animations with will-change hints
- **Interactive Visual Feedback**: Real-time animations responding to user interactions
- **Performance-Optimized**: Hardware-accelerated effects ensuring 60fps smooth experience
- **Responsive Scaling**: Adaptive sizing and layout adjustments for mobile landscape view

### Mobile Optimization & Responsive Design
- **Landscape-Optimized Layout**: Custom media queries targeting mobile landscape orientation (@media max-height: 600px)
- **Performance Tuning**: Animation disabling for CPU-intensive effects on mobile devices
- **Adaptive Scaling**: Dynamic component sizing using viewport units (vw/vh) and rem for fluid responsiveness
- **Touch-Friendly Controls**: Increased button sizes and simplified interactions for mobile interfaces
- **Visual Simplification**: Reduced visual complexity (shadows, filters, text-shadows) for better mobile rendering

### Project Organization
- **Modular File Structure**: Clear hierarchy with components, hooks, and assets folders
- **Mode-Specific Organization**: Separate folders for ClassicMode and CreativeMode features
- **Asset Management**: Organized directory structure with categorized assets (GIFs, icons, logos, SVGs)
- **Component Naming**: Consistent naming conventions supporting scalability
- **CSS Modules**: Component-Scoped styling
