import styles from "./input.module.css";

export default function Input({ ...props }) {
  return (
    <div className={styles.floatingForm}>
      <input id={props.name} className={styles.input} {...props} />
      <label htmlFor={props.name} className={styles.label}>
        {props.placeholder}
      </label>
    </div>
  );
}
