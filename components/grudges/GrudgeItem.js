import styles from "./GrudgeItem.module.css";

export default function GrudgeItem({ grudge }) {
  const handleStatus = (event) => {
    console.log(event);
  };

  return (
    <div className={styles.item}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={grudge.status}
        onChange={(e) => handleStatus(e)}
      />
      <div className={styles.detail}>
        <h3 className={styles.title}> {grudge.person}</h3>
        <p className={styles.description}>{grudge.reason}</p>
      </div>
    </div>
  );
}
