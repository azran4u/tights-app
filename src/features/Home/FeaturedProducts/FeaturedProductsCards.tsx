import styled from "styled-components";
import { device } from "../../../utils/device.sizes";
import { useFeatureProducts } from "../../Products/hooks/useFeatureProducts";
import FeaturedProductComponent from "./FeaturedProduct";

export const FeaturedProductsCards = () => {
  const products = useFeatureProducts();

  return (
    <Wrapper>
      {products &&
        products.map((product) => {
          return (
            <FeaturedProductComponent product={product} key={product.slug} />
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem 1rem 0 1rem;
  margin: 1rem auto 0 auto;
  display: grid;
  gap: 2rem;
  width: 90vw;

  @media ${device.desktop} {
    grid-template-columns: repeat(4, 1fr);
    min-height: 46vh;
  }
`;
