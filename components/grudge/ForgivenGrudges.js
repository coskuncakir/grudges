import React from "react";
import { gql, useQuery } from "@apollo/client";
import GrudgeItem from "./GrudgeItem";
import Title from "../title";

export const GET_MY_FORGIVEN_GRUDGES = gql`
  query fetchGrudges {
    grudges(order_by: { updated_at: desc }, where: { status: { _eq: true } }) {
      id
      person
      reason
      status
    }
  }
`;

export default function ForgivenGrudges() {
  const { loading, error, data } = useQuery(GET_MY_FORGIVEN_GRUDGES);

  if (loading) return <div>Loading...</div>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <div>
      <Title>Forgiven grudges</Title>
      {data.grudges.length > 0
        ? data.grudges.map((grudge) => (
            <GrudgeItem key={grudge.id} grudge={grudge} />
          ))
        : "No forgiven grudge found"}
    </div>
  );
}
