/**
 * PROJECT DOCUMENT COMPONENT
 * ==========================
 * Certificate-style gold-bordered document component displaying project information with stacked/fanned layout modes.
 * 
 * COMPONENT STRUCTURE:
 * -------------------
 * 1. DOCUMENT HEADER (Top section with corner triangles)
 * 2. DOCUMENT TITLE (Center header)
 * 3. DOCUMENT CONTENT (Main body)
 *    • Project description (italic, gold gradient text)
 *    • Tech stack section
 * 4. DOCUMENT ACTIONS
 *    • Live Demo button
 *    • GitHub button
 *    • Details button
 * 5. DOCUMENT FOOTER (Bottom section)
 *    • Document number (current/total)
 *    • Portfolio stamp
 * 
 * DISPLAY MODES:
 * -------------
 * • STACKED MODE: Documents stacked with slight rotation and offset
 * • FANNED MODE: Documents spread out in fan formation (different angles per document)
 * • HOVER STATE: Document lifts up with enhanced glow
 * 
 * INTERACTIVE FEATURES:
 * --------------------
 * • Click document → Select/activate document
 * • Click buttons → Navigate to demo/GitHub/details (with stopPropagation)
 * • Hover → Lift animation with gold glow
 * • Active → Scale and shadow enhancement
 */

// DEPENDENCIES
import classes from './ProjectDocument.module.css';

/**
 * ProjectDocument Component
 * =========================
 */
const ProjectDocument = ({ 
  project, 
  index, 
  isActive, 
  isStackFanned,
  isTransitioning,
  totalProjects,
  onClick,
  onDemoClick 
}) => {
  // Calculate inline styles for stacking/fanning
  const documentStyle = {
    // In fanned mode, reverse index order (to appear from leftmost-rightmost in fanned mode)
    // In stacked mode, keep natural order for layering
    '--document-index': isStackFanned ? totalProjects - 1 - index : index,
    '--total-documents': totalProjects,
    // Active card gets highest z-index to appear on top
    zIndex: isActive ? totalProjects + 1 : totalProjects - index,
    // When active in stacked mode, reset transform to center the document position with slight scale
    ...(!isStackFanned && isActive && {
      transform: 'translateY(0px) translateX(0px) rotate(0deg) scale(1.02)'
    })
  };

  return (
    /* PROJECT DOCUMENT  */
    <div
      className={`${classes.projectDocument} 
        ${isActive ? classes.active : ''}  /* Add .active class when selected */
        ${isStackFanned ? classes.fanned : ''}  /* Add .fanned class for fan layout */
        ${isTransitioning ? classes.disableHover : ''}`}  /* Disable hover during transitions */
      style={documentStyle}  /* Apply calculated inline styles for positioning */
      onClick={(e) => {
        e.stopPropagation();  /* Stop click event from triggering parent elements */
        onClick(index);  /* Notify parent that this document was clicked */
      }}
    >
      {/* DOCUMENT HEADER */}
      <div className={classes.documentHeader}>
        {/* Project type (e.g., "Web Application") */}
        <div className={classes.documentType}>{project.type}</div>
        {/* Project year */}
        <div className={classes.documentYear}>{project.year}</div>
      </div>

      {/* DOCUMENT TITLE */}
      <div className={classes.documentTitle}>
        <h2>{project.title}</h2>
        {/* Project status badge */}
        <div className={classes.statusBadge} data-status={project.status}>
          {project.status}
        </div>
      </div>

      {/* DOCUMENT CONTENT - (Description, Tech Stack, and Actions) */}
      <div className={classes.documentContent}>
        <p className={classes.projectDescription}>
          {project.description}
        </p>

        {/* TECH STACK */}
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

        {/* DOCUMENT ACTIONS */}
        <div className={classes.documentActions}>
          {/* 
            LIVE DEMO BUTTON 
            - Opens demo popup with project GIF/live URL
            - Has pulse animation if project.id !== 1 (all projects except first)
            - Disabled if no demoGif or liveUrl exists
            - stopPropagation prevents document selection when clicking
          */}
          <button 
            className={`${classes.actionButton} ${project.id !== 1 ? classes.alwaysActive : ''}`}
            onClick={(e) => { e.stopPropagation(); onDemoClick(project); }}
            disabled={!project.demoGif && !project.liveUrl}
          >
            <span className={classes.buttonIcon}>🔗</span>Live Demo
          </button>
          
          {/* 
            GITHUB BUTTON 
            - Opens project GitHub repository in new tab
            - Disabled if no githubUrl exists
            - stopPropagation prevents document selection when clicking
          */}
          <button 
            className={classes.actionButton}
            onClick={(e) => { e.stopPropagation(); if (project.githubUrl) window.open(project.githubUrl, '_blank'); }}
            disabled={!project.githubUrl}
          >
            <span className={classes.buttonIcon}>📁</span>GitHub
          </button>
          
          {/* 
            DETAILS BUTTON 
            - Opens project details page in new tab
            - Disabled if no detailsUrl exists
            - stopPropagation prevents document selection when clicking
          */}
          <button 
            className={classes.actionButton}
            onClick={(e) => { e.stopPropagation(); if (project.detailsUrl) window.open(project.detailsUrl, '_blank'); }}
            disabled={!project.detailsUrl}
          >
            <span className={classes.buttonIcon}>📄</span>Details
          </button>
        </div>
      </div>

      {/* DOCUMENT FOOTER */}
      <div className={classes.documentFooter}>
        {/* Document number (e.g., "01 / 05") */}
        <div className={classes.documentNumber}>
          {String(index + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
        </div>
        {/* Portfolio stamp */}
        <div className={classes.documentStamp}>PORTFOLIO</div>
      </div>
    </div>
  );
};

export default ProjectDocument;
