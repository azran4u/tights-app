import { ProductSchema } from "../../../model/product/ProductSchema";
import { ProductInstanceDenierLegSize } from "../../../model/productInstance/ProductInstanceDenierLegSize";
import { useProductInstancesBySlug } from "./useProductInstancesBySlug";

export function useProductInstancesDlsBySlug(
  slug: string
): ProductInstanceDenierLegSize[] {
  const productInstances = useProductInstancesBySlug(slug);
  const allProductsAreDls = productInstances.every(
    (x) => x.schema === ProductSchema.BY_DENIER_LEG_SIZE
  );

  if (allProductsAreDls)
    return productInstances as ProductInstanceDenierLegSize[];

  return [];
}
