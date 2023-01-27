import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Product } from "../../../model";
import { imagePath } from "../../../utils/imagePath";

interface ProductsListViewProps {
  products: Product[];
}
const ProductsListView: React.FC<ProductsListViewProps> = (props) => {
  return (
    <Wrapper>
      {props.products.map((product) => {
        const { description, primaryImage: image, kind } = product;
        return (
          <div className="container">
            <Link to={`/products/${kind}`}>
              <img src={imagePath(image)} alt={description} />
            </Link>
            <h4>{description}</h4>
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
  }

  img {
    width: 9rem;
    height: 9rem;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  h4 {
    margin-bottom: 0.5rem;
  }
`;

export default ProductsListView;
