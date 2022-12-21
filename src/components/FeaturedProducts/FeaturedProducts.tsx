import styled from 'styled-components';
import { FeaturedProductsHeader } from './FeaturedProductsHeader';
import { FeaturedProductsCards } from './FeaturedProductsCards';
import { device } from '../../utils/device.sizes';

const FeaturedProducts = () => {
  return (
    <div className="nice-background">
      <StyledFeaturedProductsHeader />
      <FeaturedProductsCards />
    </div>
  );
};

export default FeaturedProducts;

const StyledFeaturedProductsHeader = styled(FeaturedProductsHeader)`
  padding-top: 2rem;
`;
