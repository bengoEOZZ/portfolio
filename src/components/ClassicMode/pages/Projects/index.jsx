/**
 * PROJECTS PAGE COMPONENT - CLASSICMODE
 * =====================================
 * Interactive stack of project documents with flip-through functionality
 */

import React, { useState, useMemo, useCallback } from 'react';
import classes from './Projects.module.css';
import ProjectDocument from './ProjectDocument';
import DemoPopup from './DemoPopup';

// Import GIF demos
import qbnbDemo from '../../../../assets/ClassicMode/gifs/QBNB.gif';
import qbuzzDemo from '../../../../assets/ClassicMode/gifs/QBUZZ.gif';
import glowstickDemo from '../../../../assets/ClassicMode/gifs/glowstickGuy.gif';
import seDemo from '../../../../assets/ClassicMode/gifs/StressfulEscape.gif';

// Map demo GIF imports to project IDs
const demoGifs = {
  qbnbDemo,
  qbuzzDemo,
  glowstickDemo,
  seDemo
};

// Projects data
const projectsData = [
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
    techStack: ["Python", "Flask", "SQLite", "Pytest", "Docker", "HTML/CSS"],
    status: "Completed",
    year: "2022",
    githubUrl: "https://github.com/bengoEOZZ/qbnb",
    detailsUrl: "https://drive.google.com/drive/folders/1FuHbQLe9E0qtCp0x5RY_UJNd8m1BgzMp",
    demoGif: "qbnbDemo"
  },
  {
    id: 3,
    title: "QBUZZ - Trivia Game Application",
    type: "Full-Stack Application",
    description: "Cross-platform trivia game with buzzer system for team competitions. Features dynamic question management with cloud-based question banks, team/individual play modes, real-time score syncing, and smart buzzer lockout functionality for competitive gaming.",
    techStack: ["Python", "Jinja2", "FastAPI", "WebSockets", "HTML/CSS", "JavaScript"],
    status: "Completed", 
    year: "2024",
    demoGif: "qbuzzDemo"
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
    detailsUrl: "https://drive.google.com/drive/folders/1DT9tIcDNmb_VZH4q7abX-0yK8zu0x5Ya",
    demoGif: "glowstickDemo"
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
    demoGif: "seDemo"
  }
];

/**
 * Projects Component
 * ==================
 */
const Projects = () => {
  const [activeDocument, setActiveDocument] = useState(0);
  const [isStackFanned, setIsStackFanned] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Consolidated modal state
  const [modalState, setModalState] = useState({
    isOpen: false,
    isClosing: false,
    demoGif: null,
    projectTitle: null,
    projectYear: null
  });

  // Merge demo GIFs with project data and memoize
  const projects = useMemo(() => 
    projectsData.map(project => ({
      ...project,
      demoGif: project.demoGif ? demoGifs[project.demoGif] : null
    })),
    []
  );

  // Memoize statistics calculations
  const stats = useMemo(() => ({
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === 'Completed').length,
    totalLinesOfCode: projects.reduce((sum, p) => sum + (p.linesOfCode || 0), 0),
    uniqueTechnologies: [...new Set(projects.flatMap(p => p.techStack))].length
  }), [projects]);

  // Event handlers with useCallback
  const handleDocumentClick = useCallback((index) => {
    setActiveDocument(index);
    if (isStackFanned) {
      setIsStackFanned(false);
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }
  }, [isStackFanned]);

  const toggleStack = useCallback(() => {
    setIsStackFanned(prev => !prev);
  }, []);

  const nextDocument = useCallback(() => {
    setActiveDocument(prev => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevDocument = useCallback(() => {
    setActiveDocument(prev => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const handleLiveDemoClick = useCallback((project) => {
    if (project.id === 1) {
      return;
    }
    if (project.demoGif) {
      setModalState({
        isOpen: true,
        isClosing: false,
        demoGif: project.demoGif,
        projectTitle: project.title,
        projectYear: project.year
      });
    } else if (project.liveUrl) {
      window.open(project.liveUrl, '_blank');
    }
  }, []);

  const closeDemoModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isClosing: true }));
    setTimeout(() => {
      setModalState({
        isOpen: false,
        isClosing: false,
        demoGif: null,
        projectTitle: null,
        projectYear: null
      });
    }, 400);
  }, []);

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
                  <div className={classes.statNumber}>{stats.totalProjects}</div>
                  <div className={classes.statLabel}>Total Projects</div>
                </div>
                <div className={classes.statItem}>
                  <div className={classes.statNumber}>
                    {stats.completedProjects}
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
                  <ProjectDocument
                    key={project.id}
                    project={project}
                    index={index}
                    isActive={index === activeDocument}
                    isStackFanned={isStackFanned}
                    isTransitioning={isTransitioning}
                    totalProjects={projects.length}
                    onClick={handleDocumentClick}
                    onDemoClick={handleLiveDemoClick}
                  />
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

      {/* Demo Popup */}
      <DemoPopup
        isOpen={modalState.isOpen}
        isClosing={modalState.isClosing}
        demoGif={modalState.demoGif}
        projectTitle={modalState.projectTitle}
        projectYear={modalState.projectYear}
        onClose={closeDemoModal}
      />
    </div>
  );
};

export default Projects;