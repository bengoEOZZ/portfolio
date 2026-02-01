/**
 * APP.JSX - ROOT APPLICATION COMPONENT
 * ====================================
 * This is the main entry point and routing controller for the portfolio application.
 * It provides a landing page where users can choose between different portfolio viewing modes
 * and handles navigation between these modes using React Router.
 * 
 * Key Features:
 * -------------
 * - Mode selection landing page with split-screen design
 * - React Router integration for navigation
 * - Creative Mode: Interactive celestial-themed portfolio layout
 * - Classic Mode: Traditional professional portfolio layout
 */

// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import classes from './App.module.css';
import CreativeMode from './components/CreativeMode';
import ClassicMode from './components/ClassicMode';
import About from './components/ClassicMode/pages/About';
import Coding from './components/ClassicMode/pages/Coding';
import Projects from './components/ClassicMode/pages/Projects';
import Contact from './components/ClassicMode/pages/Contact';
import ButtonClassic from './components/Home/ButtonClassic';
import ButtonCreative from './components/Home/ButtonCreative';
import CodeRemarks from './components/Home/CodeRemarks';
import HomeClassicBackground from './components/Home/HomeClassicBackground';
import HomeCreativeBackground from './components/Home/HomeCreativeBackground';
import RotateScreen from './components/RotateScreen';

/**
 * APP COMPONENT
 * =============
 * Root application component that displays and manages routing and mode selection interface
 */
function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

/**
 * APP CONTENT COMPONENT
 * =====================
 * Inner component that handles RotateScreen variant selection
 */
function AppContent() {
    const location = useLocation();
    
    // Determine the RotateScreen variant based on current route
    const getRotateScreenVariant = () => {
        if (location.pathname.startsWith('/creative')) return 'creative';
        if (location.pathname.startsWith('/classic')) return 'classic';
        return 'home'; // Default for home page
    };

    return (
        <>
            {/* Portrait orientation overlay - variant changes based on route */}
            <RotateScreen variant={getRotateScreenVariant()} />
            
            <Routes>
                <Route path="/" element={
                    <div className={classes.body}>
                        {/* ========== CLASSIC SIDE BACKGROUND ========== */}
                        <HomeClassicBackground />
                        
                        {/* ========== CREATIVE SIDE BACKGROUND ========== */}
                        <HomeCreativeBackground />
                        
                        {/* ========== CENTER PORTAL DIVIDER ========== */}
                        <div className={classes.centerDivider}></div>
                        {/* Center Portal Vortex */}
                        <div className={classes.portalVortex}>
                            <div className={classes.portalRing}></div>
                            <div className={classes.portalRing}></div>
                            <div className={classes.portalRing}></div>
                            <div className={classes.portalRing}></div>
                            <div className={classes.portalCore}></div>
                        </div>
                        
                        {/* ========== MAIN CONTENT ========== */}
                        <h1 className={classes.header}>benjamin-tiong.dev</h1>
                        <div className={classes.buttons}>
                            <ButtonClassic to="/classic">Classic</ButtonClassic>
                            <div className={classes.creativeContainer}>
                                <ButtonCreative to="/creative">Creative</ButtonCreative>
                                <p className={classes.epilepsyWarning}>*EPILEPSY WARNING*</p>
                            </div>
                        </div>
                        <CodeRemarks />
                    </div>
                } />
                <Route path="/creative" element={<CreativeMode />} />
                <Route path="/creative/*" element={<Navigate to="/creative" replace />} />
                <Route path="/classic" element={<ClassicMode />}>
                    <Route path="about" element={<About />} />
                    <Route path="coding" element={<Coding />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<Navigate to="/classic" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}

export default App;