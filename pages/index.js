import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import { withApollo } from "../lib/withApollo";
import Grudges from "../components/grudges";
import AccessDenied from "../components/access-denied";

function IndexPage() {
  const [session, loading] = useSession();

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <Grudges />
    </Layout>
  );
}

export default withApollo()(IndexPage);
