import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import movieLogo from "../../assets/movie-logo.svg";
import classes from "./Header.module.css";

interface Props {}

const Header = (props: Props) => {
  return (
    <header className={classes.header}>
      <div className={classes.left}>
        <img src={movieLogo} alt="Movie Lovers logo" />
        <NavLink to="/" className={classes.name}>
          Movie Lovers
        </NavLink>
      </div>
      <div className={classes.right}>
        <NavLink to="/signin">
          <Button variant="text">Sign In</Button>
        </NavLink>
        <NavLink to="/signup">
          <Button variant="outlined">Sign Up</Button>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
