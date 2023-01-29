import { Denier } from "../../../model/denier/Denier";
import { Leg } from "../../../model/leg/Leg";
import { ProductDenierLegSize } from "../../../model/product/ProductDenierLegSize";
import { ProductDenierLegSizeAvailableLegs } from "../../../model/product/utils/ProductDenierLegSizeAvailableLegs";

export function useProductDenierLegSizeAvailableLegs(
  product: ProductDenierLegSize,
  denier: Denier
): Leg[] {
  return ProductDenierLegSizeAvailableLegs(product, denier);
}
