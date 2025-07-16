import { Link } from 'react-router-dom';
import classes from './ButtonClassic.module.css';

function ButtonClassic({ to, children }) {
  return (
    <Link to={to} className={classes.btn}>
      {children}
    </Link>
  );
}

export default ButtonClassic;