import React from 'react';
import classes from './TriFoldIDCard.module.css';

// Import company logos
import queensLogo from '../../../assets/queens.png';
import manulifeLogo from '../../../assets/manulife.png';
import monerisLogo from '../../../assets/moneris.png';

const TriFoldIDCard = ({ scale = 1, className }) => {
  const wrapperStyle = {
    '--scale-factor': scale
  };

  return (
    <div 
      className={`${classes.cardWrapper} ${className || ''}`}
      style={wrapperStyle}
    >
      <div className={classes.triFoldCard}>
        {/* Main diagonal sections (full height) */}
        <div className={classes.queensSection}>
          <div className={classes.queensText}>
            <div className={classes.institution}>QUEEN'S UNIVERSITY</div>
            <div className={classes.program}>Computing (Honours)</div>
            <div className={classes.year}>2020 - 2025</div>
            <div className={classes.location}>Kingston, ON</div>
            <div className={classes.achievement}>Dean's Honour List (2020-2025)</div>
            <div className={classes.gpa}>GPA: 3.94/4.3</div>
          </div>
        </div>
        
        <div className={classes.monerisSection}>
          <div className={classes.monerisText}>
            <div className={classes.company}>MONERIS</div>
            <div className={classes.role}>Infrastructure Operations<br></br>(Automation)</div>
            <div className={classes.period}>June 2023 - June 2024</div>
            <div className={classes.location}>Toronto, ON • Internship</div>
            <div className={classes.monerisHighlight}>Greatly streamlined VM deployment processes</div>
            <div className={classes.monerisTech}>AWX • Ansible • GitLab • Windows • PowerShell</div>
          </div>
        </div>
        
        <div className={classes.manulifeSection}>
          <div className={classes.manulifeText}>
            <div className={classes.company}>MANULIFE</div>
            <div className={classes.role}>RPS Department<br></br>(QA / Database)</div>
            <div className={classes.period}>May 2022 - Aug 2022</div>
            <div className={classes.location}>Toronto, ON • Internship</div>
            <div className={classes.manulifeHighlight}>300+ QA/Database Records were Processed</div>
            <div className={classes.manulifeTech}>Manulife Database • Excel • QA Testing</div>
          </div>
        </div>
        
        {/* Header sections overlay (25% height) */}
        <div className={classes.headerQueensSection}>
          <img src={queensLogo} alt="Queen's University" className={classes.queensLogo} />
        </div>
        <div className={classes.headerManulifeSection}>
          <img src={manulifeLogo} alt="Manulife" className={classes.manulifeLogo} />
        </div>
        <div className={classes.headerMonerisSection}>
          <img src={monerisLogo} alt="Moneris" className={classes.monerisLogo} />
        </div>
      </div>
    </div>
  );
};

export default TriFoldIDCard;