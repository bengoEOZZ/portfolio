/**
 * PROJECTS PAGE COMPONENT - CLASSICMODE
 * =====================================
 * Showcases portfolio projects with detailed descriptions and interactive elements.
 * Features project cards, tech stacks, and demo links.
 */

import React from 'react';
import classes from './Projects.module.css';

/**
 * Projects Component
 * ==================
 */
const Projects = () => {
  return (
    <div className={classes.projectsPage}>
      <div className={classes.contentContainer}>
        {/* PAGE HEADER */}
        <div className={classes.pageHeader}>
          <h1 className={classes.pageTitle}>My Projects</h1>
          <div className={classes.titleUnderline}></div>
          <p className={classes.pageSubtitle}>
            A collection of innovative solutions and creative implementations.
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className={classes.contentGrid}>
          {/* FEATURED PROJECTS */}
          <section className={classes.featuredSection}>
            <h2 className={classes.sectionTitle}>Featured Projects</h2>
            <div className={classes.projectsGrid}>
              
              {/* PROJECT 1 */}
              <div className={classes.projectCard}>
                <div className={classes.projectImage}>
                  <div className={classes.projectPlaceholder}>
                    <span className={classes.projectIcon}>🌐</span>
                  </div>
                </div>
                <div className={classes.projectContent}>
                  <h3 className={classes.projectTitle}>Portfolio Website</h3>
                  <p className={classes.projectDesc}>
                    A sophisticated dual-mode portfolio featuring ClassicMode and CreativeMode interfaces. 
                    Built with React and advanced CSS animations for an immersive user experience.
                  </p>
                  <div className={classes.techStack}>
                    <span className={classes.techBadge}>React</span>
                    <span className={classes.techBadge}>CSS Modules</span>
                    <span className={classes.techBadge}>JavaScript</span>
                    <span className={classes.techBadge}>SVG Animations</span>
                  </div>
                  <div className={classes.projectLinks}>
                    <button className={classes.linkButton}>Live Demo</button>
                    <button className={classes.linkButton}>GitHub</button>
                  </div>
                </div>
              </div>

              {/* PROJECT 2 */}
              <div className={classes.projectCard}>
                <div className={classes.projectImage}>
                  <div className={classes.projectPlaceholder}>
                    <span className={classes.projectIcon}>📱</span>
                  </div>
                </div>
                <div className={classes.projectContent}>
                  <h3 className={classes.projectTitle}>Task Management App</h3>
                  <p className={classes.projectDesc}>
                    A full-stack productivity application with real-time collaboration features, 
                    drag-and-drop functionality, and comprehensive project tracking capabilities.
                  </p>
                  <div className={classes.techStack}>
                    <span className={classes.techBadge}>React</span>
                    <span className={classes.techBadge}>Node.js</span>
                    <span className={classes.techBadge}>MongoDB</span>
                    <span className={classes.techBadge}>Socket.io</span>
                  </div>
                  <div className={classes.projectLinks}>
                    <button className={classes.linkButton}>Live Demo</button>
                    <button className={classes.linkButton}>GitHub</button>
                  </div>
                </div>
              </div>

              {/* PROJECT 3 */}
              <div className={classes.projectCard}>
                <div className={classes.projectImage}>
                  <div className={classes.projectPlaceholder}>
                    <span className={classes.projectIcon}>🎮</span>
                  </div>
                </div>
                <div className={classes.projectContent}>
                  <h3 className={classes.projectTitle}>Interactive Game Engine</h3>
                  <p className={classes.projectDesc}>
                    A browser-based game engine with physics simulation, particle systems, 
                    and advanced rendering capabilities. Features modular architecture for game development.
                  </p>
                  <div className={classes.techStack}>
                    <span className={classes.techBadge}>JavaScript</span>
                    <span className={classes.techBadge}>Canvas API</span>
                    <span className={classes.techBadge}>WebGL</span>
                    <span className={classes.techBadge}>Physics Engine</span>
                  </div>
                  <div className={classes.projectLinks}>
                    <button className={classes.linkButton}>Live Demo</button>
                    <button className={classes.linkButton}>GitHub</button>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* PROJECT STATISTICS */}
          <section className={classes.statsSection}>
            <h2 className={classes.sectionTitle}>Development Statistics</h2>
            <div className={classes.statsGrid}>
              <div className={classes.statCard}>
                <div className={classes.statNumber}>15+</div>
                <div className={classes.statLabel}>Projects Completed</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statNumber}>5</div>
                <div className={classes.statLabel}>Programming Languages</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statNumber}>10+</div>
                <div className={classes.statLabel}>Technologies Mastered</div>
              </div>
              <div className={classes.statCard}>
                <div className={classes.statNumber}>100%</div>
                <div className={classes.statLabel}>Passion Driven</div>
              </div>
            </div>
          </section>

          {/* DEVELOPMENT APPROACH */}
          <section className={classes.approachSection}>
            <h2 className={classes.sectionTitle}>Development Approach</h2>
            <div className={classes.approachGrid}>
              <div className={classes.approachCard}>
                <div className={classes.approachStep}>01</div>
                <h3 className={classes.approachTitle}>Research & Planning</h3>
                <p className={classes.approachDesc}>
                  Thorough analysis of requirements, user needs, and technical constraints 
                  to establish a solid foundation for development.
                </p>
              </div>
              
              <div className={classes.approachCard}>
                <div className={classes.approachStep}>02</div>
                <h3 className={classes.approachTitle}>Design & Prototyping</h3>
                <p className={classes.approachDesc}>
                  Creating intuitive user interfaces and robust system architectures 
                  with emphasis on usability and scalability.
                </p>
              </div>
              
              <div className={classes.approachCard}>
                <div className={classes.approachStep}>03</div>
                <h3 className={classes.approachTitle}>Development & Testing</h3>
                <p className={classes.approachDesc}>
                  Implementing clean, maintainable code with comprehensive testing 
                  to ensure reliability and performance.
                </p>
              </div>
              
              <div className={classes.approachCard}>
                <div className={classes.approachStep}>04</div>
                <h3 className={classes.approachTitle}>Deployment & Optimization</h3>
                <p className={classes.approachDesc}>
                  Seamless deployment with continuous monitoring and optimization 
                  for enhanced user experience and performance.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Projects;