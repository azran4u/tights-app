import { isEmpty } from "lodash";
import { ProductSchema } from "../../../model/product/ProductSchema";
import { useProductInstancesBySlug } from "./useProductInstancesBySlug";

export function useProductInstancesSchemaBySlug(slug: string): ProductSchema {
  const productInstances = useProductInstancesBySlug(slug);
  if (isEmpty(productInstances))
    throw new Error(`no product instances for slug ${slug}`);
  return productInstances[0].schema;
}
