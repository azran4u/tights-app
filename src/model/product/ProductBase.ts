import { ProductSchema } from "./ProductSchema";

export interface ProductBase {
  schema: ProductSchema;
  description: string;
  primaryImage: string;
}
