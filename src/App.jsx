import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import classes from './App.module.css';
import CreativeMode from './CreativeMode';
import ButtonClassic from './components/ButtonClassic';
import ButtonCreative from './components/ButtonCreative';

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