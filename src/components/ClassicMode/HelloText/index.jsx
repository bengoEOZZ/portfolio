/**
 * HELLOTEXT COMPONENT
 * ===================
 * 
 * This component renders the main introductory section for the Classic Mode interface.
 */

// DEPENDENCIES
import classes from './HelloText.module.css';
import LuxuryButton from '../LuxuryButton';

/**
 * HelloText Component
 * ===================
 */
const HelloText = ({ isHelloTextFading }) => {

  return (
    <main className={`${classes.container} ${isHelloTextFading ? classes.fadeOut : ''}`}>
      <h1 className={classes.header}>Hello World...</h1>
      
      <div className={classes.introText}>
        <p>
          I am <span className={classes.name}>
            BENJAMIN TIONG
            <div className={classes.nameParticles}>
              <div className={classes.nameParticle} style={{'--delay': '0s'}}></div>
              <div className={classes.nameParticle} style={{'--delay': '0.3s'}}></div>
              <div className={classes.nameParticle} style={{'--delay': '0.6s'}}></div>
            </div>
          </span>, a software developer
          whose work revolves around on creating innovative and functional solutions. <br></br>
          I strive to create meaningful and impactful work, combining creativity and
          precision to deliver results that stand out.
        </p>
        <p>
          Learn more{' '}
          <LuxuryButton>about me</LuxuryButton>{' '}
          or feel free to explore my{' '}
          <LuxuryButton>coding</LuxuryButton>{' '}
          and{' '}
          <LuxuryButton>projects</LuxuryButton>{' '}
          to see what I've been working on.
        </p>
      </div>
    </main>
  );
};

export default HelloText;