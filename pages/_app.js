import { Provider as NextAuthProvider } from "next-auth/client";
import "./styles.css";

export default function App({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}
