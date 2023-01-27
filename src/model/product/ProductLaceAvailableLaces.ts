import { ProductLace } from "./ProductLace";
import { ProductPropertyLace } from "./ProductPropertyLace";

export function ProductLaceAvailableLaces(
  product: ProductLace
): ProductPropertyLace[] {
  return product.lace;
}
