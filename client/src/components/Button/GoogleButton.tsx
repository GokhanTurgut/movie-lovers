import classes from "./GoogleButton.module.css";

const GoogleButton = () => {
  return (
    <a href="http://localhost:5000/auth/google">
      <button className={classes.google}>
        <i className="fab fa-google"></i> Sign in with Google
      </button>
    </a>
  );
};

export default GoogleButton;
