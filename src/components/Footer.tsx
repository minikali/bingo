import React from "react";
import styles from "@/styles/Footer.module.css";
import Link from "next/link";
import cx from "classnames";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={cx(styles.footer, className)} {...props}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <Link href="/terms-of-use">Terms of Use</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>
        <p className={styles.footerText}>
          Bingo Draw App &copy; 2023. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
