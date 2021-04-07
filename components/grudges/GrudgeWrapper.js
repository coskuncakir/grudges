import GrudgeInput from "./GrudgeInput";
import UnforgivenGrudges from "./UnforgivenGrudges";
import ForgivenGrudges from "./ForgivenGrudges";
import styles from "./GrudgeWrapper.module.css";

export default function GrudgeWrapper() {
  return (
    <div>
      <GrudgeInput />
      <div className={styles.list}>
        <UnforgivenGrudges />
        <ForgivenGrudges />
      </div>
    </div>
  );
}
