import { isNil } from "lodash";
import React from "react";
import styled from "styled-components";
import { selectColor } from "../../../domain/entities/color/selectColor";
import { selectDenier } from "../../../domain/entities/denier/selectDenier";
import { selectLace } from "../../../domain/entities/lace/selectLace";
import { selectLeg } from "../../../domain/entities/leg/selectLeg";
import { ProductSchema } from "../../../domain/entities/product/ProductSchema";
import { selectSize } from "../../../domain/entities/size/selectSize";
import { useAppSelector } from "../../../store/hooks";
import { OptionalClassName } from "../../../utils/classNameInterface";
import { device } from "../../../utils/device.sizes";
import ErrorPage from "../../Error/ErrorPage";
import { selectProductBySku } from "../../Product/store/productsSlice";

interface CartItemDescriptionProps extends OptionalClassName {
  sku: string;
}
const CartItemDescription: React.FC<CartItemDescriptionProps> = (props) => {
  const { sku } = props;

  const product = useAppSelector(selectProductBySku(sku));

  if (isNil(product)) return <ErrorPage />;

  if (product.schema === ProductSchema.BY_DENIER_LEG_SIZE) {
    return (
      <Wrapper className="row-value">
        <h5>{product.description}</h5>
        <h5>{selectDenier(product.denier).label}</h5>
        <h5>{selectLeg(product.leg).label}</h5>
        <h5>{selectSize(product.size).label}</h5>
        <h5>צבע {selectColor(product.color).label}</h5>
      </Wrapper>
    );
  }

  if (product.schema === ProductSchema.BY_LACE) {
    return (
      <Wrapper className="row-value">
        <h5>{product.description}</h5>
        <h5>{selectLace(product.lace).label}</h5>
        <h5>{selectSize(product.size).label}</h5>
        <h5>צבע {selectColor(product.color).label}</h5>
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
