import { ProductInstance } from "../../../model/productInstance/ProductInstance";
import { catalog } from "../../../utils/catalog-generator/catalog";

export function useProducts(): ProductInstance[] {
  return catalog;
}
