import { isNil } from "lodash";
import { ProductInstance } from "../../../model/productInstance/ProductInstance";
import { useProducts } from "./useProducts";

export function useProductInstancesBySku(sku: string): ProductInstance {
  if (isNil(sku)) throw new Error(`invalid sku ${sku}`);
  const productInstances = useProducts();
  return productInstances.find((x) => x.sku === sku)!;
}
