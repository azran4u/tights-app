import { ProductBase } from "./ProductBase";
import { ProductPropertyLace } from "./ProductPropertyLace";
import { ProductSchema } from "./ProductSchema";
import { ProductKind } from "./ProductKind";

export interface ProductLace extends ProductBase {
  schema: ProductSchema.BY_LACE;
  kind: ProductKind.LACE_FAN_TIGHTS;
  lace: ProductPropertyLace[];
}
