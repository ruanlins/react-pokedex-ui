import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <p>Page not Found! </p>
      <p>
        Click <Link to="/">here</Link> to head back do the main page!
      </p>
    </div>
  );
};

export default NotFound;
