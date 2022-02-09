import { NavLink } from "react-router-dom";
import movieLogo from "../../assets/movie-logo.svg";
import Navigation from './Navigation'
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.left}>
        <img src={movieLogo} alt="Movie Lovers logo" />
        <NavLink to="/" className={classes.name}>
          Movie Lovers
        </NavLink>
      </div>
      <div className={classes.right}>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
