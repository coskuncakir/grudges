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
        <meta property="og:title" content="Grudge Tracker" />
        <meta
          property="og:description"
          content="Save and track your grudges and of course forgive them."
        />
        <meta property="og:image" content="/cersei.jpg" />
        <meta property="og:url" content="https://grudges.vercel.app" />
      </Head>
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}
