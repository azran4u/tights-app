import { Denier } from "../../../model/denier/Denier";
import { ProductDenierLegSize } from "../../../model/product/ProductDenierLegSize";
import { ProductDenierLegSizeAvailableDenier } from "../../../model/product/utils/ProductDenierLegSizeAvailableDenier";

export function useProductDenierLegSizeAvailableDenier(
  product: ProductDenierLegSize
): Denier[] {
  return ProductDenierLegSizeAvailableDenier(product);
}
