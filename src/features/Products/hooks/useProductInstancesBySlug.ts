import { isNil } from "lodash";
import { ProductInstance } from "../../../model/productInstance/ProductInstance";
import { useProducts } from "./useProducts";

export function useProductInstancesBySlug(slug: string): ProductInstance[] {
  if (isNil(slug)) throw new Error(`invalid slug ${slug}`);
  const productInstances = useProducts();
  return productInstances.filter((x) => x.slug === slug);
}
