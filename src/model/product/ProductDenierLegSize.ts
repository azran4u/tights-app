import { ProductBase } from "./ProductBase";
import { ProductSchema } from "./ProductSchema";
import { ProductKind } from "./ProductKind";
import { ProductPropertyDenier } from "./ProductPropertyDenier";

export interface ProductDenierLegSize extends ProductBase {
  schema: ProductSchema.BY_DENIER_LEG_SIZE;
  kind:
    | ProductKind.TIGHTS_OR_STOCKING_200_DENIER
    | ProductKind.TIGHTS_OR_STOCKING_GIRLS_120_DENIER
    | ProductKind.TIGHTS_OR_STOCKING_20_OR_40_DENIER;
  denier: ProductPropertyDenier[];
}
