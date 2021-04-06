import React from "react";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./apolloClient";

let globalApolloClient = null;

async function getHeaders(ctx) {
  if (typeof window !== "undefined") return null;
  if (typeof ctx.req === "undefined") return null;

  const res = await fetch(`${process.env.APP_HOST}/api/auth/session`);
  const json = await res.json();

  if (json && json.token == null) return null;
  return {
    authorization: `Bearer ${json ? json.token : ""}`,
  };
}

const initApolloClient = (initialState, headers) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return createApolloClient(initialState, headers);
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, headers);
  }

  return globalApolloClient;
};

export const withApollo = ({ ssr = true } = {}) => (PageComponent) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    let client;
    if (apolloClient) {
      // Happens on: getDataFromTree & next.js ssr
      client = apolloClient;
    } else {
      // Happens on: next.js csr
      // client = initApolloClient(apolloState, undefined);
      client = initApolloClient(apolloState, {});
    }

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  return WithApollo;
};
