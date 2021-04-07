import React from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_MY_UNFORGIVEN_GRUDGES } from "./UnforgivenGrudges";
import { GET_MY_FORGIVEN_GRUDGES } from "./ForgivenGrudges";
import cn from "classnames";
import styles from "./GrudgeItem.module.css";

export const UPDATE_GRUDGE_STATUS = gql`
  mutation($id: Int!, $status: Boolean!) {
    update_grudges_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
      id
    }
  }
`;

export const DELETE_GRUDGE = gql`
  mutation($id: Int!) {
    delete_grudges_by_pk(id: $id) {
      id
    }
  }
`;

export default function GrudgeItem({ grudge }) {
  const [loading, setLoading] = React.useState(false);

  const handleStatus = (grudge) => {
    setLoading(true);
    updateGrudge({
      variables: { id: +grudge.id, status: !grudge.status },
      optimisticResponse: true,
      refetchQueries: [
        { query: GET_MY_FORGIVEN_GRUDGES },
        { query: GET_MY_UNFORGIVEN_GRUDGES },
      ],
    });
  };

  const handleDelete = (id) => {
    setLoading(true);
    deleteGrudge({
      variables: { id: +id },
      optimisticResponse: true,
      refetchQueries: [
        { query: GET_MY_FORGIVEN_GRUDGES },
        { query: GET_MY_UNFORGIVEN_GRUDGES },
      ],
      onCompleted: () => setLoading(false),
    });
  };

  const [updateGrudge] = useMutation(UPDATE_GRUDGE_STATUS);
  const [deleteGrudge] = useMutation(DELETE_GRUDGE);

  return (
    <div
      className={cn(
        styles.item,
        grudge.status ? styles.forgiven : styles.unforgiven
      )}
    >
      <div className={styles.detail}>
        <h3 className={styles.title}> {grudge.person}</h3>
        <p className={styles.description}>{grudge.reason}</p>
      </div>
      <div className={styles.footer}>
        <button disabled={loading} onClick={() => handleStatus(grudge)}>
          {grudge.status ? "Unforgive" : "Forgive"}
        </button>
        <button disabled={loading} onClick={() => handleDelete(grudge.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
