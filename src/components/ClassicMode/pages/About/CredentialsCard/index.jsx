/**
 * CREDENTIALS CARD COMPONENT
 * ==========================
 * Tri-fold diagonal card displaying education and work experience.
 * Features three diagonal sections with company/institution logos and details.
 */

import React from 'react';
import classes from './CredentialsCard.module.css';
import queensLogo from '../../../../../assets/queens.png';
import manulifeLogo from '../../../../../assets/manulife.png';
import monerisLogo from '../../../../../assets/moneris.png';

/**
 * CREDENTIALS DATA
 * ================
 * Centralized content for each section of the card.
 */
const CREDENTIALS_DATA = {
  queens: {
    logo: queensLogo,
    logoAlt: "Queen's University",
    institution: "QUEEN'S UNIVERSITY",
    program: "Computing (Honours)",
    year: "2020 - 2025",
    location: "Kingston, ON",
    highlight: "Dean's Honour List (2020-2025)",
    subtext: "GPA: 3.94/4.3",
    highlightColor: 'gold'
  },
  moneris: {
    logo: monerisLogo,
    logoAlt: "Moneris",
    company: "MONERIS",
    role: "Infrastructure Operations (Automation)",
    period: "June 2023 - June 2024",
    location: "Toronto, ON • Internship",
    highlight: "Greatly streamlined VM deployment processes",
    subtext: "AWX • Ansible • GitLab • Windows • PowerShell",
    highlightColor: 'cyan'
  },
  manulife: {
    logo: manulifeLogo,
    logoAlt: "Manulife",
    company: "MANULIFE",
    role: "RPS Department (QA / Database)",
    period: "May 2022 - Aug 2022",
    location: "Toronto, ON • Internship",
    highlight: "300+ QA/Database Records were Processed",
    subtext: "Manulife Database • Excel • QA Testing",
    highlightColor: 'lime'
  }
};

/**
 * Section Component
 * =================
 * Renders a single diagonal section with content.
 */
const Section = ({ type, data }) => (
  <>
    {/* Main gradient section */}
    <div className={`${classes.section} ${classes[`${type}Section`]}`}>
      <div className={`${classes.textContent} ${classes[`${type}Text`]}`}>
        <div className={classes.title}>{data.institution || data.company}</div>
        <div className={classes.subtitle}>{data.program || data.role}</div>
        <div className={classes.period}>{data.year || data.period}</div>
        <div className={classes.location}>{data.location}</div>
        <div className={`${classes.highlight} ${classes[`highlight${data.highlightColor}`]}`}>
          {data.highlight}
        </div>
        <div className={`${classes.subtext} ${classes[`subtext${data.highlightColor}`]}`}>
          {data.subtext}
        </div>
      </div>
    </div>
    
    {/* Header overlay with logo */}
    <div className={`${classes.header} ${classes[`header${type}`]}`}>
      <img src={data.logo} alt={data.logoAlt} className={classes[`${type}Logo`]} />
    </div>
  </>
);

/**
 * CredentialsCard Component
 * =========================
 */
const CredentialsCard = ({ scale = 1, className = '' }) => {
  return (
    <div 
      className={`${classes.cardWrapper} ${className}`}
      style={{ '--scale-factor': scale }}
    >
      <div className={classes.triFoldCard}>
        <Section type="queens" data={CREDENTIALS_DATA.queens} />
        <Section type="moneris" data={CREDENTIALS_DATA.moneris} />
        <Section type="manulife" data={CREDENTIALS_DATA.manulife} />
      </div>
    </div>
  );
};

export default CredentialsCard;