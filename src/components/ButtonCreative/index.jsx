import { Link } from 'react-router-dom';
import classes from './ButtonCreative.module.css';

function ButtonCreative({ to, children }) {
  return (
    <Link to={to} className={classes.btn}>
      {children}
    </Link>
  );
}

export default ButtonCreative;