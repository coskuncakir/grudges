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
  }, [loading]);

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <GrudgeWrapper />
    </Layout>
  );
}

export default withApollo({ ssr: true })(IndexPage);
