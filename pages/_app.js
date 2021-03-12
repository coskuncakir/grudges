import { Provider as NextAuthProvider } from "next-auth/client";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";
import "./styles.css";

export default function App({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloProps);
  return (
    <NextAuthProvider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </NextAuthProvider>
  );
}
