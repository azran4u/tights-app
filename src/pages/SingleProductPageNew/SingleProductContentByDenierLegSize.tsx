import React, { useEffect, useState } from 'react';
import { AddToCart } from '../../components';
import {
  Color,
  Denier,
  Leg,
  ProductDenierLegSize,
  Size,
  useProductDenierLegSizeAttributes,
  useProductDenierLegSizeAvailableDenier,
  useProductDenierLegSizeAvailableLegs,
  useProductDenierLegSizeAvailableSizes,
} from '../../model';
import styled from 'styled-components';
import ColorSelector from './ColorSelector';
import LegSelector from './LegSelector';
import SizeSelector from './SizeSelector';
import DenierSelector from './DenierSelector';
import Price from './Price';
import ProductDescription from './ProductDescription';

interface SingleProductContentByDenierLegSizeProps {
  product: ProductDenierLegSize;
}

const SingleProductContentByDenierLegSize: React.FC<
  SingleProductContentByDenierLegSizeProps
> = (props) => {
  const availableDeniers = useProductDenierLegSizeAvailableDenier(
    props.product
  );

  const [selectedDenier, setSelectedDenier] = useState<Denier>(
    availableDeniers.find((denier) => denier.value === '200') ??
      availableDeniers[0]
  );

  const availableLegs = useProductDenierLegSizeAvailableLegs(
    props.product,
    selectedDenier
  );
  const [selectedLeg, setSelectedLeg] = useState<Leg>(
    availableLegs.find((leg) => leg.value === 'with-leg') ?? availableLegs[0]
  );

  const availableSizes = useProductDenierLegSizeAvailableSizes(
    props.product,
    selectedDenier,
    selectedLeg
  );
  const [selectedSize, setSelectedSize] = useState<Size>(
    availableSizes.find((size) => size.value === 'onesize') ?? availableSizes[0]
  );

  const attributes = useProductDenierLegSizeAttributes(
    props.product,
    selectedDenier,
    selectedLeg,
    selectedSize
  );

  const [selectedColor, setSelectedColor] = useState<Color | undefined>(
    attributes?.colors.find((color) => (color.value = 'black')) ??
      attributes?.colors[0]
  );

  const shouldRender =
    availableDeniers &&
    availableLegs &&
    availableSizes &&
    selectedDenier &&
    selectedLeg &&
    selectedSize &&
    selectedColor &&
    attributes &&
    attributes.price &&
    attributes?.colors.length > 1;

  return (
    <Wrapper className="content">
      {!shouldRender && (
        <>
          <h5 className="center">אופס... משהו השתבש</h5>
          <h5 className="center">רענן את הדף</h5>
        </>
      )}

      {shouldRender && (
        <>
          <ProductDescription description={props.product.description} />
          <Price price={attributes.price} />
          <DenierSelector
            deniers={availableDeniers}
            initialDenier={selectedDenier}
            selectedDenier={(denier: Denier) => {
              setSelectedDenier(denier);
              console.log(`selected denier ${denier.label}`);
            }}
          />
          <LegSelector
            legs={availableLegs}
            initialLeg={selectedLeg}
            selectedLeg={(leg: Leg) => {
              setSelectedLeg(leg);
              console.log(`selected leg ${leg.label}`);
            }}
          />

          <SizeSelector
            sizes={availableSizes}
            initialSize={selectedSize}
            selectedSize={(size: Size) => {
              setSelectedSize(size);
              console.log(`selected size is ${size.label}`);
            }}
          />

          <ColorSelector
            colors={attributes.colors}
            initialColor={selectedColor}
            selectedColor={(color: Color) => {
              setSelectedColor(color);
              console.log(`selected color ${color.label}`);
            }}
          />
          <hr />
          <AddToCart singleProduct={{}} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .center {
    margin-top: 1rem;
    margin: 0 auto;
  }
`;

export default SingleProductContentByDenierLegSize;
