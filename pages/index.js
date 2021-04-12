import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import { withApollo } from "../lib/withApollo";
import GrudgeWrapper from "../components/grudge/GrudgeWrapper";
import Blockquote from "../components/blockquote";

function IndexPage() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && loading) return null;
    if (!session) router.push("/auth/signin");
  }, [session, router, loading]);

  return (
    <>
      <Head>
        <title>My Grudges</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {session && router && (
        <Layout>
          <Blockquote>
            “Forgive others, not because they deserve forgiveness, but because
            you deserve peace.” ― Jonathan Lockwood Huie
          </Blockquote>
          <GrudgeWrapper />
        </Layout>
      )}
    </>
  );
}

export default withApollo()(IndexPage);
