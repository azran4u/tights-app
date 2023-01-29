import { DenierOption } from "../denier/DenierOption";
import { LegOption } from "../leg/LegOption";
import { ProductInstanceCommon } from "./ProductInstanceCommon";
import { ProductSchema } from "../product/ProductSchema";

export interface ProductInstanceDenierLegSize extends ProductInstanceCommon {
  schema: ProductSchema.BY_DENIER_LEG_SIZE;
  denier: DenierOption;
  leg: LegOption;
}
