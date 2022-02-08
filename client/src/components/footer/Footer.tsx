import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p>Gusto & RemoteTeam Node.js Bootcamp</p>
      <a
        href="https://github.com/GokhanTurgut"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fab fa-github"></i>
      </a>
    </footer>
  );
};

export default Footer;
