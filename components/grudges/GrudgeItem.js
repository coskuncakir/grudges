import styles from "./GrudgeItem.module.css";
import { gql, useMutation } from "@apollo/client";
import { GET_MY_GRUDGES } from "./GrudgeList";
import { GET_MY_FORGIVEN_GRUDGES } from "./ForgivenGrudges";

export const UPDATE_GRUDGE_STATUS = gql`
  mutation($id: Int!, $status: Boolean!) {
    update_grudges_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
      id
      person
      reason
      status
    }
  }
`;

export default function GrudgeItem({ grudge }) {
  const handleStatus = (event) => {
    const status = event.target.checked;
    const id = event.target.value;
    updateGrudge({
      variables: { id: +id, status },
      optimisticResponse: true,
      refetchQueries: [
        { query: GET_MY_FORGIVEN_GRUDGES },
        { query: GET_MY_GRUDGES },
      ],
    });
  };

  const [updateGrudge] = useMutation(UPDATE_GRUDGE_STATUS);

  return (
    <div className={styles.item}>
      <input
        className={styles.checkbox}
        type="checkbox"
        value={grudge.id}
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
