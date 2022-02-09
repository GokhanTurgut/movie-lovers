import { NavLink } from "react-router-dom";
import movieLogo from "../../assets/movie-logo.svg";
import Navigation from './Navigation'
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src={movieLogo} alt="Movie Lovers logo" />
        <NavLink to="/" className={styles.name}>
          Movie Lovers
        </NavLink>
      </div>
      <div className={styles.right}>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
