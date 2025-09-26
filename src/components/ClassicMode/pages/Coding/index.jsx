/**
 * CODING PAGE COMPONENT - CLASSICMODE
 * ===================================
 * Showcases programming skills, technologies, and coding philosophy.
 * Features interactive skill displays and project highlights.
 */

import React from 'react';
import classes from './Coding.module.css';

/**
 * Coding Component
 * ================
 */
const Coding = () => {
  return (
    <div className={classes.codingPage}>
      <div className={classes.contentContainer}>
        {/* PAGE HEADER */}
        <div className={classes.pageHeader}>
          <h1 className={classes.pageTitle}>Coding Expertise</h1>
          <div className={classes.titleUnderline}></div>
          <p className={classes.pageSubtitle}>
            Crafting elegant solutions through code, one algorithm at a time.
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className={classes.contentGrid}>
          {/* PROGRAMMING LANGUAGES */}
          <section className={classes.languagesSection}>
            <h2 className={classes.sectionTitle}>Programming Languages</h2>
            <div className={classes.languagesGrid}>
              <div className={classes.languageCard}>
                <div className={classes.languageIcon}>JS</div>
                <h3 className={classes.languageName}>JavaScript</h3>
                <div className={classes.proficiencyBar}>
                  <div className={classes.proficiencyFill} style={{width: '90%'}}></div>
                </div>
                <p className={classes.languageDesc}>ES6+, Async/Await, Modern Frameworks</p>
              </div>
              
              <div className={classes.languageCard}>
                <div className={classes.languageIcon}>PY</div>
                <h3 className={classes.languageName}>Python</h3>
                <div className={classes.proficiencyBar}>
                  <div className={classes.proficiencyFill} style={{width: '85%'}}></div>
                </div>
                <p className={classes.languageDesc}>Data Analysis, Web Development, Automation</p>
              </div>
              
              <div className={classes.languageCard}>
                <div className={classes.languageIcon}>JV</div>
                <h3 className={classes.languageName}>Java</h3>
                <div className={classes.proficiencyBar}>
                  <div className={classes.proficiencyFill} style={{width: '80%'}}></div>
                </div>
                <p className={classes.languageDesc}>Object-Oriented Programming, Spring Framework</p>
              </div>
              
              <div className={classes.languageCard}>
                <div className={classes.languageIcon}>C++</div>
                <h3 className={classes.languageName}>C++</h3>
                <div className={classes.proficiencyBar}>
                  <div className={classes.proficiencyFill} style={{width: '75%'}}></div>
                </div>
                <p className={classes.languageDesc}>Systems Programming, Performance Optimization</p>
              </div>
            </div>
          </section>

          {/* TECHNOLOGIES & FRAMEWORKS */}
          <section className={classes.techSection}>
            <h2 className={classes.sectionTitle}>Technologies & Frameworks</h2>
            <div className={classes.techGrid}>
              <div className={classes.techCategory}>
                <h3 className={classes.categoryTitle}>Frontend</h3>
                <div className={classes.techTags}>
                  <span className={classes.techTag}>React</span>
                  <span className={classes.techTag}>Vue.js</span>
                  <span className={classes.techTag}>CSS3</span>
                  <span className={classes.techTag}>HTML5</span>
                  <span className={classes.techTag}>Sass</span>
                </div>
              </div>
              
              <div className={classes.techCategory}>
                <h3 className={classes.categoryTitle}>Backend</h3>
                <div className={classes.techTags}>
                  <span className={classes.techTag}>Node.js</span>
                  <span className={classes.techTag}>Express</span>
                  <span className={classes.techTag}>Django</span>
                  <span className={classes.techTag}>REST APIs</span>
                  <span className={classes.techTag}>GraphQL</span>
                </div>
              </div>
              
              <div className={classes.techCategory}>
                <h3 className={classes.categoryTitle}>Database</h3>
                <div className={classes.techTags}>
                  <span className={classes.techTag}>MongoDB</span>
                  <span className={classes.techTag}>PostgreSQL</span>
                  <span className={classes.techTag}>MySQL</span>
                  <span className={classes.techTag}>Redis</span>
                </div>
              </div>
              
              <div className={classes.techCategory}>
                <h3 className={classes.categoryTitle}>Tools</h3>
                <div className={classes.techTags}>
                  <span className={classes.techTag}>Git</span>
                  <span className={classes.techTag}>Docker</span>
                  <span className={classes.techTag}>AWS</span>
                  <span className={classes.techTag}>VS Code</span>
                  <span className={classes.techTag}>Webpack</span>
                </div>
              </div>
            </div>
          </section>

          {/* CODING PHILOSOPHY */}
          <section className={classes.philosophySection}>
            <h2 className={classes.sectionTitle}>Coding Philosophy</h2>
            <div className={classes.philosophyGrid}>
              <div className={classes.principleCard}>
                <div className={classes.principleIcon}>🎯</div>
                <h3 className={classes.principleTitle}>Clean Code</h3>
                <p className={classes.principleDesc}>
                  Writing code that is readable, maintainable, and self-documenting.
                  Every line should tell a story.
                </p>
              </div>
              
              <div className={classes.principleCard}>
                <div className={classes.principleIcon}>⚡</div>
                <h3 className={classes.principleTitle}>Performance</h3>
                <p className={classes.principleDesc}>
                  Optimizing for speed and efficiency without sacrificing code clarity.
                  Every millisecond matters.
                </p>
              </div>
              
              <div className={classes.principleCard}>
                <div className={classes.principleIcon}>🔧</div>
                <h3 className={classes.principleTitle}>Scalability</h3>
                <p className={classes.principleDesc}>
                  Building solutions that grow with requirements and adapt to change.
                  Future-proofing through design.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Coding;