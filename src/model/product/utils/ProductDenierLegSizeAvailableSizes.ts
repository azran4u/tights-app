import { isNil } from "lodash";
import { Denier } from "../../denier/Denier";
import { Leg } from "../../leg/Leg";
import { ProductDenierLegSize } from "../ProductDenierLegSize";
import { ProductDenierLegSizeAvailableLegs } from "./ProductDenierLegSizeAvailableLegs";
import { ProductPropertySize } from "../ProductPropertySize";

export function ProductDenierLegSizeAvailableSizes(
  product: ProductDenierLegSize,
  denier: Denier,
  leg: Leg
): ProductPropertySize[] {
  const foundLeg = ProductDenierLegSizeAvailableLegs(product, denier).find(
    (x) => x.value === leg.value
  );
  if (isNil(foundLeg)) return [];

  return foundLeg.sizes;
}
