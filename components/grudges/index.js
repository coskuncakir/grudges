import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_MY_GRUDGES = gql`
  query fetchGrudges {
    grudges {
      id
      person
      reason
      status
      created_at
    }
  }
`;

export default function Grudges() {
  const { loading, error, data } = useQuery(GET_MY_GRUDGES);

  if (loading) return <div>Loading...</div>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  return (
    <>
      {data.grudges.map((grudge) => (
        <div key={grudge.id}>
          <h3>{grudge.person}</h3>
          <p>{grudge.reason}</p>
        </div>
      ))}
    </>
  );
}
