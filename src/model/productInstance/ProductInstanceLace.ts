import { LaceOption } from "../lace/LaceOption";
import { ProductInstanceCommon } from "./ProductInstanceCommon";
import { ProductSchema } from "../product/ProductSchema";

export interface ProductInstanceLace extends ProductInstanceCommon {
  schema: ProductSchema.BY_LACE;
  lace: LaceOption;
}
