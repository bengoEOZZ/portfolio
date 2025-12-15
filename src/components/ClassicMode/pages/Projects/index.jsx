/**
 * PROJECTS PAGE COMPONENT - CLASSICMODE
 * ======================================
 * Interactive stack of project documents with flip-through functionality, fan out mode, and live demo popup system.
 * 
 * LAYOUT STRUCTURE:
 * ----------------
 * Three-column layout:
 *   - Left: Statistics dashboard (total projects, completed, technologies)
 *   - Center: Interactive document stack (stacked or fanned display modes)
 *   - Right: Navigation controls (previous/next, current indicator, toggle)
 * 
 * INTERACTIVE FEATURES:
 * --------------------
 * • Click document → Select and activate document (collapses fan if open)
 * • Click stack → Toggle between stacked and fanned display modes
 * • Click Live Demo → Opens popup with project GIF demonstration
 * • Navigation buttons → Flip through documents with navigation
 * • Hover effects → Document lifts up with gold glow (disabled during transitions)
 */

import React, { useState, useMemo, useCallback } from 'react';
import classes from './Projects.module.css';
import ProjectDocument from './ProjectDocument';
import DemoPopup from './DemoPopup';
import PageHeader from '../PageHeader';

// Import GIF demos
import qbnbDemo from '../../../../assets/ClassicMode/gifs/QBNB.gif';
import qbuzzDemo from '../../../../assets/ClassicMode/gifs/QBUZZ.gif';
import glowstickGuyDemo from '../../../../assets/ClassicMode/gifs/glowstickGuy.gif';
import stressfullEscapeDemo from '../../../../assets/ClassicMode/gifs/StressfulEscape.gif';

// Map demo GIF imports to project IDs
const demoGifs = {
  qbnbDemo,
  qbuzzDemo,
  glowstickGuyDemo,
  stressfullEscapeDemo
};

/**
 * PROJECTS DATA
 * =============
 * Array of project objects containing all project information.
 * Each project includes: title, type, description, tech stack, status, year, and optional URLs.
 */
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
    demoGif: "glowstickGuyDemo"
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
    demoGif: "stressfullEscapeDemo"
  }
];

/**
 * Projects Component
 * ==================
 */
const Projects = () => {
  const [activeDocument, setActiveDocument] = useState(0); // Currently selected document (0-based index)
  const [isStackFanned, setIsStackFanned] = useState(false); // Toggle between stacked vs fanned display
  const [isTransitioning, setIsTransitioning] = useState(false); // Disables hover during mode transitions
  
  // Popup state for demo popup
  const [popupState, setPopupState] = useState({
    isOpen: false,        // Controls popup visibility
    isClosing: false,     // Triggers closing animation
    demoGif: null,        // GIF asset to display in popup
    projectTitle: null,   // Project name for popup header
    projectYear: null     // Project year for popup footer
  });

  // Merge demo GIF imports with project data (memoized for performance)
  const projects = useMemo(() => 
    projectsData.map(project => ({
      ...project,
      demoGif: project.demoGif ? demoGifs[project.demoGif] : null // Map demoGif key to actual imported asset
    })),
    [] // Only runs once on mount
  );

  // Calculate portfolio statistics (memoized to avoid recalculating on every render)
  const stats = useMemo(() => ({
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === 'Completed').length,
    uniqueTechnologies: [...new Set(projects.flatMap(p => p.techStack))].length // Set to remove duplicates
  }), [projects]);

  // Handle document card click - Selects document and collapses fan if open
  const handleDocumentClick = useCallback((index) => {
    setActiveDocument(index); // Select clicked document
    if (isStackFanned) {
      setIsStackFanned(false); // Collapse fan back to stack
      setIsTransitioning(true); // Disable hover during animation
      setTimeout(() => {
        setIsTransitioning(false); // Re-enable hover after 1 second
      }, 1000);
    }
  }, [isStackFanned]);

  // Toggle between stacked and fanned display modes
  const toggleStack = useCallback(() => {
    setIsStackFanned(prev => !prev);
  }, []);

  // Navigate to next document
  const nextDocument = useCallback(() => {
    setActiveDocument(prev => (prev + 1));
  }, [projects.length]);

  // Navigate to previous document
  const prevDocument = useCallback(() => {
    setActiveDocument(prev => (prev - 1));
  }, [projects.length]);

  // Handle Live Demo button click - Opens popup with project GIF
  const handleLiveDemoClick = useCallback((project) => {
    if (project.id === 1) {
      return; // Portfolio project has no demo
    }
    // Open popup with project GIF
    setPopupState({
      isOpen: true,
      isClosing: false,
      demoGif: project.demoGif,
      projectTitle: project.title,
      projectYear: project.year
    });
  }, []);

  // Close demo popup with animation
  const closeDemoModal = useCallback(() => {
    setPopupState(prev => ({ ...prev, isClosing: true })); // Start closing animation
    setTimeout(() => {
      setPopupState({
        isOpen: false,
        isClosing: false,
        demoGif: null,
        projectTitle: null,
        projectYear: null
      });
    }, 400); // Wait for animation to complete before clearing state
  }, []);

  return (
    <div className={classes.projectsPage}>
      <div className={classes.contentContainer}>
        
        {/* PAGE HEADER */}
        <PageHeader 
          title="Project Portfolio"
          subtitle="A comprehensive collection of development projects and technical achievements."
        />

        {/* THREE-COLUMN LAYOUT */}
        <div className={classes.threeColumnLayout}>
          
          {/* LEFT COLUMN - Statistics */}
          <div className={classes.leftColumn}>
            <div className={classes.statsSection}>
              <h3 className={classes.sectionTitle}>Statistics</h3>
              <div className={classes.portfolioStats}>
                {/* Total projects count */}
                <div className={classes.statItem}>
                  <div className={classes.statNumber}>{stats.totalProjects}</div>
                  <div className={classes.statLabel}>Total Projects</div>
                </div>
                {/* Completed projects count */}
                <div className={classes.statItem}>
                  <div className={classes.statNumber}>
                    {stats.completedProjects}
                  </div>
                  <div className={classes.statLabel}>Completed</div>
                </div>
                {/* Unique technologies across all projects */}
                <div className={classes.statItem}>
                  <div className={classes.statNumber}>
                    {stats.uniqueTechnologies}
                  </div>
                  <div className={classes.statLabel}>Technologies</div>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN - Interactive Document Stack */}
          <div className={classes.centerColumn}>
            <div className={classes.documentArea}>
              {/* 
                Document stack container
                - Click stack area to toggle between stacked/fanned modes
                - In stacked mode: Cards layered on top of each other
                - In fanned mode: Cards spread out horizontally
              */}
              <div 
                className={`${classes.documentStack} ${isStackFanned ? classes.fanned : ''}`}
                onClick={toggleStack}
              >
                {/* Render each project as a ProjectDocument card */}
                {projects.map((project, index) => (
                  <ProjectDocument
                    key={project.id}
                    project={project}
                    index={index}
                    isActive={index === activeDocument}  // Highlights selected document
                    isStackFanned={isStackFanned}        // Controls display mode
                    isTransitioning={isTransitioning}    // Disables hover during animations
                    totalProjects={projects.length}      // Used for z-index calculations
                    onClick={handleDocumentClick}        // Handles document selection
                    onDemoClick={handleLiveDemoClick}    // Opens demo popup
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Navigation controls */}
          <div className={classes.rightColumn}>
            <div className={classes.controlsSection}>
              <h3 className={classes.sectionTitle}>Navigation</h3>
              
              {/* Current document indicator (e.g., "1 of 5") */}
              <div className={classes.stackInfo}>
                <span className={classes.currentDoc}>{activeDocument + 1}</span>  {/* Display 1-based index */}
                <span className={classes.docSeparator}>of</span>
                <span className={classes.totalDocs}>{projects.length}</span>
              </div>

              {/* Previous/Next navigation buttons */}
              <div className={classes.stackControls}>
                <button 
                  className={classes.navButton} 
                  onClick={prevDocument}
                  disabled={activeDocument === 0}  // Disable when at first document
                >
                  ← Previous
                </button>
                
                <button 
                  className={classes.navButton} 
                  onClick={nextDocument}
                  disabled={activeDocument === projects.length - 1}  // Disable when at last document
                >
                  Next →
                </button>
              </div>

              {/* Toggle between stacked and fanned display modes */}
              <div className={classes.toggleContainer}>
                <button className={classes.toggleButton} onClick={toggleStack}>
                  {isStackFanned ? 'Stack Documents' : 'Fan Out Documents'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Demo Popup - Displays project GIFs */}
      <DemoPopup
        isOpen={popupState.isOpen}
        isClosing={popupState.isClosing}
        demoGif={popupState.demoGif}
        projectTitle={popupState.projectTitle}
        projectYear={popupState.projectYear}
        onClose={closeDemoModal}
      />
    </div>
  );
};

export default Projects;