import { useMemo } from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "https://grudges.hasura.app/v1/graphql",
      headers: {
        "x-hasura-admin-secret":
          "6OQwraCH7HOLgFxujTHmccBPMiOsDp5Q6vH1dxY8N65FRR3XO5M7J8GE4b5NkPMF",
      },
    }),
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
