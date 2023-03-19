import Link from "next/link";
import { useState } from "react";
import styles from "@/styles/Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Bingo Draw</Link>
      </div>
      <nav
        className={
          menuOpen ? `${styles.navigation} ${styles.open}` : styles.navigation
        }
      >
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.burger} onClick={handleMenuToggle}>
        <div
          className={menuOpen ? `${styles.line} ${styles.line1}` : styles.line}
        ></div>
        <div
          className={menuOpen ? `${styles.line} ${styles.line2}` : styles.line}
        ></div>
        <div
          className={menuOpen ? `${styles.line} ${styles.line3}` : styles.line}
        ></div>
      </div>
    </header>
  );
};

export default Header;
