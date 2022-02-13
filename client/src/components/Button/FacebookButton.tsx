import styles from "./FacebookButton.module.css";

const GoogleButton = () => {
  return (
    <a href="https://gusto-movie.herokuapp.com/auth/facebook">
      <button className={styles.facebook + " button-base"}>
        <i className="fab fa-facebook"></i> Sign in with Facebook
      </button>
    </a>
  );
};

export default GoogleButton;
