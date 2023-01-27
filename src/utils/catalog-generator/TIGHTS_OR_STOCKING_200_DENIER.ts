import { discount_3_in_60 } from "../../model/discount/constants/discount_3_in_60";
import { no_discount } from "../../model/discount/constants/no_discount";
import { Product } from "../../model/product/Product";
import { ProductKind } from "../../model/product/ProductKind";
import { ProductSchema } from "../../model/product/ProductSchema";
import { selectColors } from "../../model/color/selectColors";
import { selectSize } from "../../model/size/selectSize";
import { selectLeg } from "../../model/leg/selectLeg";
import { selectDenier } from "../../model/denier/selectDenier";
import { ProductDenierLegSize } from "../../model/product/ProductDenierLegSize";

export const TIGHTS_OR_STOCKING_200_DENIER: ProductDenierLegSize = {
  schema: ProductSchema.BY_DENIER_LEG_SIZE,
  kind: ProductKind.TIGHTS_OR_STOCKING_200_DENIER,
  description: "טייץ / גרביון 200 דניר",
  primaryImage: "legging-bordeaux.jpg",
  denier: [
    {
      ...selectDenier("200"),
      legOptions: [
        {
          ...selectLeg("with-leg"),
          sizes: [
            {
              ...selectSize("onesize"),
              attributes: {
                colors: selectColors(["black", "body"]),
                price: 22,
                discount: discount_3_in_60,
                supplier: "filo",
                images: () => ["legging-bordeaux-doesnt-exists.jpg"],
              },
            },
          ],
        },
        {
          ...selectLeg("without-leg"),
          sizes: [
            {
              ...selectSize("3XL_to_5XL"),
              attributes: {
                colors: selectColors(["black", "body"]),
                price: 30,
                discount: no_discount,
                supplier: "filo",
                images: () => [],
              },
            },
            {
              ...selectSize("onesize"),
              attributes: {
                colors: selectColors(["black", "body"]),
                price: 22,
                discount: discount_3_in_60,
                supplier: "filo",
                images: () => ["legging-bordeaux.jpg"],
              },
            },
          ],
        },
      ],
    },
  ],
};
