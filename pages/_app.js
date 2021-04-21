import { Provider as NextAuthProvider } from "next-auth/client";
import Head from "next/head";
import "../public/styles.css";

export default function App({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Head>
        <title>My Grudges</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}
