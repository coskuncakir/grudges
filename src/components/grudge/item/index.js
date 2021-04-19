import React from "react";
import Button from "../../button";
import { useMutation } from "@apollo/client";
import {
  FETCH_UNFORGIVEN_GRUDGES,
  FETCH_FORGIVEN_GRUDGES,
} from "../../../graphql/queries";
import {
  UPDATE_GRUDGE_STATUS,
  DELETE_GRUDGE,
} from "../../../graphql/mutations";
import cn from "classnames";
import styles from "./item.module.css";

export default function GrudgeItem({ grudge }) {
  const [loading, setLoading] = React.useState(false);

  const handleStatus = (grudge) => {
    setLoading(true);
    updateGrudge({
      variables: { id: +grudge.id, status: !grudge.status },
      optimisticResponse: true,
      refetchQueries: [
        { query: FETCH_FORGIVEN_GRUDGES },
        { query: FETCH_UNFORGIVEN_GRUDGES },
      ],
    });
  };

  const handleDelete = (id) => {
    setLoading(true);
    deleteGrudge({
      variables: { id: +id },
      optimisticResponse: true,
      refetchQueries: [
        { query: FETCH_FORGIVEN_GRUDGES },
        { query: FETCH_UNFORGIVEN_GRUDGES },
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
        grudge.status ? styles.forgiven : styles.unforgiven,
        loading ? styles.loading : null
      )}
    >
      <div className={styles.detail}>
        <h3 className={styles.title}> {grudge.person}</h3>
        <p className={styles.description}>{grudge.reason}</p>
      </div>
      <div className={styles.footer}>
        <Button onClick={() => handleStatus(grudge)} variant="secondary">
          {grudge.status ? "Unforgive" : "Forgive"}
        </Button>
        <Button onClick={() => handleDelete(grudge.id)} variant="secondary">
          Delete
        </Button>
      </div>
    </div>
  );
}
