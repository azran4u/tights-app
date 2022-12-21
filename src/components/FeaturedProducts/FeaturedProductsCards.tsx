import styled from 'styled-components';
import { ProductKind, ProductSchema, useProducts } from '../../model';
import { device } from '../../utils/device.sizes';
import { imageSrc, productDefaultImage } from '../../utils/images';
import SingleProduct from '../Product';

export const FeaturedProductsCards = () => {
  const products = useProducts();

  return (
    <Wrapper>
      {products &&
        products.map((product) => {
          return (
            <SingleProduct
              key={product.kind}
              image={productDefaultImage(product)}
              kind={product.kind}
              description={product.description}
            />
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
