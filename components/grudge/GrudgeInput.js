import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import Input from "../input";
import styles from "./GrudgeInput.module.css";
import { GET_MY_UNFORGIVEN_GRUDGES } from "./UnforgivenGrudges";
import cn from "classnames";
import Button from "../button";
import Title from "../title";

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
    const existingGrudges = cache.readQuery({
      query: GET_MY_UNFORGIVEN_GRUDGES,
    });
    const newGrudge = data.insert_grudges_one;
    cache.writeQuery({
      query: GET_MY_UNFORGIVEN_GRUDGES,
      data: { grudges: [newGrudge, ...existingGrudges.grudges] },
    });
  };

  const [addGrudge] = useMutation(ADD_GRUDGE, {
    onCompleted: resetInputs,
    update: updateCache,
  });

  return (
    <div className={styles.container}>
      <Title>Add Grudge</Title>
      <form
        method="post"
        className={cn(styles.form, formLoading ? styles.formLoading : null)}
        onSubmit={(e) => {
          e.preventDefault();
          setFormLoading(true);
          addGrudge({ variables: { person, reason, user_id: session.id } });
        }}
      >
        <Input
          type="text"
          name="reason"
          placeholder="Person"
          value={person}
          onChange={(e) => setPerson(e.target.value)}
          required
        />
        <Input
          type="text"
          name="person"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <Button type="submit">ADD</Button>
      </form>
    </div>
  );
}

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
