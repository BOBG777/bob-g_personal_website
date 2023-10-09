import Link from "next/link";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/music">Music</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}

export default Header;
