import { isNil } from "lodash";
import { Denier } from "../denier/Denier";
import { ProductDenierLegSize } from "./ProductDenierLegSize";
import { ProductDenierLegSizeAvailableDenier } from "./ProductDenierLegSizeAvailableDenier";
import ProductPropertyLeg from "./ProductPropertyLeg";

export function ProductDenierLegSizeAvailableLegs(
  product: ProductDenierLegSize,
  denier: Denier
): ProductPropertyLeg[] {
  const foundDenier = ProductDenierLegSizeAvailableDenier(product).find(
    (d) => d.value === denier.value
  );
  if (isNil(foundDenier)) return [];

  return foundDenier.legOptions;
}
