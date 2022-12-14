import React, { useEffect, useState } from "react";
import { AddToCart, ProductImages } from "../../../components";
import {
  Color,
  Lace,
  ProductLace,
  useProductLaceAttributes,
  useProductLaceAvailableLaces,
} from "../../../model";
import styled from "styled-components";
import ColorSelector from "./ColorSelector";
import Price from "./Price";
import ProductDescription from "./ProductDescription";
import LaceSelector from "./LaceSelector";

interface SingleProductContentByLaceProps {
  product: ProductLace;
}

const SingleProductContentByLace: React.FC<SingleProductContentByLaceProps> = (
  props
) => {
  const availableLaces = useProductLaceAvailableLaces(props.product);

  const [selectedLace, setSelectedLace] = useState<Lace>(
    availableLaces?.find((x) => x.value === "lengthwise") ?? availableLaces[0]
  );

  const attributes = useProductLaceAttributes(props.product, selectedLace);

  const [selectedColor, setSelectedColor] = useState<Color | undefined>(
    attributes?.colors.find((color) => (color.value = "black")) ??
      attributes?.colors[0]
  );

  const shouldRender =
    availableLaces &&
    selectedLace &&
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
          <ProductImages
            images={attributes.images({
              color: selectedColor.value,
            })}
          />
          <ProductDescription description={props.product.description} />
          <Price price={attributes.price} />

          <LaceSelector
            laces={availableLaces}
            initialLace={selectedLace}
            selectedLace={(denier: Lace) => {
              setSelectedLace(denier);
              console.log(`selected denier ${denier.label}`);
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
          {/* <AddToCart item={cartItem()} className="center" /> */}
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
