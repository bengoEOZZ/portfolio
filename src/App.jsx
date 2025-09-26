/**
 * APP.JSX - ROOT APPLICATION COMPONENT
 * ====================================
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
import ClassicMode from './components/ClassicMode';
import About from './components/ClassicMode/pages/About';
import Coding from './components/ClassicMode/pages/Coding';
import Projects from './components/ClassicMode/pages/Projects';
import Contact from './components/ClassicMode/pages/Contact';
import ButtonClassic from './components/Home/ButtonClassic';
import ButtonCreative from './components/Home/ButtonCreative';
import CodeRemarks from './components/Home/CodeRemarks';

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
                        <CodeRemarks />
                    </div>
                } />
                <Route path="/creative" element={<CreativeMode />} />
                <Route path="/classic" element={<ClassicMode />}>
                    <Route path="about" element={<About />} />
                    <Route path="coding" element={<Coding />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="contact" element={<Contact />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;