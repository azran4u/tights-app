import { discount_3_in_40 } from "../../model/discount/constants/discount_3_in_40";
import { Product } from "../../model/product/Product";
import { ProductKind } from "../../model/product/ProductKind";
import { ProductSchema } from "../../model/product/ProductSchema";
import { selectColors } from "../../model/color/selectColors";
import { selectSize } from "../../model/size/selectSize";
import { selectLeg } from "../../model/leg/selectLeg";
import { selectDenier } from "../../model/denier/selectDenier";
import { ProductDenierLegSize } from "../../model";

export const TIGHTS_OR_STOCKING_GIRLS_120_DENIER: ProductDenierLegSize = {
  schema: ProductSchema.BY_DENIER_LEG_SIZE,
  kind: ProductKind.TIGHTS_OR_STOCKING_GIRLS_120_DENIER,
  description: "טייץ / גרביון ילדות 120 דניר לגיל גן חובה עד א-ב",
  primaryImage: "legging-bordeaux.jpg",
  denier: [
    {
      ...selectDenier("120"),
      legOptions: [
        {
          ...selectLeg("with-leg"),
          sizes: [
            {
              ...selectSize("9-12"),
              attributes: {
                colors: selectColors(["black", "body", "white"]),
                price: 15,
                discount: discount_3_in_40,
                supplier: "filo",
                images: ({ color }) => [
                  `TIGHTS_OR_STOCKING_GIRLS_120_DENIER/${color}.jpg`,
                ],
              },
            },
          ],
        },
        {
          ...selectLeg("without-leg"),
          sizes: [
            {
              ...selectSize("9-12"),
              attributes: {
                colors: selectColors(["black", "body", "white", "cream"]),
                price: 15,
                discount: discount_3_in_40,
                supplier: "filo",
                images: ({ color }) => [
                  `TIGHTS_OR_STOCKING_GIRLS_120_DENIER/${color}.jpg`,
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};
