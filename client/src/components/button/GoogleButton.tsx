import React from "react";
import classes from './GoogleButton.module.css'

type Props = {};

const GoogleButton = (props: Props) => {
  return (
    <button className={classes.google}>
      <i className="fab fa-google"></i> Sign in with Google
    </button>
  );
};

export default GoogleButton;
