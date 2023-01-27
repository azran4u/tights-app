import { Lace } from "../../../model/lace/Lace";
import { ProductLace } from "../../../model/product/ProductLace";
import { ProductLaceAvailableLaces } from "../../../model/product/ProductLaceAvailableLaces";

export function useProductLaceAvailableLaces(product: ProductLace): Lace[] {
  return ProductLaceAvailableLaces(product);
}
