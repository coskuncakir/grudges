import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { onError } from "apollo-link-error";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

let accessToken = null;

const requestAccessToken = async () => {
  if (accessToken) return;

  const res = await fetch(`/api/session`);
  if (res.ok) {
    const json = await res.json();
    accessToken = json.token;
  } else {
    accessToken = "public";
  }
};

// remove cached token on 401 from the server
const resetTokenLink = onError(({ networkError }) => {
  console.log(networkError);
  if (
    networkError &&
    networkError.name === "ServerError" &&
    networkError.statusCode === 401
  ) {
    accessToken = null;
  }
});

const createHttpLink = (headers) => {
  const httpLink = new HttpLink({
    uri: "https://grudges.hasura.app/v1/graphql",
    credentials: "include",
    headers, // auth token is fetched on the server side
  });
  return httpLink;
};

const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient("wss://grudges.hasura.app/v1/graphql", {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        await requestAccessToken(); // happens on the client
        return {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        };
      },
    })
  );
};

export default function createApolloClient(initialState, headers) {
  const ssrMode = typeof window === "undefined";
  let link;
  if (ssrMode) {
    link = createHttpLink(headers);
  } else {
    link = createWSLink();
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  });
}
