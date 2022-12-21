import React, { useEffect, useState } from 'react';
import { AddToCart, AmountButtons, ProductImages } from '../../components';
import {
  CartItem,
  Color,
  Denier,
  Leg,
  ProductDenierLegSize,
  ProductSchema,
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
import Button from '../../components/Button';
import { useCartContext } from '../../context/cart_context';
import { imageSrc } from '../../utils/images';

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
    availableLegs.find((leg) => leg.value === 'without-leg') ?? availableLegs[0]
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

  const [amount, setAmount] = useState(1);

  const increaseAmount = () => setAmount(amount + 1);
  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const { items, addToCart } = useCartContext();

  useEffect(() => {
    console.log(
      `cart changed ${JSON.stringify(Array.from(items.entries()), null, 4)}`
    );
  }, [items]);

  function cartItem(): CartItem {
    return {
      schema: props.product.schema,
      denier: selectedDenier.value,
      leg: selectedLeg.value,
      size: selectedSize.value,
      color: selectedColor?.value!,
      amount,
    };
  }

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
          <div className="side-by-side">
            <ProductImages
              images={imageSrc({
                schema: ProductSchema.BY_DENIER_LEG_SIZE,
                denier: selectedDenier.value,
                color: selectedColor.value,
              })}
            />
            <div>
              {availableDeniers.length > 1 && (
                <DenierSelector
                  deniers={availableDeniers}
                  initialDenier={selectedDenier}
                  selectedDenier={(denier: Denier) => {
                    setSelectedDenier(denier);
                    console.log(`selected denier ${denier.label}`);
                  }}
                />
              )}

              <LegSelector
                legs={availableLegs}
                initialLeg={selectedLeg}
                selectedLeg={(leg: Leg) => {
                  setSelectedLeg(leg);
                  console.log(`selected leg ${leg.label}`);
                }}
              />

              {availableSizes.length > 1 && (
                <SizeSelector
                  sizes={availableSizes}
                  initialSize={selectedSize}
                  selectedSize={(size: Size) => {
                    setSelectedSize(size);
                    console.log(`selected size is ${size.label}`);
                  }}
                />
              )}
            </div>
          </div>
          <ColorSelector
            colors={attributes.colors}
            initialColor={selectedColor}
            selectedColor={(color: Color) => {
              setSelectedColor(color);
              console.log(`selected color ${color.label}`);
            }}
          />
          <hr />
          <AmountButtons
            className="center"
            amount={amount}
            increase={increaseAmount}
            decrease={decreaseAmount}
          />
          <Button
            className="center"
            text="הוסף לעגלה"
            onClick={() => {
              const item = cartItem();
              console.log(`add to cart ${JSON.stringify(item, null, 4)}`);
              addToCart(item);
            }}
          />
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

  .side-by-side {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

export default SingleProductContentByDenierLegSize;
