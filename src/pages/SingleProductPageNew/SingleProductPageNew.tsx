import React from 'react';
import styled from 'styled-components';
import { BackToProductsButtonNew } from './BackToProductsButtonNew';
import { ProductSchema, useProductByKindString } from '../../model';
import SingleProductContentByDenierLegSize from './SingleProductContentByDenierLegSize';
import SingleProductContentByLace from './SingleProductContentByLace';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';

const SingleProductPageNew: React.FC = () => {
  const { kind } = useParams<{ kind: string }>();
  const product = useProductByKindString(kind);

  return (
    <Page>
      <Wrapper>
        {product && (
          <div>
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
    </Page>
  );
};
export default SingleProductPageNew;

const Wrapper = styled.main`
  margin: 0 1rem;
  .product-center {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
`;
