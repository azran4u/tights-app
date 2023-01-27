import { Product } from "../../../model/product/Product";
import { ProductKind } from "../../../model/product/ProductKind";
import { useProductByKind } from "./useProductByKind";

export function useProductByKindString(
  kindString: string
): Product | undefined {
  const kind: ProductKind = ProductKind[kindString as keyof typeof ProductKind];
  return useProductByKind(kind);
}
