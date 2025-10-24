/**
 * CODING PAGE COMPONENT - CLASSICMODE
 * ===================================
 * Technical expertise showcase
 */

import React from 'react';
import classes from './Coding.module.css';

/**
 * Coding Component
 * ================
 */
const Coding = () => {
  const techStack = {
    "Frontend": ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js"],
    "Backend": ["Python", "FastAPI", "Flask", "Node.js"],
    "Databases": ["PostgreSQL", "MongoDB", "SQL"],
    "DevOps & Tools": ["Git", "GitHub", "GitLab", "Docker", "PyTest", "Ansible", "PowerShell", "VS Code"],
    "Machine Learning": ["Coming Soon"]
  };

  return (
    <div className={classes.codingPage}>
      {/* PAGE HEADER */}
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>Coding Expertise</h1>
        <div className={classes.titleUnderline}></div>
        <p className={classes.pageSubtitle}>
          A comprehensive overview of development skills and technologies
        </p>
      </div>

      {/* UNDER DEVELOPMENT NOTICE */}
      <div className={classes.developmentNotice}>
        <div className={classes.noticeIcon}>🚧</div>
        <div className={classes.noticeText}>This section is currently under development. MTG style cards coming soon.</div>
        <div className={classes.noticeIcon}>🚧</div>
      </div>

      {/* TECH STACK DISPLAY */}
      <div className={classes.techStackContainer}>
        {Object.entries(techStack).map(([category, technologies]) => (
          <div key={category} className={classes.techCategory}>
            <div className={classes.categoryHeader}>
              <h2 className={classes.categoryTitle}>{category}</h2>
              <div className={classes.categoryBadge}>{technologies.length}</div>
            </div>
            <div className={classes.techList}>
              {technologies.map((tech, index) => (
                <div key={index} className={classes.techItem}>
                  <div className={classes.techBullet}>◆</div>
                  <div className={classes.techName}>{tech}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coding;