import styles from "./button.module.css";
import cn from "classnames";

export default function Button({ children, variant = "primary", ...props }) {
  return (
    <button className={cn(styles.button, styles[variant])} {...props}>
      {children}
    </button>
  );
}
