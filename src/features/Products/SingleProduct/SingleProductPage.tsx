import React from "react";
import styled from "styled-components";
import { BackToProductsButton } from "./BackToProductsButton";
import { ProductSchema, useProductByKindString } from "../../../model";
import SingleProductContentByDenierLegSize from "./SingleProductContentByDenierLegSize";
import SingleProductContentByLace from "./SingleProductContentByLace";
import { useParams } from "react-router-dom";
import Page from "../../../shared/Page";

const SingleProductPage: React.FC = () => {
  const { kind } = useParams<{ kind: string }>();
  const product = useProductByKindString(kind);

  return (
    <Page>
      <Wrapper>
        {product && (
          <>
            <BackToProductsButton className="product-center" />
            {product.schema === ProductSchema.BY_DENIER_LEG_SIZE && (
              <SingleProductContentByDenierLegSize product={product} />
            )}
            {product.schema === ProductSchema.BY_LACE && (
              <SingleProductContentByLace product={product} />
            )}
          </>
        )}
      </Wrapper>
    </Page>
  );
};
export default SingleProductPage;

const Wrapper = styled.main`
  margin: 1rem 1rem;
  .product-center {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
`;
