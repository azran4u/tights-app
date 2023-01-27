import { ProductDenierLegSize } from "./ProductDenierLegSize";
import { ProductPropertyDenier } from "./ProductPropertyDenier";

export function ProductDenierLegSizeAvailableDenier(
  product: ProductDenierLegSize
): ProductPropertyDenier[] {
  return product.denier;
}
