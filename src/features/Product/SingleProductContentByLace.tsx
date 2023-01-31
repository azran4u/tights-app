import React, { useState } from "react";
import { AddToCart, AmountButtons } from "../../shared";
import styled from "styled-components";
import ColorSelector from "./ColorSelector";
import Price from "./Price";
import ProductDescription from "./ProductDescription";
import LaceSelector from "./LaceSelector";
import ErrorMessage from "../Error/ErorrMessage";
import { Lace } from "../../model/lace/Lace";
import { Color } from "../../model/color/Color";
import { uniq } from "lodash";
import { selectLace } from "../../model/lace/selectLace";
import { selectColor } from "../../model/color/selectColor";
import { CartItem } from "../../model/cart/CartItem";
import { useAppSelector } from "../../store/hooks";
import { selectProductsBySlug } from "./store/productsSlice";
import { ProductLace } from "../../model/product/ProductLace";
import ProductImage from "./ProductImage";

interface SingleProductContentByLaceProps {
  slug: string;
}

const SingleProductContentByLace: React.FC<SingleProductContentByLaceProps> = (
  props
) => {
  const { slug } = props;

  const products = useAppSelector(
    selectProductsBySlug(slug)
  ) as ProductLace[];

  const availableLaces = uniq(products.map((x) => x.lace)).map(
    selectLace
  );

  const [selectedLace, setSelectedLace] = useState<Lace>(
    availableLaces?.find((x) => x.value === "lengthwise") ?? availableLaces[0]
  );

  const availableColors = uniq(
    products
      .filter((x) => x.lace === selectedLace.value)
      .map((x) => x.color)
  ).map(selectColor);

  const [selectedColor, setSelectedColor] = useState<Color>(
    availableColors.find((color) => color.value === "black") ??
      availableColors[0]
  );

  const selectedProduct = products.filter(
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
      sku: selectedProduct.sku,
      amount,
    };
  }

  const shouldRender =
    availableLaces &&
    availableColors &&
    selectedLace &&
    selectedColor &&
    selectedProduct;
  return (
    <Wrapper className="content">
      {!shouldRender && <ErrorMessage className="center" />}

      {shouldRender && (
        <>
          <ProductDescription description={selectedProduct.description} />
          <Price price={selectedProduct.price} />
          <div className="side-by-side">
            <ProductImage image={selectedProduct.image} />
            <div>
              <LaceSelector
                laces={availableLaces}
                initialLace={selectedLace}
                selectedLace={(denier: Lace) => {
                  setSelectedLace(denier);
                  console.log(`selected denier ${denier.label}`);
                }}
              />
            </div>
          </div>

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

  .side-by-side {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

export default SingleProductContentByLace;
