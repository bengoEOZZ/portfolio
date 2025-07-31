import {useState} from 'react';
import WeatherEffects from './WeatherEffects'; // This will import from ./WeatherEffects/index.jsx
import Controls from './Controls'; // This will import from ./Controls/index.jsx
import PlanetaryBodies from './PlanetaryBodies'; // This will import from ./PlanetaryBodies/index.jsx
import useClockHandRotation from './useClockHandRotation'; // Updated to correct path

function CelestialObjects() {
    
    const { rotation, handleMouseDown, handleMouseUp } = useClockHandRotation();

    // Calculate initial season based on current date
    const getCurrentSeason = () => {
        const now = new Date();
        const month = now.getMonth(); // 0-11 (January = 0, December = 11)
        
        if (month >= 2 && month <= 4) return 0; // Spring: March (2), April (3), May (4)
        if (month >= 5 && month <= 7) return 1; // Summer: June (5), July (6), August (7)
        if (month >= 8 && month <= 10) return 2; // Fall: September (8), October (9), November (10)
        return 3; // Winter: December (11), January (0), February (1)
    };

    const [season, setSeason] = useState(getCurrentSeason());
    const handleSeasonChange = (e) => {
        setSeason(parseInt(e.target.value));
        setActiveControl('season');
    };

    const [weather, setWeather] = useState(0);
    const handleWeatherChange = (e) => {
        setWeather(parseInt(e.target.value));
        setActiveControl('weather');
    };

    const [activeControl, setActiveControl] = useState('season');

    const currentHour = ((12 + Math.floor((rotation % 360) / 15)) % 24);
    const isNightTime = (currentHour >= 21 || currentHour < 3);
    
    return (
        <div>
            <WeatherEffects 
                season={season}
                weather={weather}
                activeControl={activeControl}
                isNightTime={isNightTime}
            />

            <Controls 
                rotation={rotation}
                season={season}
                weather={weather}
                onSeasonChange={handleSeasonChange}
                onWeatherChange={handleWeatherChange}
            />

            {/* Remove SeasonalEarth component and pass props to PlanetaryBodies */}
            <PlanetaryBodies 
                currentHour={currentHour}
                isNightTime={isNightTime}
                rotation={rotation}
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                season={season}
                activeControl={activeControl}
            />
        </div>
    );
}

export default CelestialObjects;