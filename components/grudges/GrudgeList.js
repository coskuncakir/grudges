import React from "react";
import { gql, useQuery } from "@apollo/client";
import GrudgeItem from "./GrudgeItem";

export const GET_MY_GRUDGES = gql`
  query fetchGrudges {
    grudges(order_by: { created_at: desc }, where: { status: { _eq: false } }) {
      id
      person
      reason
      status
    }
  }
`;

export default function GrudgeList() {
  const { loading, error, data } = useQuery(GET_MY_GRUDGES);

  if (loading) return <div>Loading...</div>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <div>
      <h3>Unforgiven grudges</h3>
      {data.grudges.map((grudge) => (
        <GrudgeItem key={grudge.id} grudge={grudge} />
      ))}
    </div>
  );
}
