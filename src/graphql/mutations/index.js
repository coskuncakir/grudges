import { gql } from "@apollo/client";

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

export const UPDATE_GRUDGE_STATUS = gql`
  mutation($id: Int!, $status: Boolean!) {
    update_grudges_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
      id
    }
  }
`;

export const DELETE_GRUDGE = gql`
  mutation($id: Int!) {
    delete_grudges_by_pk(id: $id) {
      id
    }
  }
`;
