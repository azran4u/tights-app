import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Product } from '../model';
import { imagePath } from '../utils/imagePath';

interface ListViewProps {
  products: Product[];
}
const ListViewNew: React.FC<ListViewProps> = (props) => {
  return (
    <Wrapper>
      {props.products.map((product) => {
        const { description, image, kind } = product;
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
  /* .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  } */

  /* @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  } */
`;

export default ListViewNew;
