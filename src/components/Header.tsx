import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/Header.module.css";
import cx from "classnames";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header = ({ className, ...props }: HeaderProps) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const handleMenuToggle = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <header className={cx(styles.header, className)}>
      <div className={styles.logo}>
        <Link href="/">Bingo Draw</Link>
      </div>

      {/* <div
        className={classNames(styles.burger, { [styles.open]: isOpen })}
        onClick={handleMenuToggle}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={classNames(styles.navigation, { [styles.open]: isOpen })}>
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
      </nav> */}
    </header>
  );
};

export default Header;
