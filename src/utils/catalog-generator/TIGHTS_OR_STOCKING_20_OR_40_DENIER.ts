import { discount_2_in_35 } from "../../model/discount/constants/discount_2_in_35";
import { no_discount } from "../../model/discount/constants/no_discount";
import { Product } from "../../model/product/Product";
import { ProductKind } from "../../model/product/ProductKind";
import { ProductSchema } from "../../model/product/ProductSchema";
import { selectColors } from "../../model/color/selectColors";
import { selectSize } from "../../model/size/selectSize";
import { selectLeg } from "../../model/leg/selectLeg";
import { selectDenier } from "../../model/denier/selectDenier";
import { ProductDenierLegSize } from "../../model";

export const TIGHTS_OR_STOCKING_20_OR_40_DENIER: ProductDenierLegSize = {
  schema: ProductSchema.BY_DENIER_LEG_SIZE,
  kind: ProductKind.TIGHTS_OR_STOCKING_20_OR_40_DENIER,
  description: "טייץ / גרביון 20 / 40 דניר",
  primaryImage: "legging-bordeaux.jpg",
  denier: [
    {
      ...selectDenier("20"),
      legOptions: [
        {
          ...selectLeg("with-leg"),
          sizes: [
            {
              ...selectSize("L(36-40)"),
              attributes: {
                colors: selectColors(["black", "body"]),
                price: 20,
                discount: no_discount,
                supplier: "sharon",
                images: () => [],
              },
            },
            {
              ...selectSize("XL(40-44)"),
              attributes: {
                colors: selectColors(["black", "body"]),
                price: 20,
                discount: no_discount,
                supplier: "sharon",
                images: () => [],
              },
            },
            {
              ...selectSize("XXL(44-50)"),
              attributes: {
                colors: selectColors(["black", "body"]),
                price: 20,
                discount: no_discount,
                supplier: "sharon",
                images: () => [],
              },
            },
          ],
        },
        {
          ...selectLeg("without-leg"),
          sizes: [
            {
              ...selectSize("onesize"),
              attributes: {
                colors: selectColors(["black"]),
                price: 20,
                discount: discount_2_in_35,
                supplier: "sharon",
                images: () => [],
              },
            },
            {
              ...selectSize("XXL(40-44)"),
              attributes: {
                colors: selectColors(["black"]),
                price: 20,
                discount: no_discount,
                supplier: "sharon",
                images: () => [],
              },
            },
          ],
        },
      ],
    },
    {
      ...selectDenier("40"),
      legOptions: [
        {
          ...selectLeg("with-leg"),
          sizes: [
            {
              ...selectSize("L(36-40)"),
              attributes: {
                colors: selectColors(["black", "body"]),
                price: 20,
                discount: no_discount,
                supplier: "sharon",
                images: () => [],
              },
            },
            {
              ...selectSize("XL(40-44)"),
              attributes: {
                colors: selectColors(["black", "body"]),
                price: 20,
                discount: no_discount,
                supplier: "sharon",
                images: () => [],
              },
            },
            {
              ...selectSize("XXL(44-50)"),
              attributes: {
                colors: selectColors(["black", "body"]),
                price: 20,
                discount: no_discount,
                supplier: "filo",
                images: () => [],
              },
            },
          ],
        },
        {
          ...selectLeg("without-leg"),
          sizes: [
            {
              ...selectSize("onesize"),
              attributes: {
                colors: selectColors(["black"]),
                price: 20,
                discount: no_discount,
                supplier: "sharon",
                images: () => [],
              },
            },
            {
              ...selectSize("XXL(40-44)"),
              attributes: {
                colors: selectColors(["black"]),
                price: 20,
                discount: no_discount,
                supplier: "sharon",
                images: () => [],
              },
            },
            {
              ...selectSize("XXL(44-50)"),
              attributes: {
                colors: selectColors(["black"]),
                price: 20,
                discount: no_discount,
                supplier: "sharon",
                images: () => [],
              },
            },
          ],
        },
      ],
    },
  ],
};
