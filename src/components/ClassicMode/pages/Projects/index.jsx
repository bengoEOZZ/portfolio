/**
 * PROJECTS PAGE COMPONENT - CLASSICMODE
 * =====================================
 * Interactive stack of project documents with flip-through functionality
 */

import React, { useState } from 'react';
import classes from './Projects.module.css';

// Import GIF demos
import qbnbDemo from '../../../../assets/gifs/QBNB.gif';
import qbuzzDemo from '../../../../assets/gifs/QBUZZ.gif';
import glowstickDemo from '../../../../assets/gifs/glowstickGuy.gif';
import seDemo from '../../../../assets/gifs/SE.gif';

/**
 * Projects Component
 * ==================
 */
const Projects = () => {
  const [activeDocument, setActiveDocument] = useState(0);
  const [isStackFanned, setIsStackFanned] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [currentDemoGif, setCurrentDemoGif] = useState(null);
  const [currentDemoProject, setCurrentDemoProject] = useState(null); // ADD THIS LINE

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      type: "Web Development",
      description: "A dual-mode portfolio featuring ClassicMode and CreativeMode interfaces. The project is a Single Page Application (SPA) that transforms the traditional portfolio concept into an interactive experience. Just wanted to create something fun and engaging to showcase myself, basically.",
      techStack: ["React", "JavaScript", "CSS Modules", "Vite"],
      status: "In Development",
      year: "PRESENT",
      githubUrl: "https://github.com/bengoEOZZ/portfolio",
      detailsUrl: "https://github.com/bengoEOZZ/portfolio/blob/React-Migration/README.md"
    },
  {
    id: 2,
    title: "QB&B - Housing Web Application",
    type: "Full-Stack Application", 
    description: "AirBnB-inspired vacation rental platform allowing users to create property listings, handle bookings, process payments, and leave reviews. Features comprehensive security testing including SQL injection prevention and Docker containerization for deployment.",
    techStack: ["Python", "Flask", "MySQL", "Pytest", "Docker", "HTML/CSS"],
    status: "Completed",
    year: "2022",
    githubUrl: "https://github.com/bengoEOZZ/qbnb",
    detailsUrl: "https://drive.google.com/drive/folders/1FuHbQLe9E0qtCp0x5RY_UJNd8m1BgzMp", // CHANGED: Added Google Drive URL
    demoGif: qbnbDemo
  },
    {
      id: 3,
      title: "QBUZZ - Trivia Game Application",
      type: "Full-Stack Application",
      description: "Cross-platform trivia game with buzzer system for team competitions. Features dynamic question management with cloud-based question banks, team/individual play modes, real-time score syncing, and smart buzzer lockout functionality for competitive gaming.",
      techStack: ["Python", "Jinja2", "FastAPI", "WebSockets", "HTML/CSS", "JavaScript"],
      status: "Completed", 
      year: "2024",
      demoGif: qbuzzDemo
    },
  {
    id: 4,
    title: "Glowstick Guy - Unity 2D Game",
    type: "Game Development",
    description: "A prototype platformer game featuring unique glowstick mechanics and lighting effects. Players navigate through challenging levels using creative movement and light-based puzzle solving in an immersive gaming experience. A simple prototype made for fun and learning purposes.",
    techStack: ["Unity", "C#"],
    status: "Completed",
    year: "2025",
    githubUrl: "https://github.com/bengoEOZZ/Glowstick-Guy",
    detailsUrl: "https://drive.google.com/drive/folders/1DT9tIcDNmb_VZH4q7abX-0yK8zu0x5Ya", // ADDED: Google Drive details
    demoGif: glowstickDemo
  },
    {
      id: 5,
      title: "Stressful Escape - 2D Game",
      type: "Game Development",
      description: "A 2D adventure game I made in high school when I didn't feel like studying. Features various mini-games exploring the journey of doing homework. Built with Python and Pygame just for fun and to learn a bit of game development.",
      techStack: ["Python", "Pygame"],
      status: "Completed",
      year: "2020",
      githubUrl: "https://github.com/bengoEOZZ/stressful_escape",
      demoGif: seDemo
    }
  ];

  const handleDocumentClick = (index) => {
    setActiveDocument(index);
    if (isStackFanned) {
      setIsStackFanned(false);
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }
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

  const handleLiveDemoClick = (project) => {
    if (project.id === 1) {
      return;
    }
    if (project.demoGif) {
      setCurrentDemoGif(project.demoGif);
      setCurrentDemoProject(project); // ADD THIS LINE
      setShowDemoModal(true);
    } else if (project.liveUrl) {
      window.open(project.liveUrl, '_blank');
    }
  };

  const closeDemoModal = () => {
    setShowDemoModal(false);
    setCurrentDemoGif(null);
    setCurrentDemoProject(null); // ADD THIS LINE
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
                    className={`${classes.projectDocument} 
                      ${index === activeDocument ? classes.active : ''}
                      ${isTransitioning ? classes.disableHover : ''}`}
                    style={{
                      '--document-index': isStackFanned ? projects.length - 1 - index : index,
                      '--total-documents': projects.length,
                      zIndex: index === activeDocument ? projects.length + 1 : projects.length - index,
                      ...(!isStackFanned && index === activeDocument && {
                        transform: 'translateY(0px) translateX(0px) rotate(0deg) scale(1.02)'
                      })
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
                        <button 
                          className={`${classes.actionButton} ${project.id === 1 ? classes.alwaysActive : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLiveDemoClick(project);
                          }}
                          disabled={!project.demoGif && !project.liveUrl}
                        >
                          <span className={classes.buttonIcon}>🔗</span>
                          Live Demo
                        </button>
                        <button 
                          className={classes.actionButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (project.githubUrl) window.open(project.githubUrl, '_blank');
                          }}
                          disabled={!project.githubUrl}
                        >
                          <span className={classes.buttonIcon}>📁</span>
                          GitHub
                        </button>
                        <button 
                          className={classes.actionButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (project.detailsUrl) window.open(project.detailsUrl, '_blank');
                          }}
                          disabled={!project.detailsUrl}
                        >
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

      {/* Demo Modal with Premium Art Deco styling */}
      {showDemoModal && (
        <div className={classes.demoModal} onClick={closeDemoModal}>
          <div 
            className={classes.demoModalContent} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* ADD TITLE */}
            {currentDemoProject && (
              <div className={classes.demoModalTitle}>
                {currentDemoProject.title.split(' - ')[0]}
              </div>
            )}

            {/* Geometric frames */}
            <div className={classes.geometricFrame1Container}>
              <div className={classes.geometricFrame1}></div>
            </div>
            <div className={classes.geometricFrame2Container}>
              <div className={classes.geometricFrame2}></div>
            </div>
            <div className={classes.geometricFrame3Container}>
              <div className={classes.geometricFrame3}></div>
            </div>
            
            <button className={classes.closeModal} onClick={closeDemoModal}>
              <span>✕</span>
            </button>
            
            {currentDemoGif && (
              <img src={currentDemoGif} alt="Demo" className={classes.modalGif} />
            )}

            {/* ADD FOOTER */}
            {currentDemoProject && (
              <div className={classes.demoModalFooter}>
                {currentDemoProject.year}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;