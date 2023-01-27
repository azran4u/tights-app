import styled from "styled-components";
import { FeaturedProductsHeader } from "./FeaturedProductsHeader";
import { FeaturedProductsCards } from "./FeaturedProductsCards";

const FeaturedProducts = () => {
  return (
    <Wrapper>
      <StyledFeaturedProductsHeader />
      <FeaturedProductsCards />
    </Wrapper>
  );
};

export default FeaturedProducts;

const Wrapper = styled.div`
  background-color: var(--clr-grey-10);
  min-height: 63vh;
  margin-bottom: 1rem;
`;

const StyledFeaturedProductsHeader = styled(FeaturedProductsHeader)`
  padding-top: 2rem;
`;
