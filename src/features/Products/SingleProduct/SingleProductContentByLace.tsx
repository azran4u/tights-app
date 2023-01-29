import React, { useEffect, useState } from "react";
import { AddToCart, AmountButtons, ProductImages } from "../../../shared";

import styled from "styled-components";
import ColorSelector from "./ColorSelector";
import Price from "./Price";
import ProductDescription from "./ProductDescription";
import LaceSelector from "./LaceSelector";
import ErrorMessage from "../../Error/ErorrMessage";
import { ProductLace } from "../../../model/product/ProductLace";
import { useProductLaceAvailableLaces } from "../hooks/useProductLaceAvailableLaces";
import { Lace } from "../../../model/lace/Lace";
import { useProductLaceAttributes } from "../hooks/useProductLaceAttributes";
import { Color } from "../../../model/color/Color";
import { useProductInstancesLaceBySlug } from "../hooks/useProductInstancesLaceBySlug";
import { uniq } from "lodash";
import { selectLace } from "../../../model/lace/selectLace";
import { selectColor } from "../../../model/color/selectColor";
import { CartItem } from "../../../model/cart/CartItem";

interface SingleProductContentByLaceProps {
  slug: string;
}

const SingleProductContentByLace: React.FC<SingleProductContentByLaceProps> = (
  props
) => {
  const { slug } = props;

  const productInstances = useProductInstancesLaceBySlug(slug);

  const availableLaces = uniq(productInstances.map((x) => x.lace)).map(
    selectLace
  );

  const [selectedLace, setSelectedLace] = useState<Lace>(
    availableLaces?.find((x) => x.value === "lengthwise") ?? availableLaces[0]
  );

  const availableColors = uniq(
    productInstances
      .filter((x) => x.lace === selectedLace.value)
      .map((x) => x.color)
  ).map(selectColor);

  const [selectedColor, setSelectedColor] = useState<Color>(
    availableColors.find((color) => color.value === "black") ??
      availableColors[0]
  );

  const productInstance = productInstances.filter(
    (x) => x.lace === selectedLace.value && x.color === selectedColor.value
  )[0];

  const [amount, setAmount] = useState(1);

  const increaseAmount = () => setAmount(amount + 1);
  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  function cartItem(): CartItem {
    return {
      sku: productInstance.sku,
      amount,
    };
  }

  const shouldRender =
    availableLaces &&
    availableColors &&
    selectedLace &&
    selectedColor &&
    productInstance;
  return (
    <Wrapper className="content">
      {!shouldRender && <ErrorMessage className="center" />}

      {shouldRender && (
        <>
          <ProductImages images={[productInstance.image]} />
          <ProductDescription description={productInstance.description} />
          <Price price={productInstance.price} />

          <LaceSelector
            laces={availableLaces}
            initialLace={selectedLace}
            selectedLace={(denier: Lace) => {
              setSelectedLace(denier);
              console.log(`selected denier ${denier.label}`);
            }}
          />

          <ColorSelector
            colors={availableColors}
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
`;

export default SingleProductContentByLace;
