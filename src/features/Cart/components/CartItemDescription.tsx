import { isNil } from "lodash";
import React from "react";
import styled from "styled-components";
import { selectColor } from "../../../model/color/selectColor";
import { selectDenier } from "../../../model/denier/selectDenier";
import { selectLace } from "../../../model/lace/selectLace";
import { selectLeg } from "../../../model/leg/selectLeg";
import { ProductSchema } from "../../../model/product/ProductSchema";
import { selectSize } from "../../../model/size/selectSize";
import { OptionalClassName } from "../../../utils/classNameInterface";
import { device } from "../../../utils/device.sizes";
import ErrorPage from "../../Error/ErrorPage";
import { useProductBySku } from "../../Products/hooks/useProductBySku";

interface CartItemDescriptionProps extends OptionalClassName {
  sku: string;
}
const CartItemDescription: React.FC<CartItemDescriptionProps> = (props) => {
  const { sku } = props;

  const productInstance = useProductBySku(sku);

  if (isNil(productInstance)) return <ErrorPage />;

  if (productInstance.schema === ProductSchema.BY_DENIER_LEG_SIZE) {
    return (
      <Wrapper className="row-value">
        <h5>{productInstance.description}</h5>
        <h5>{selectDenier(productInstance.denier).label}</h5>
        <h5>{selectLeg(productInstance.leg).label}</h5>
        <h5>{selectSize(productInstance.size).label}</h5>
        <h5>צבע {selectColor(productInstance.color).label}</h5>
      </Wrapper>
    );
  }

  if (productInstance.schema === ProductSchema.BY_LACE) {
    return (
      <Wrapper className="row-value">
        <h5>{productInstance.description}</h5>
        <h5>{selectLace(productInstance.lace).label}</h5>
        <h5>{selectSize(productInstance.size).label}</h5>
        <h5>צבע {selectColor(productInstance.color).label}</h5>
      </Wrapper>
    );
  }

  return <ErrorPage />;
};

const Wrapper = styled.div`
  @media ${device.mobile} {
    h5 {
      font-size: xx-small;
    }
  }
`;

export default CartItemDescription;
