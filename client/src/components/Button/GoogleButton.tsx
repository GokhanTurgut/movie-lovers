import styles from "./GoogleButton.module.css";

const GoogleButton = () => {
  return (
    <a href="http://localhost:5000/auth/google">
      <button className={styles.google + " button-base"}>
        <i className="fab fa-google"></i> Sign in with Google
      </button>
    </a>
  );
};

export default GoogleButton;
