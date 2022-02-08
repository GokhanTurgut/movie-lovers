import React from "react";
import classes from './NotFound.module.css';

function NotFound() {
  return (
    <div className={classes.container}>
      <i className="fas fa-exclamation-circle"></i>
      <h3>Page not found!</h3>
    </div>
  );
}

export default NotFound;
