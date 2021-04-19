import React from "react";
import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/client";
import Input from "../../input";
import { FETCH_UNFORGIVEN_GRUDGES } from "../../../graphql/queries";
import { ADD_GRUDGE } from "../../../graphql/mutations";
import Button from "../../button";
import Title from "../../title";
import cn from "classnames";
import styles from "./create.module.css";

export default function CreateGrudge() {
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
      query: FETCH_UNFORGIVEN_GRUDGES,
    });
    const newGrudge = data.insert_grudges_one;
    cache.writeQuery({
      query: FETCH_UNFORGIVEN_GRUDGES,
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
