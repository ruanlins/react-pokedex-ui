import styles from './Error.module.css';

const Error = () => {
  return (
    <div className={styles.errorContainer}>
      <p>An unknow error ocurred!</p>
      <p>Please refresh the page or try again in a few minutes.</p>
    </div>
  );
};

export default Error;
