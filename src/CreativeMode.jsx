import classes from './CreativeMode.module.css'
import HelloText from './components/HelloText'
import NavigationButtons from './components/NavigationButtons'
import CodeRemarks from './components/CodeRemarks'
import CelestialObjects from './components/CelestialObjects'

function CreativeMode() {
    return (
        <div className={classes.body}>
            <div className={classes.container}>
                <CelestialObjects />
                {/*<HelloText />
                <NavigationButtons />
                <CodeRemarks />*/}
            </div>
        </div>
    );
}

export default CreativeMode