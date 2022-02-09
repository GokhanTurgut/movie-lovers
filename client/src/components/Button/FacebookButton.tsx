import classes from "./FacebookButton.module.css";

const GoogleButton = () => {
  return (
    <a href="http://localhost:5000/auth/facebook">
      <button className={classes.facebook}>
        <i className="fab fa-facebook"></i> Sign in with Facebook
      </button>
    </a>
  );
};

export default GoogleButton;
