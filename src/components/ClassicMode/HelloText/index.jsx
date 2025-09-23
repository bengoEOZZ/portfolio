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
  /**
   * BUTTON CLICK HANDLERS
   * ====================
   * Handle navigation and interactions for luxury buttons.
   */
  const handleAboutClick = () => {
    console.log('Navigate to About section');
    // Add navigation logic here
  };

  const handleCodingClick = () => {
    console.log('Navigate to Coding section');
    // Add navigation logic here
  };

  const handleProjectsClick = () => {
    console.log('Navigate to Projects section');
    // Add navigation logic here
  };

  return (
    <main className={`${classes.container} ${isHelloTextFading ? classes.fadeOut : ''}`}>
      <h1 className={classes.header}>Hello World...</h1>
      
      <div className={classes.introText}>
        <p>
          I am <span className={classes.name}>Benjamin Tiong,</span> a Computer Science graduate
          with a passion for creating innovative and functional solutions. <br></br>
          I strive to create meaningful and impactful work, combining creativity and
          precision to deliver results that stand out.
        </p>
        <p>
          Learn more{' '}
          <LuxuryButton onClick={handleCodingClick}>about me</LuxuryButton>{' '}
          or feel free to explore my{' '}
          <LuxuryButton onClick={handleCodingClick}>coding</LuxuryButton>{' '}
          and{' '}
          <LuxuryButton onClick={handleProjectsClick}>projects</LuxuryButton>{' '}
          to see what I've been working on.
        </p>
      </div>
    </main>
  );
};

export default HelloText;