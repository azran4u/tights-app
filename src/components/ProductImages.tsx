import React, { useState } from 'react';
import styled from 'styled-components';
import { imagePath } from '../utils/imagePath';

const ProductImages: React.FC<{ images: string[] | undefined }> = ({
  images = [],
}) => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <Wrapper>
      {/* <img src={imagePath(images[imageIndex])} alt="main" className="main" /> */}
      <img src={images[0]} alt="main" className="main" />
      {images.length > 1 ?? (
        <div className="gallery">
          {images.map((image, index) => {
            return (
              <img
                key={image}
                src={image}
                alt={image}
                onClick={() => setImageIndex(index)}
                className={index === imageIndex ? 'active' : undefined}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = imagePath('missing-image.svg');
                }}
              />
            );
          })}
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 10rem;
    width: 10rem;
    margin: 0 auto;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .gallery {
      img {
        height: 5rem;
      }
    }
  }
`;

export default ProductImages;
