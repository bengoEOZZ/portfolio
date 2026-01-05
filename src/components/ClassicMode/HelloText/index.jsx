/**
 * HELLOTEXT COMPONENT
 * ===================
 * Hero introduction section for the Classic Mode homepage featuring animated name highlight, and navigation buttons.
 * 
 * COMPONENT STRUCTURE:
 * -------------------
 * 1. Header - "Hello World..." with animated golden underline
 * 2. Introduction Paragraphs - Staggered entrance animations
 * 3. Name Highlight - Benjamin Tiong with luxury styling and particle effects
 * 4. Navigation Buttons - Three LuxuryButton components linking to main pages
 */

// DEPENDENCIES
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import classes from './HelloText.module.css';
import LuxuryButton from '../LuxuryButton';

/**
 * HelloText Component
 * ===================
 */
const HelloText = ({ isHelloTextFading, startTransition }) => {
  const navigate = useNavigate();
  const [isNameHovered, setIsNameHovered] = useState(false);

  /**
   * BUTTON CLICK HANDLER
   * ===================
   * Triggers page transition animation before navigating to target route.
   */
  const handleButtonClick = (path) => {
    startTransition(() => {
      navigate(path);
    }, 1500);
  };

  /**
   * COMPONENT OUTPUT
   * ===============
   */
  return (
    <main className={`${classes.container} ${isHelloTextFading ? classes.fadeOut : ''}`}>
      
      {/* MAIN HEADER - "Hello World..." with golden underline */}
      <h1 className={classes.header}>Hello World...</h1>
      
      {/* INTRODUCTION TEXT - Two paragraphs with staggered entrance */}
      <div className={classes.introText}>
        
        {/* FIRST PARAGRAPH - Personal introduction with name highlight */}
        <p>
          I am <span 
            className={`${classes.name} ${isNameHovered ? classes.nameHovered : ''}`}
            onMouseEnter={() => setIsNameHovered(true)}
          >
            BENJAMIN TIONG
            
            {/* NAME PARTICLES - Three rotating sparkles with staggered timing */}
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
        
        {/* SECOND PARAGRAPH - Call to action with navigation buttons */}
        <p>
          Learn more{' '}
          <LuxuryButton onClick={() => handleButtonClick('/classic/about')}>about me</LuxuryButton>{' '}
          or feel free to explore my{' '}
          <LuxuryButton onClick={() => handleButtonClick('/classic/coding')}>coding</LuxuryButton>{' '}
          and{' '}
          <LuxuryButton onClick={() => handleButtonClick('/classic/projects')}>projects</LuxuryButton>{' '}
          to see what I've been working on.
        </p>
      </div>
    </main>
  );
};

export default HelloText;