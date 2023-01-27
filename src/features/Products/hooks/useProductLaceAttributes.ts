import { Lace } from "../../../model/lace/Lace";
import { ProductBaseAttributes } from "../../../model/product/ProductBaseAttributes";
import { ProductLace } from "../../../model/product/ProductLace";
import { ProductLaceAttributes } from "../../../model/product/ProductLaceAttributes";

export function useProductLaceAttributes(
  product: ProductLace,
  lace: Lace
): ProductBaseAttributes | undefined {
  return ProductLaceAttributes(product, lace);
}
