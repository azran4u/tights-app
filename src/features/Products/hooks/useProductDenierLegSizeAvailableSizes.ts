import { Denier } from "../../../model/denier/Denier";
import { Leg } from "../../../model/leg/Leg";
import { ProductDenierLegSize } from "../../../model/product/ProductDenierLegSize";
import { ProductDenierLegSizeAvailableSizes } from "../../../model/product/ProductDenierLegSizeAvailableSizes";
import { Size } from "../../../model/size/Size";

export function useProductDenierLegSizeAvailableSizes(
  product: ProductDenierLegSize,
  denier: Denier,
  leg: Leg
): Size[] {
  return ProductDenierLegSizeAvailableSizes(product, denier, leg);
}
