import styles from "./blockquote.module.css";

export default function Blockquote({ children }) {
  return <blockquote className={styles.blockquote}>{children}</blockquote>;
}
