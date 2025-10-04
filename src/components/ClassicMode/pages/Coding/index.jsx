/**
 * CODING PAGE COMPONENT - CLASSICMODE
 * ===================================
 * Luxury vintage typewriter with interactive typing animation
 * Inspired by classic Royal typewriters with golden accents
 */

import React, { useState, useRef, useEffect } from 'react';
import classes from './Coding.module.css';

/**
 * Coding Component
 * ================
 */
const Coding = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const typewriterRef = useRef(null);
  const typewriterContainerRef = useRef(null);

  // Code snippets that the typewriter will type
  const codeLines = [
    "const developer = {",
    "  name: 'Benjamin Tiong',",
    "  passion: 'Full-Stack Development',",
    "  philosophy: 'Clean Code & Innovation',",
    "  skills: ['JavaScript', 'Python', 'React', 'Node.js'],",
    "  goal: 'Building Tomorrow\\'s Solutions'",
    "};"
  ];

  // 3D Mouse Tracking Effect (similar to wallet)
  useEffect(() => {
    const typewriter = typewriterRef.current;
    const typewriterContainer = typewriterContainerRef.current;
    
    if (!typewriter || !typewriterContainer) return;

    const handleMouseMove = (e) => {
      if (isTyping) return; // Don't tilt while typing
      
      const rect = typewriter.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width * 8;
      const mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height * -8;
      
      typewriterContainer.style.transform = `rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
    };

    const handleMouseLeave = () => {
      if (!isTyping) {
        typewriterContainer.style.transform = '';
      }
    };

    typewriter.addEventListener('mousemove', handleMouseMove);
    typewriter.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      typewriter.removeEventListener('mousemove', handleMouseMove);
      typewriter.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTyping]);

  // Typing animation effect
  useEffect(() => {
    if (!isTyping) return;

    let currentText = '';
    let lineIndex = 0;
    let charIndex = 0;

    const typeNextChar = () => {
      if (lineIndex < codeLines.length) {
        const currentLine = codeLines[lineIndex];
        
        if (charIndex < currentLine.length) {
          currentText = codeLines.slice(0, lineIndex).join('\n') + 
                       (lineIndex > 0 ? '\n' : '') + 
                       currentLine.substring(0, charIndex + 1);
          setDisplayText(currentText);
          charIndex++;
          
          // Variable typing speed for more realistic effect
          const speed = Math.random() * 80 + 40;
          setTimeout(typeNextChar, speed);
        } else {
          // Move to next line
          lineIndex++;
          charIndex = 0;
          setTimeout(typeNextChar, 400); // Pause between lines
        }
      } else {
        // Typing complete
        setTimeout(() => {
          setIsTyping(false);
          setDisplayText('');
          setCurrentLineIndex(0);
        }, 3000); // Show complete text for 3 seconds
      }
    };

    typeNextChar();
  }, [isTyping, currentLineIndex]);

  const handleTypewriterClick = () => {
    if (!isTyping) {
      setIsTyping(true);
      setDisplayText('');
    }
  };

  return (
    <div className={classes.codingPage}>
      {/* PAGE HEADER */}
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>Coding Expertise</h1>
        <div className={classes.titleUnderline}></div>
        <p className={classes.pageSubtitle}>
          Crafting elegant solutions through code, one algorithm at a time.
        </p>
      </div>

      {/* THREE-COLUMN LAYOUT */}
      <div className={classes.threeColumnLayout}>
        
        {/* LEFT COLUMN - SKILLS */}
        <div className={`${classes.leftColumn} ${isTyping ? classes.fadeOut : classes.fadeIn}`}>
          <div className={classes.skillsSection}>
            <h3 className={classes.sectionTitle}>Core Skills</h3>
            <div className={classes.skillsList}>
              <div className={classes.skillItem}>
                <div className={classes.skillLabel}>JavaScript</div>
                <div className={classes.skillLevel}>Expert</div>
              </div>
              <div className={classes.skillItem}>
                <div className={classes.skillLabel}>Python</div>
                <div className={classes.skillLevel}>Advanced</div>
              </div>
              <div className={classes.skillItem}>
                <div className={classes.skillLabel}>React</div>
                <div className={classes.skillLevel}>Expert</div>
              </div>
              <div className={classes.skillItem}>
                <div className={classes.skillLabel}>Node.js</div>
                <div className={classes.skillLevel}>Advanced</div>
              </div>
              <div className={classes.skillItem}>
                <div className={classes.skillLabel}>Java</div>
                <div className={classes.skillLevel}>Proficient</div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN - VINTAGE ROYAL TYPEWRITER */}
        <div className={classes.centerColumn}>
          <div className={classes.contentContainer}>
            <div className={classes.typewriterSection}>
              <div 
                ref={typewriterRef}
                className={classes.typewriterWrapper}
              >
                <div 
                  ref={typewriterContainerRef}
                  className={`${classes.typewriterContainer} ${isTyping ? classes.typewriterActive : ''}`}
                  onClick={handleTypewriterClick}
                >
                  {/* VINTAGE ROYAL TYPEWRITER */}
                  <div className={classes.vintageTypewriter}>
                    
                    {/* PAPER CARRIAGE & HOLDER */}
                    <div className={classes.paperCarriage}>
                      <div className={classes.carriageRod}></div>
                      <div className={classes.paperGuides}>
                        <div className={classes.paperGuide}></div>
                        <div className={classes.paperGuide}></div>
                      </div>
                      
                      {/* PAPER */}
                      <div className={classes.paper}>
                        <div className={classes.paperContent}>
                          {displayText.split('\n').map((line, index) => (
                            <div key={index} className={classes.codeLine}>
                              {line}
                              {index === displayText.split('\n').length - 1 && isTyping && (
                                <span className={classes.cursor}>|</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* MAIN TYPEWRITER BODY */}
                    <div className={classes.typewriterBody}>
                      
                      {/* TOP SECTION WITH BRAND */}
                      <div className={classes.typewriterTop}>
                        <div className={classes.brandPlate}>
                          <div className={classes.brandName}>BENJAMIN</div>
                          <div className={classes.modelName}>DEVELOPER EDITION</div>
                        </div>
                      </div>

                      {/* MIDDLE SECTION */}
                      <div className={classes.typewriterMiddle}>
                        <div className={classes.typewriterDecor}>
                          <div className={classes.decorLine}></div>
                          <div className={classes.decorDiamond}>◆</div>
                          <div className={classes.decorLine}></div>
                        </div>
                      </div>

                      {/* KEYBOARD SECTION */}
                      <div className={classes.keyboardSection}>
                        <div className={classes.typewriterKeys}>
                          <div className={classes.keyRow}>
                            {['1','2','3','4','5','6','7','8','9','0'].map((key, i) => (
                              <div key={i} className={classes.typewriterKey}>{key}</div>
                            ))}
                          </div>
                          <div className={classes.keyRow}>
                            {['Q','W','E','R','T','Y','U','I','O','P'].map((key, i) => (
                              <div key={i} className={classes.typewriterKey}>{key}</div>
                            ))}
                          </div>
                          <div className={classes.keyRow}>
                            {['A','S','D','F','G','H','J','K','L'].map((key, i) => (
                              <div key={i} className={classes.typewriterKey}>{key}</div>
                            ))}
                          </div>
                          <div className={classes.keyRow}>
                            {['Z','X','C','V','B','N','M'].map((key, i) => (
                              <div key={i} className={classes.typewriterKey}>{key}</div>
                            ))}
                          </div>
                        </div>
                        
                        {/* SPACEBAR */}
                        <div className={classes.spacebar}></div>
                      </div>
                    </div>

                    {/* GOLDEN ACCENTS & DETAILS */}
                    <div className={classes.goldenAccents}>
                      <div className={classes.cornerAccent} style={{top: '20px', left: '20px'}}></div>
                      <div className={classes.cornerAccent} style={{top: '20px', right: '20px'}}></div>
                      <div className={classes.cornerAccent} style={{bottom: '40px', left: '20px'}}></div>
                      <div className={classes.cornerAccent} style={{bottom: '40px', right: '20px'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - PHILOSOPHY */}
        <div className={`${classes.rightColumn} ${isTyping ? classes.fadeOut : classes.fadeIn}`}>
          <div className={classes.philosophySection}>
            <h3 className={classes.sectionTitle}>Philosophy</h3>
            <div className={classes.philosophyContent}>
              <p className={classes.philosophyText}>
                "First, solve the problem. Then, write the code."
              </p>
              <div className={classes.philosophyAuthor}>- John Johnson</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Coding;