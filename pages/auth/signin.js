import Head from "next/head";
import { providers, signIn } from "next-auth/client";
import Button from "../../components/button";
import Title from "../../components/title";
import styles from "./signin.module.css";

export default function SignIn({ providers }) {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className={styles.signin}>
        <header className={styles.header}>
          <Title headingLevel="h1">Welcome</Title>
          <p>You must be signed in to hold grudges</p>
        </header>
        <div className={styles.providers}>
          {Object.values(providers).map((provider) => (
            <Button key={provider.name} onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </Button>
          ))}
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const _providers = await providers();
  return {
    props: { providers: _providers },
  };
}