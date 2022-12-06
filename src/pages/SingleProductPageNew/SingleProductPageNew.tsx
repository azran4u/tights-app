import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductsContext } from '../../context/products_context';
import { ProductImages, Loading, PageHero } from '../../components';
import styled from 'styled-components';
import { BackToProductsButtonNew } from './BackToProductsButtonNew';
import { SingleProductContentNew } from './SingleProductContentNew';
import ErrorPage from '../ErrorPage';
import { Product, products, ProductSchema } from '../../model';

const SingleProductPageNew = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const product: Product = products[0];
    if (product.schema === ProductSchema.BY_DENIER_LEG_SIZE) {
      setImages(
        product.denier[0].legOptions[0].sizes[0].attributes.images(
          'black',
          '3XL_to_5XL'
        )
      );
    }
  });

  return (
    <Wrapper>
      {/* <PageHero title={name} isSingleProduct /> */}
      <div className="section section-center page">
        <BackToProductsButtonNew />
        <div className="product-center">
          <ProductImages images={images} />
          <SingleProductContentNew />
        </div>
      </div>
    </Wrapper>
  );
};
export default SingleProductPageNew;

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
    &:first-letter {
      text-transform: capitalize;
    }
  }
  .info {
    width: 300px;
    display: grid;
    grid-template-columns: 180px 1fr;
    margin-bottom: 1.25rem;
    &:first-letter {
      text-transform: capitalize;
    }
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;
