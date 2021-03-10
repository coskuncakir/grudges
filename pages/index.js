import Layout from "../components/layout";
import { initializeApollo } from "../lib/apollo";
import { gql, useQuery } from "@apollo/client";

const FETCH_USERS = gql`
  query fetchUsers {
    users {
      id
      name
    }
  }
`;

export default function Page({ grudges }) {
  const { loading, error, data } = useQuery(FETCH_USERS);

  return (
    <Layout>
      <h1>NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href={`https://next-auth.js.org`}>NextAuth.js</a> for authentication.
      </p>
      {grudges.map((grudge) => (
        <div key={grudge.id}>
          <h3>{grudge.person}</h3>
          <p>{grudge.reason}</p>
        </div>
      ))}
      <hr />

      {data
        ? data.users.map((user) => (
            <div key={user.id}>
              <h3>{user.name}</h3>
            </div>
          ))
        : "Loading... "}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const client = initializeApollo();

  const { data } = await client.query({
    query: gql`
      query fetchGrudges {
        grudges {
          id
          person
          reason
          status
          created_at
        }
      }
    `,
  });

  return {
    props: {
      grudges: data.grudges,
    },
  };
}
