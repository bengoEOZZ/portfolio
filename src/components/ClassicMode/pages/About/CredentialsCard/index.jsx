/**
 * CREDENTIALS CARD COMPONENT
 * ==========================
 * Credentials card displaying education and work experience.
 * Features three diagonal sections with company/school logos and details.
 * 
 * VISUAL STRUCTURE:
 * -------------------
 * 1. Three diagonal sections (Queen's, Moneris, Manulife)
 *    - Each section has a main header with logo and body content
 *    - Content and relevant information is positioned in the body content
 */

// DEPENDENCIES
import classes from './CredentialsCard.module.css';
import queensLogo from '../../../../../assets/queens.png';
import manulifeLogo from '../../../../../assets/manulife.png';
import monerisLogo from '../../../../../assets/moneris.png';

/**
 * CREDENTIALS DATA
 * ================
 * Credentials content for each section of the card.
 */
const CREDENTIALS_DATA = {
  queens: {
    logo: queensLogo,
    logoAlt: "Queen's University",
    title: "QUEEN'S UNIVERSITY",
    subtitle: "Computing (Honours)",
    period: "2020 - 2025",
    location: "Kingston, ON",
    highlight: "Dean's Honour List (2020-2025)",
    subtext: "GPA: 3.94/4.3",
    highlightColor: 'gold'
  },
  moneris: {
    logo: monerisLogo,
    logoAlt: "Moneris",
    title: "MONERIS",
    subtitle: "Infrastructure Operations (Automation)",
    period: "June 2023 - June 2024",
    location: "Toronto, ON • Internship",
    highlight: "Greatly streamlined VM deployment processes",
    subtext: "AWX • Ansible • GitLab • Windows • PowerShell",
    highlightColor: 'cyan'
  },
  manulife: {
    logo: manulifeLogo,
    logoAlt: "Manulife",
    title: "MANULIFE",
    subtitle: "RPS Department (QA / Database)",
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
 * Renders a single diagonal section with content and header overlay.
 * 
 * RENDERING LOGIC:
 * ----------------
 * Main gradient section with clipped diagonal shape (2 sections for header/body).
 *   - Header overlay with darker gradient and logo
 *   - Text content positioned below header (title → subtitle → period → location → highlight → subtext)
 */
const Section = ({ type, data }) => (
  <>
    {/* HEADER SECTION WITH LOGO */}
    <div className={`${classes.header} ${classes[`header${type}`]}`}>
      <img src={data.logo} alt={data.logoAlt} className={classes[`${type}Logo`]} />
    </div>

    {/* MAIN CONTENT SECTION */}
    <div className={`${classes.section} ${classes[`${type}Section`]}`}>
      <div className={`${classes.textContent} ${classes[`${type}Text`]}`}>
        <div className={classes.title}>{data.title}</div>
        <div className={classes.subtitle}>{data.subtitle}</div>
        <div className={classes.period}>{data.period}</div>
        <div className={classes.location}>{data.location}</div>
        <div className={`${classes.highlight} ${classes[`highlight${data.highlightColor}`]}`}>
          {data.highlight}
        </div>
        <div className={`${classes.subtext} ${classes[`subtext${data.highlightColor}`]}`}>
          {data.subtext}
        </div>
      </div>
    </div>
  </>
);

/**
 * CredentialsCard Component
 * =========================
 * SCALING: Uses CSS custom property --scale-factor to resize entire card when needed.
 */
const CredentialsCard = ({ scale = 1, className = '' }) => {
  return (
    <div className={`${classes.cardWrapper} ${className}`} style={{ '--scale-factor': scale }} >
      <div className={classes.credentialsCard}>
        <Section type="queens" data={CREDENTIALS_DATA.queens} />
        <Section type="moneris" data={CREDENTIALS_DATA.moneris} />
        <Section type="manulife" data={CREDENTIALS_DATA.manulife} />
      </div>
    </div>
  );
};

export default CredentialsCard;