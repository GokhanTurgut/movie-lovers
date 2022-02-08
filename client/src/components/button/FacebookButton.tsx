import React from "react";
import classes from './FacebookButton.module.css'

type Props = {};

const GoogleButton = (props: Props) => {
  return (
    <button className={classes.facebook}>
      <i className="fab fa-facebook"></i> Sign in with Facebook
    </button>
  );
};

export default GoogleButton;