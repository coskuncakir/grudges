import React from "react";
import Head from "next/head";
import { useEffect } from "react";
import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import { withApollo } from "../lib/withApollo";
import AccessDenied from "../components/access-denied";
import GrudgeWrapper from "../components/grudges/GrudgeWrapper";

function IndexPage() {
  const [session, loading] = useSession();

  useEffect(() => {
    // When rendering client side don't display anything until loading is complete
    if (typeof window !== "undefined" && loading) return null;
  }, [session]);

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>My Grudges</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <GrudgeWrapper />
      </Layout>
    </>
  );
}

export default withApollo()(IndexPage);
