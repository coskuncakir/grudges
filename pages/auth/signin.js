import Head from "next/head";
import { providers, signIn } from "next-auth/client";
import Button from "../../src/components/button";
import Title from "../../src/components/title";
import styles from "./signin.module.css";

export default function SignIn({ providers }) {
  return (
    <>
      <Head>
        <title>Login</title>
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
