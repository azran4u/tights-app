import { Product } from "../../../model/product/Product";
import { ProductKind } from "../../../model/product/ProductKind";
import { products } from "../../../model/product/products";

export function useProductByKind(kind: ProductKind): Product | undefined {
  return products.find((product) => product.kind === kind);
}
