import React, { useEffect } from "react";
import Head from "next/head";
import { withApollo } from "../src/lib/withApollo";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import Layout from "../src/components/layout";
import Blockquote from "../src/components/blockquote";
import Grudges from "../src/components/grudge";

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
          <Grudges />
        </Layout>
      )}
    </>
  );
}

export default withApollo()(IndexPage);
