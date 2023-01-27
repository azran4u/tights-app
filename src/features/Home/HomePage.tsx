import { FeaturedProducts } from "../../shared";
import Page from "../../shared/Page";
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
