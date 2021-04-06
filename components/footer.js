import styles from "./footer.module.css";
import { dependencies } from "../package.json";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <a href="https://github.com/nextauthjs/next-auth-example">GitHub</a>
        </li>
        <li className={styles.navItem}>
          <em>next-auth@{dependencies["next-auth"]}</em>
        </li>
      </ul>
    </footer>
  );
}
