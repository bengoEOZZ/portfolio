/**
 * APP.JSX - ROOT APPLICATION COMPONENT
 * ====================================
 * 
 * This is the main entry point and routing controller for the portfolio application.
 * It provides a landing page where users can choose between different portfolio viewing modes
 * and handles navigation between these modes using React Router.
 * 
 * Key Features:
 * - Mode selection landing page with split-screen design
 * - React Router integration for navigation
 * - Creative Mode: Interactive celestial-themed portfolio layout
 * - Classic Mode: Traditional professional portfolio layout
 */

// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import classes from './App.module.css';
import CreativeMode from './components/CreativeMode';
import ButtonClassic from './components/Home/ButtonClassic';
import ButtonCreative from './components/Home/ButtonCreative';

/**
 * APP COMPONENT
 * =============
 * Root application component that displays and manages routing and mode selection interface
 */
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div className={classes.body}>
                        <h1 className={classes.header}> Choose Your Mode</h1>
                        <div className={classes.buttons}>
                            <ButtonClassic to="/classic">Classic</ButtonClassic>
                            <ButtonCreative to="/creative">Creative</ButtonCreative>
                        </div>
                    </div>
                } />
                <Route path="/creative" element={<CreativeMode />} />
                <Route path="/classic" element={<div>Classic Mode Coming Soon</div>} />
            </Routes>
        </Router>
    );
}

export default App;