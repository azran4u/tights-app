import { no_discount } from "../../model/discount/constants/no_discount";
import { Product } from "../../model/product/Product";
import { ProductKind } from "../../model/product/ProductKind";
import { ProductLace } from "../../model/product/ProductLace";
import { ProductSchema } from "../../model/product/ProductSchema";
import { selectColors } from "../../model/color/selectColors";
import { selectLace } from "../../model/lace/selectLace";

export const LACE_FAN_TIGHTS: ProductLace = {
  schema: ProductSchema.BY_LACE,
  kind: ProductKind.LACE_FAN_TIGHTS,
  description: "תחרה מניפה טייץ onesize",
  primaryImage: "legging-bordeaux.jpg",
  lace: [
    {
      ...selectLace("fan"),
      attributes: {
        colors: selectColors(["black", "white"]),
        price: 25,
        discount: no_discount,
        supplier: "sharon",
        images: () => [],
      },
    },
    {
      ...selectLace("lengthwise"),
      attributes: {
        colors: selectColors(["black", "white"]),
        price: 25,
        discount: no_discount,
        supplier: "sharon",
        images: () => [],
      },
    },
  ],
};
