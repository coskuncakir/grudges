import { useMemo } from "react";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let apolloClient;

const httpLink = createHttpLink({
  uri: "https://grudges.hasura.app/v1/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  console.log("w: " + typeof window);
  console.log("h: " + headers);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MjI0Mzc0IiwibmFtZSI6IkNvc2t1biBDYWtpciIsImVtYWlsIjoiaGVsbG9AY29za3VuY2FraXIuY29tIiwiaW1hZ2UiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvNDIyNDM3ND92PTQiLCJpYXQiOjE2MTU1NTkxMTAuMTUxLCJleHAiOjE2MTU2NDU1MTAsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiI0MjI0Mzc0In19.xXzUInHBFm11SSuQGwCjfiUzCJ4GGjwSmQsrep1cLTc";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret":
        "6OQwraCH7HOLgFxujTHmccBPMiOsDp5Q6vH1dxY8N65FRR3XO5M7J8GE4b5NkPMF",
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
