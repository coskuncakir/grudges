import { gql } from "@apollo/client";

export const FETCH_FORGIVEN_GRUDGES = gql`
  query {
    grudges(order_by: { updated_at: desc }, where: { status: { _eq: true } }) {
      id
      person
      reason
      status
    }
  }
`;

export const FETCH_UNFORGIVEN_GRUDGES = gql`
  query {
    grudges(order_by: { created_at: desc }, where: { status: { _eq: false } }) {
      id
      person
      reason
      status
    }
  }
`;
