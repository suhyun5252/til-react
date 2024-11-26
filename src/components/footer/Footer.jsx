import styles from "../../styles/components/footer/footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="#" className={styles["footer-logo"]}>
        logo
      </a>
      <p className={styles.copy}>Copyright</p>
      <div className={styles.sns}>SNS</div>
    </footer>
  );
};

export default Footer;
