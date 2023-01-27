import { Product } from "../../../model/product/Product";
import { products } from "../../../model/product/products";

export function useProducts(): Product[] {
  return products;
}
