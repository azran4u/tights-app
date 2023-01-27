import React, { useState } from "react";
import { AddToCart, AmountButtons, ProductImages } from "../../../shared";
import {
  CartItem,
  Color,
  Denier,
  Leg,
  ProductDenierLegSize,
  Size,
  useProductDenierLegSizeAttributes,
  useProductDenierLegSizeAvailableDenier,
  useProductDenierLegSizeAvailableLegs,
  useProductDenierLegSizeAvailableSizes,
} from "../../../model";
import styled from "styled-components";
import ColorSelector from "./ColorSelector";
import LegSelector from "./LegSelector";
import SizeSelector from "./SizeSelector";
import DenierSelector from "./DenierSelector";
import Price from "./Price";
import ProductDescription from "./ProductDescription";
import { imageSrcByDenierLegSize } from "../../../utils/images";
import ErrorMessage from "../../Error/ErorrMessage";

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
    availableDeniers.find((denier) => denier.value === "200") ??
      availableDeniers[0]
  );

  const availableLegs = useProductDenierLegSizeAvailableLegs(
    props.product,
    selectedDenier
  );
  const [selectedLeg, setSelectedLeg] = useState<Leg>(
    availableLegs.find((leg) => leg.value === "without-leg") ?? availableLegs[0]
  );

  const availableSizes = useProductDenierLegSizeAvailableSizes(
    props.product,
    selectedDenier,
    selectedLeg
  );
  const [selectedSize, setSelectedSize] = useState<Size>(
    availableSizes.find((size) => size.value === "onesize") ?? availableSizes[0]
  );

  const attributes = useProductDenierLegSizeAttributes(
    props.product,
    selectedDenier,
    selectedLeg,
    selectedSize
  );

  const [selectedColor, setSelectedColor] = useState<Color | undefined>(
    attributes?.colors.find((color) => (color.value = "black")) ??
      attributes?.colors[0]
  );

  const [amount, setAmount] = useState(1);

  const increaseAmount = () => setAmount(amount + 1);
  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

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
    <Wrapper>
      {!shouldRender && <ErrorMessage className="center" />}

      {shouldRender && (
        <>
          <ProductDescription description={props.product.description} />
          <Price price={attributes.price} />
          <div className="side-by-side">
            <ProductImages
              images={imageSrcByDenierLegSize({
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
          <AddToCart item={cartItem()} className="center" />
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
