import { LaceOption } from "../lace/LaceOption";
import { ProductDataShared } from "./ProductDataShared";
import { ProductSchema } from "./ProductSchema";

export interface ProductDataLace extends ProductDataShared {
  schema: ProductSchema.BY_LACE;
  lace: LaceOption;
}
