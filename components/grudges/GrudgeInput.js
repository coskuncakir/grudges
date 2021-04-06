import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import styles from "./GrudgeInput.module.css";
import { GET_MY_GRUDGES } from "./GrudgeList";

export const ADD_GRUDGE = gql`
  mutation($person: String!, $reason: String!, $user_id: String!) {
    insert_grudges_one(
      object: {
        person: $person
        reason: $reason
        user_id: $user_id
        status: false
      }
    ) {
      id
      person
      reason
      status
    }
  }
`;

export default function GrudgeInput() {
  const [session, sessionLoading] = useSession();
  const [person, setPerson] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [formLoading, setFormLoading] = React.useState(false);

  const resetInputs = () => {
    setPerson("");
    setReason("");
    setFormLoading(false);
  };

  const updateCache = (cache, { data }) => {
    const existingGrudges = cache.readQuery({ query: GET_MY_GRUDGES });
    const newGrudge = data.insert_grudges_one;
    cache.writeQuery({
      query: GET_MY_GRUDGES,
      data: { grudges: [newGrudge, ...existingGrudges.grudges] },
    });
  };

  const [addGrudge] = useMutation(ADD_GRUDGE, {
    onCompleted: resetInputs,
    update: updateCache,
  });

  return (
    <div className={styles.container}>
      <h3>Add Todo</h3>
      <form
        method="post"
        className={formLoading ? styles.formLoading : null}
        onSubmit={(e) => {
          e.preventDefault();
          setFormLoading(true);
          addGrudge({ variables: { person, reason, user_id: session.id } });
        }}
      >
        <input
          type="text"
          name="person"
          placeholder="Person"
          required
          value={person}
          onChange={(e) => setPerson(e.target.value)}
        />
        <input
          type="text"
          name="reason"
          placeholder="Reason"
          required
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
