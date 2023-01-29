import { isNil } from "lodash";
import { Denier } from "../../denier/Denier";
import { Leg } from "../../leg/Leg";
import { ProductBaseAttributes } from "../ProductBaseAttributes";
import { ProductDenierLegSize } from "../ProductDenierLegSize";
import { ProductDenierLegSizeAvailableSizes } from "./ProductDenierLegSizeAvailableSizes";
import { Size } from "../../size/Size";

export function ProductDenierLegSizeAttributes(
  product: ProductDenierLegSize,
  denier: Denier,
  leg: Leg,
  size: Size
): ProductBaseAttributes | undefined {
  const foundSize = ProductDenierLegSizeAvailableSizes(
    product,
    denier,
    leg
  ).find((x) => x.value === size.value);
  if (isNil(foundSize)) return undefined;

  return foundSize.attributes;
}
