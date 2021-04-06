import GrudgeInput from "./GrudgeInput";
import GrudgeList from "./GrudgeList";
import ForgivenGrudges from "./ForgivenGrudges";
import styles from "./GrudgeWrapper.module.css";

export default function GrudgeWrapper() {
  return (
    <div>
      <GrudgeInput />
      <div className={styles.list}>
        <GrudgeList />
        <ForgivenGrudges />
      </div>
    </div>
  );
}
