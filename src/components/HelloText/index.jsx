import classes from './HelloText.module.css';

function HelloText() {
    return (
        <div className={classes.leftContent}>
            <h1 className={classes.leftText}>Hello World...</h1>
            <p className={classes.intro}>
                I'm <strong>Benjamin Tiong</strong>, 
                a software developer whose work orbits around the possibilities of code and innovation.
                Dive into my universe, and discover more about me.
            </p>
        </div>
    );
}

export default HelloText;