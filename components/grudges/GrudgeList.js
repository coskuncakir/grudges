import React from "react";
import { gql, useQuery } from "@apollo/client";
import styles from "./GrudgeList.module.css";
import GrudgeItem from "./GrudgeItem";

export const GET_MY_GRUDGES = gql`
  query fetchGrudges {
    grudges(order_by: { created_at: desc }) {
      id
      person
      reason
      status
      created_at
    }
  }
`;

export default function GrudgeList() {
  const { loading, error, data } = useQuery(GET_MY_GRUDGES);

  if (loading) return <div>Loading...</div>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <div className={styles.list}>
      {data.grudges.map((grudge) => (
        <GrudgeItem key={grudge.id} grudge={grudge} />
      ))}
    </div>
  );
}
