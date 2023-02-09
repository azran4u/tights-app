import Page from "../../shared/Page";
import { orderNumberService } from "../Order/services/orderNumberService";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import Title from "./Title";

const HomePage = () => {
  return (
    <Page>
      <button
        onClick={async () => {
          const nextOrderNumber = await orderNumberService.nextOrderNumber();
          console.log(`next order number ${nextOrderNumber}`);
        }}
      >
        next order number
      </button>
      <Title />
      <FeaturedProducts />
    </Page>
  );
};

export default HomePage;
