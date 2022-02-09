import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFound + " container"}>
      <i className="fas fa-exclamation-circle"></i>
      <h3>Page not found!</h3>
    </div>
  );
}

export default NotFound;
