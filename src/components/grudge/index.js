import CreateGrudge from "./create";
import UnforgivenGrudges from "./unforgiven";
import ForgivenGrudges from "./forgiven";
import styles from "./index.module.css";

export default function Grudges() {
  return (
    <div>
      <CreateGrudge />
      <div className={styles.list}>
        <UnforgivenGrudges />
        <ForgivenGrudges />
      </div>
    </div>
  );
}
