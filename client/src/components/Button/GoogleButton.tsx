import styles from "./GoogleButton.module.css";

const GoogleButton = () => {
  return (
    <a href="https://gusto-movie.herokuapp.com/auth/google">
      <button className={styles.google + " button-base"}>
        <i className="fab fa-google"></i> Sign in with Google
      </button>
    </a>
  );
};

export default GoogleButton;
