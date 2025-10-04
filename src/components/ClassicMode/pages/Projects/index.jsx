/**
 * PROJECTS PAGE COMPONENT - CLASSICMODE
 * =====================================
 * Interactive stack of project documents with flip-through functionality
 */

import React, { useState } from 'react';
import classes from './Projects.module.css';

/**
 * Projects Component
 * ==================
 */
const Projects = () => {
  const [activeDocument, setActiveDocument] = useState(0);
  const [isStackFanned, setIsStackFanned] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      type: "Web Development",
      description: "A sophisticated dual-mode portfolio featuring ClassicMode and CreativeMode interfaces. Built with React and advanced CSS animations for an immersive user experience.",
      techStack: ["React", "CSS Modules", "JavaScript", "SVG Animations"],
      status: "Completed",
      year: "2024"
    },
    {
      id: 2,
      title: "Task Management App",
      type: "Full-Stack Application",
      description: "A comprehensive productivity application with real-time collaboration features, drag-and-drop functionality, and project tracking capabilities.",
      techStack: ["React", "Node.js", "MongoDB", "Socket.io"],
      status: "In Development",
      year: "2024"
    },
    {
      id: 3,
      title: "Interactive Game Engine",
      type: "Game Development",
      description: "A browser-based game engine with physics simulation, particle systems, and advanced rendering capabilities for modular game development.",
      techStack: ["JavaScript", "Canvas API", "WebGL", "Physics Engine"],
      status: "Prototype",
      year: "2023"
    },
    {
      id: 4,
      title: "E-Commerce Platform",
      type: "Web Application",
      description: "Modern e-commerce solution with payment integration, inventory management, and advanced analytics dashboard for business insights.",
      techStack: ["Vue.js", "Express.js", "PostgreSQL", "Stripe API"],
      status: "Completed",
      year: "2023"
    },
    {
      id: 5,
      title: "Mobile Fitness Tracker",
      type: "Mobile Development",
      description: "Cross-platform fitness application with workout tracking, progress analytics, and social features for motivation and community building.",
      techStack: ["React Native", "Firebase", "Chart.js", "Health APIs"],
      status: "Planning",
      year: "2024"
    }
  ];

  const handleDocumentClick = (index) => {
    setActiveDocument(index);
  };

  const toggleStack = () => {
    setIsStackFanned(!isStackFanned);
  };

  const nextDocument = () => {
    setActiveDocument((prev) => (prev + 1) % projects.length);
  };

  const prevDocument = () => {
    setActiveDocument((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className={classes.projectsPage}>
      <div className={classes.contentContainer}>
        
        {/* PAGE HEADER */}
        <div className={classes.pageHeader}>
          <h1 className={classes.pageTitle}>Project Portfolio</h1>
          <div className={classes.titleUnderline}></div>
          <p className={classes.pageSubtitle}>
            A comprehensive collection of development projects and technical achievements.
          </p>
        </div>

        {/* THREE-COLUMN LAYOUT */}
        <div className={classes.threeColumnLayout}>
          
          {/* LEFT COLUMN - STATISTICS */}
          <div className={classes.leftColumn}>
            <div className={classes.statsSection}>
              <h3 className={classes.sectionTitle}>Statistics</h3>
              <div className={classes.portfolioStats}>
                <div className={classes.statItem}>
                  <div className={classes.statNumber}>{projects.length}</div>
                  <div className={classes.statLabel}>Total Projects</div>
                </div>
                <div className={classes.statItem}>
                  <div className={classes.statNumber}>
                    {projects.filter(p => p.status === 'Completed').length}
                  </div>
                  <div className={classes.statLabel}>Completed</div>
                </div>
                <div className={classes.statItem}>
                  <div className={classes.statNumber}>
                    {[...new Set(projects.flatMap(p => p.techStack))].length}
                  </div>
                  <div className={classes.statLabel}>Technologies</div>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN - DOCUMENT STACK */}
          <div className={classes.centerColumn}>
            <div className={classes.documentArea}>
              <div 
                className={`${classes.documentStack} ${isStackFanned ? classes.fanned : ''}`}
                onClick={toggleStack}
              >
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`${classes.projectDocument} ${index === activeDocument ? classes.active : ''}`}
                    style={{
                      '--document-index': index,
                      '--total-documents': projects.length,
                      zIndex: projects.length - index
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDocumentClick(index);
                    }}
                  >
                    {/* Document Header */}
                    <div className={classes.documentHeader}>
                      <div className={classes.documentType}>{project.type}</div>
                      <div className={classes.documentYear}>{project.year}</div>
                    </div>

                    {/* Document Title */}
                    <div className={classes.documentTitle}>
                      <h2>{project.title}</h2>
                      <div className={classes.statusBadge} data-status={project.status}>
                        {project.status}
                      </div>
                    </div>

                    {/* Document Content */}
                    <div className={classes.documentContent}>
                      <p className={classes.projectDescription}>
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className={classes.techSection}>
                        <h4 className={classes.techTitle}>Technologies Used:</h4>
                        <div className={classes.techList}>
                          {project.techStack.map((tech, techIndex) => (
                            <span key={techIndex} className={classes.techItem}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Actions */}
                      <div className={classes.documentActions}>
                        <button className={classes.actionButton}>
                          <span className={classes.buttonIcon}>🔗</span>
                          Live Demo
                        </button>
                        <button className={classes.actionButton}>
                          <span className={classes.buttonIcon}>📁</span>
                          GitHub
                        </button>
                        <button className={classes.actionButton}>
                          <span className={classes.buttonIcon}>📄</span>
                          Details
                        </button>
                      </div>
                    </div>

                    {/* Document Footer */}
                    <div className={classes.documentFooter}>
                      <div className={classes.documentNumber}>
                        {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                      </div>
                      <div className={classes.documentStamp}>PORTFOLIO</div>
                    </div>

                    {/* Paper texture overlay */}
                    <div className={classes.paperTexture}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - NAVIGATION CONTROLS */}
          <div className={classes.rightColumn}>
            <div className={classes.controlsSection}>
              <h3 className={classes.sectionTitle}>Navigation</h3>
              
              <div className={classes.stackInfo}>
                <span className={classes.currentDoc}>{activeDocument + 1}</span>
                <span className={classes.docSeparator}>of</span>
                <span className={classes.totalDocs}>{projects.length}</span>
              </div>

              <div className={classes.stackControls}>
                <button 
                  className={classes.navButton} 
                  onClick={prevDocument}
                  disabled={activeDocument === 0}
                >
                  ← Previous
                </button>
                
                <button 
                  className={classes.navButton} 
                  onClick={nextDocument}
                  disabled={activeDocument === projects.length - 1}
                >
                  Next →
                </button>
              </div>

              {/* Stack Toggle Button */}
              <div className={classes.toggleContainer}>
                <button className={classes.toggleButton} onClick={toggleStack}>
                  {isStackFanned ? 'Stack Documents' : 'Fan Out Documents'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Projects;