import React from "react";
import { gql, useQuery } from "@apollo/client";
import GrudgeItem from "../item";
import Title from "../../title";
import { FETCH_UNFORGIVEN_GRUDGES } from "../../../graphql/queries";

export default function UnforgivenGrudges() {
  const { loading, error, data } = useQuery(FETCH_UNFORGIVEN_GRUDGES);

  if (loading) return <div>Loading...</div>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <div>
      <Title>Unforgiven grudges</Title>
      {data.grudges.length > 0
        ? data.grudges.map((grudge) => (
            <GrudgeItem key={grudge.id} grudge={grudge} />
          ))
        : "No unforgiven grudge found"}
    </div>
  );
}
