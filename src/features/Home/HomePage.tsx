import { FeaturedProducts } from "../../components";
import Page from "../../components/old/Page";
import Title from "./Title";

const HomePage = () => {
  return (
    <Page>
      <Title />
      <FeaturedProducts />
    </Page>
  );
};

export default HomePage;
