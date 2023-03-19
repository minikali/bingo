import React from "react";
import styles from "@/styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <a href="/terms-of-use">Terms of Use</a>
          <a href="/cookie-policy">Cookie Policy</a>
          <a href="/disclaimer">Disclaimer</a>
        </div>
        <p className={styles.footerText}>
          Bingo Draw App &copy; 2023. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
