import { ProductSchema } from "../../../model/product/ProductSchema";
import { ProductInstanceLace } from "../../../model/productInstance/ProductInstanceLace";
import { useProductInstancesBySlug } from "./useProductInstancesBySlug";

export function useProductInstancesLaceBySlug(
  slug: string
): ProductInstanceLace[] {
  const productInstances = useProductInstancesBySlug(slug);
  const allProductsAreLace = productInstances.every(
    (x) => x.schema === ProductSchema.BY_LACE
  );

  if (allProductsAreLace) return productInstances as ProductInstanceLace[];

  return [];
}
