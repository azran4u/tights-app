import React from 'react';
import styled from 'styled-components';
import { BackToProductsButtonNew } from './BackToProductsButtonNew';
import { ProductSchema, useProductByKindString } from '../../model';
import SingleProductContentByDenierLegSize from './SingleProductContentByDenierLegSize';
import SingleProductContentByLace from './SingleProductContentByLace';
import { useParams } from 'react-router-dom';

const SingleProductPageNew: React.FC = () => {
  const { kind } = useParams<{ kind: string }>();
  const product = useProductByKindString(kind);

  return (
    <Wrapper>
      {product && (
        <div className="section section-center page">
          <BackToProductsButtonNew />
          <div className="product-center">
            {product.schema === ProductSchema.BY_DENIER_LEG_SIZE && (
              <SingleProductContentByDenierLegSize product={product} />
            )}
            {product.schema === ProductSchema.BY_LACE && (
              <SingleProductContentByLace product={product} />
            )}
          </div>
        </div>
      )}
    </Wrapper>
  );
};
export default SingleProductPageNew;

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 1rem;
    margin-top: 1rem;
  }

  @media (min-width: 992px) {
    .product-center {
      display: flex;
      justify-content: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;
