import Layout from "../components/layout";
import { withApollo } from "../lib/withApollo";
import Grudges from "../components/grudges";

function IndexPage() {
  return (
    <Layout>
      <Grudges />
    </Layout>
  );
}

export default withApollo({ ssr: true })(IndexPage);
