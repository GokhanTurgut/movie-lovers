import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/GokhanTurgut"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fab fa-github"></i>
      </a>
      <p>Gusto & RemoteTeam Node.js Bootcamp</p>
    </footer>
  );
};

export default Footer;
