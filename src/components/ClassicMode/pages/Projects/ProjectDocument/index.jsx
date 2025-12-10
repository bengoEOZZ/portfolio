/**
 * PROJECT DOCUMENT COMPONENT
 * ==========================
 * Individual certificate-style project document card
 */

import React from 'react';
import classes from './ProjectDocument.module.css';

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
  const documentStyle = {
    '--document-index': isStackFanned ? totalProjects - 1 - index : index,
    '--total-documents': totalProjects,
    zIndex: isActive ? totalProjects + 1 : totalProjects - index,
    ...(!isStackFanned && isActive && {
      transform: 'translateY(0px) translateX(0px) rotate(0deg) scale(1.02)'
    })
  };

  return (
    <div
      className={`${classes.projectDocument} 
        ${isActive ? classes.active : ''}
        ${isStackFanned ? classes.fanned : ''}
        ${isTransitioning ? classes.disableHover : ''}`}
      style={documentStyle}
      onClick={(e) => {
        e.stopPropagation();
        onClick(index);
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
              onDemoClick(project);
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
          {String(index + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
        </div>
        <div className={classes.documentStamp}>PORTFOLIO</div>
      </div>

      {/* Paper texture overlay */}
      <div className={classes.paperTexture}></div>
    </div>
  );
};

export default ProjectDocument;
