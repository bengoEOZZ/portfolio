/**
 * ABOUT PAGE COMPONENT - CLASSICMODE
 * ==================================
 * Professional about page showcasing personal background, education, and philosophy.
 * Features luxury golden styling consistent with ClassicMode aesthetic.
 */

import React from 'react';
import classes from './About.module.css';

/**
 * About Component
 * ===============
 */
const About = () => {
  return (
    <div className={classes.aboutPage}>
      <div className={classes.contentContainer}>
        {/* PAGE HEADER */}
        <div className={classes.pageHeader}>
          <h1 className={classes.pageTitle}>About Me</h1>
          <div className={classes.titleUnderline}></div>
        </div>

        {/* MAIN CONTENT */}
        <div className={classes.contentGrid}>
          {/* PERSONAL INTRODUCTION */}
          <section className={classes.introSection}>
            <h2 className={classes.sectionTitle}>Professional Background</h2>
            <p className={classes.introText}>
              I am <span className={classes.nameHighlight}>Benjamin Tiong</span>, a Computer Science graduate 
              with a passion for creating innovative and functional solutions. My journey in technology 
              is driven by the pursuit of excellence and a commitment to craftsmanship.
            </p>
            <p className={classes.introText}>
              I strive to create meaningful and impactful work, combining creativity and precision 
              to deliver results that stand out. Every project is an opportunity to push boundaries 
              and explore new possibilities in the digital realm.
            </p>
          </section>

          {/* SKILLS & EXPERTISE */}
          <section className={classes.skillsSection}>
            <h2 className={classes.sectionTitle}>Core Expertise</h2>
            <div className={classes.skillsGrid}>
              <div className={classes.skillCard}>
                <h3 className={classes.skillTitle}>Frontend Development</h3>
                <p className={classes.skillDesc}>React, JavaScript, CSS3, Responsive Design</p>
              </div>
              <div className={classes.skillCard}>
                <h3 className={classes.skillTitle}>Backend Solutions</h3>
                <p className={classes.skillDesc}>Node.js, APIs, Database Design</p>
              </div>
              <div className={classes.skillCard}>
                <h3 className={classes.skillTitle}>UI/UX Design</h3>
                <p className={classes.skillDesc}>User Experience, Interface Design, Prototyping</p>
              </div>
              <div className={classes.skillCard}>
                <h3 className={classes.skillTitle}>Problem Solving</h3>
                <p className={classes.skillDesc}>Algorithm Design, Optimization, Innovation</p>
              </div>
            </div>
          </section>

          {/* PHILOSOPHY */}
          <section className={classes.philosophySection}>
            <h2 className={classes.sectionTitle}>Design Philosophy</h2>
            <div className={classes.philosophyCard}>
              <blockquote className={classes.philosophyQuote}>
                "Excellence is not a skill, it's an attitude. Every line of code, 
                every design decision, and every user interaction should reflect 
                a commitment to quality and innovation."
              </blockquote>
              <cite className={classes.philosophyAuthor}>— Benjamin Tiong</cite>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;