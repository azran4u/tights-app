import React from "react";
import { CartItem } from "../../../model/cart/CartItem";
import { selectColor } from "../../../model/color/selectColor";
import { selectDenier } from "../../../model/denier/selectDenier";
import { selectLace } from "../../../model/lace/selectLace";
import { selectLeg } from "../../../model/leg/selectLeg";
import { ProductSchema } from "../../../model/product/ProductSchema";
import { selectSize } from "../../../model/size/selectSize";
import Button from "../../../shared/Button";
import { catalog } from "../../../utils/catalog-generator/catalog";
import { OptionalClassName } from "../../../utils/classNameInterface";
import ErrorPage from "../../Error/ErrorPage";

interface CartItemDescriptionProps extends OptionalClassName {
  sku: string;
}
const CartItemDescription: React.FC<CartItemDescriptionProps> = (props) => {
  const { sku } = props;

  const productInstance = catalog.find((x) => x.sku === sku)!;

  if (productInstance.schema === ProductSchema.BY_DENIER_LEG_SIZE) {
    return (
      <div className="row-value">
        <h5>{productInstance.description}</h5>
        <h5>{selectDenier(productInstance.denier).label}</h5>
        <h5>{selectLeg(productInstance.leg).label}</h5>
        <h5>{selectSize(productInstance.size).label}</h5>
        <h5>צבע {selectColor(productInstance.color).label}</h5>
      </div>
    );
  }

  if (productInstance.schema === ProductSchema.BY_LACE) {
    return (
      <div className="row-value">
        <h5>{productInstance.description}</h5>
        <h5>{selectLace(productInstance.lace).label}</h5>
        <h5>{selectSize(productInstance.size).label}</h5>
        <h5>צבע {selectColor(productInstance.color).label}</h5>
      </div>
    );
  }

  return <ErrorPage />;
};

export default CartItemDescription;
