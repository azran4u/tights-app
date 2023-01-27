import { DenierOption } from "../denier/DenierOption";
import { LegOption } from "../leg/LegOption";
import { ProductDataShared } from "./ProductDataShared";
import { ProductSchema } from "./ProductSchema";
import { SizeOption } from "../size/SizeOption";

export interface ProductDataDenierLegSize extends ProductDataShared {
  schema: ProductSchema.BY_DENIER_LEG_SIZE;
  denier: DenierOption;
  leg: LegOption;
  size: SizeOption;
}
