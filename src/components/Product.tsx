import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductKind } from '../model';

interface ProductProps {
  image: string;
  description: string;
  kind: ProductKind;
}

const SingleProduct: React.FC<ProductProps> = ({
  kind,
  image,
  description,
}) => {
  return (
    <Wrapper>
      <Link to={`/products/${kind}`}>
        <img src={image} alt={description} />
      </Link>
      <h5>{description}</h5>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  img {
    display: block;
    height: 10rem;
    width: 100%;
    object-fit: cover;
  }

  h5 {
    margin-top: 1rem;
  }
`;
export default SingleProduct;
