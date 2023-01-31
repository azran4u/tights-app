import { ProductSchema } from "../../../model/product/ProductSchema";
import { ProductDenierLegSize } from "../../../model/product/ProductDenierLegSize";
import { ProductLace } from "../../../model/product/ProductLace";
import { DescriptionConstants } from "./DescriptionConstants";
import { DiscountConstants } from "./DiscountConstants";
import { ImagesConstants } from "./ImageConstants";
import { LaceConstants } from "./LaceConstants";
import { LegConstants } from "./LegConstants";
import { SizeConstants } from "./SizeConstants";
import { SlugConstants } from "./SlugConstants";

export class ProductConstants {
  public static dlsBase: ProductDenierLegSize = {
    schema: ProductSchema.BY_DENIER_LEG_SIZE,
    description: "", //Constants.description.dls200,
    slug: "",
    discount: DiscountConstants.noDiscount,
    image: ImagesConstants.default,
    sku: "",
    denier: "200",
    supplier: "filo",
    price: 1000,
    leg: "with-leg",
    size: "onesize",
    color: "azure",
  };

  // dls 200 with led one size
  public static dls200base: ProductDenierLegSize = {
    ...ProductConstants.dlsBase,
    description: DescriptionConstants.dls200,
    slug: SlugConstants.dls200,
  };

  public static dls200withLeg: ProductDenierLegSize = {
    ...ProductConstants.dls200base,
    ...LegConstants.withLeg,
  };

  public static dls200withLegOnesize: ProductDenierLegSize = {
    ...ProductConstants.dls200withLeg,
    ...SizeConstants.onesize,
    discount: DiscountConstants.discount_dls200_3_in_60,
    price: 22,
    supplier: "filo",
  };

  public static dls200withLeg3xlto5xl: ProductDenierLegSize = {
    ...ProductConstants.dls200withLeg,
    ...SizeConstants.size3xlTo5xl,
    price: 30,
    ...DiscountConstants.noDiscount,
    supplier: "filo",
  };

  public static dls200withoutLeg: ProductDenierLegSize = {
    ...ProductConstants.dls200base,
    ...LegConstants.withoutLeg,
  };

  public static dls200withoutLegOnesize: ProductDenierLegSize = {
    ...ProductConstants.dls200withoutLeg,
    ...SizeConstants.onesize,
    discount: DiscountConstants.discount_dls200_3_in_60,
    price: 22,
    supplier: "filo",
  };

  public static dls200withoutLeg3XLto5XL: ProductDenierLegSize = {
    ...ProductConstants.dls200withoutLeg,
    ...SizeConstants.onesize,
    discount: DiscountConstants.noDiscount,
    price: 30,
    supplier: "filo",
  };

  // dls 120

  public static dls120base: ProductDenierLegSize = {
    ...ProductConstants.dlsBase,
    description: DescriptionConstants.dlsGirls120,
    slug: SlugConstants.dlsGirls120,
  };

  public static dls120withLeg: ProductDenierLegSize = {
    ...ProductConstants.dls120base,
    ...LegConstants.withLeg,
  };

  public static dls120withLeg9to12: ProductDenierLegSize = {
    ...ProductConstants.dls120withLeg,
    ...SizeConstants.size9to12,
    discount: DiscountConstants.discount_dls120_3_in_40,
    price: 15,
    supplier: "filo",
  };

  public static dls120withoutLeg: ProductDenierLegSize = {
    ...ProductConstants.dls120base,
    ...LegConstants.withoutLeg,
  };

  public static dls120withoutLeg9to12: ProductDenierLegSize = {
    ...ProductConstants.dls120withoutLeg,
    ...SizeConstants.size9to12,
    discount: DiscountConstants.discount_dls120_3_in_40,
    price: 15,
    supplier: "filo",
  };

  // dls 20/40 with leg

  public static dls20or40base: ProductDenierLegSize = {
    ...ProductConstants.dlsBase,
    description: DescriptionConstants.dls20or40,
    slug: SlugConstants.dls20or40,
  };

  public static dls20or40withLeg: ProductDenierLegSize = {
    ...ProductConstants.dls20or40base,
    ...LegConstants.withLeg,
  };

  public static dls20or40withoutLeg: ProductDenierLegSize = {
    ...ProductConstants.dls20or40base,
    ...LegConstants.withoutLeg,
  };

  // dls 20 with leg

  public static dls20withLeg: ProductDenierLegSize = {
    ...ProductConstants.dls20or40withLeg,
    denier: "20",
    price: 20,
    ...DiscountConstants.noDiscount,
    supplier: "sharon",
  };

  public static dls20withLeg36to40: ProductDenierLegSize = {
    ...ProductConstants.dls20withLeg,
    ...SizeConstants.size36to40,
  };

  public static dls20withLeg40to44XL: ProductDenierLegSize = {
    ...ProductConstants.dls20withLeg,
    ...SizeConstants.size40to44XL,
  };

  public static dls20withLeg44to50XXL: ProductDenierLegSize = {
    ...ProductConstants.dls20withLeg,
    ...SizeConstants.size44to50XXL,
  };

  // dls 20 without leg

  public static dls20withoutLeg: ProductDenierLegSize = {
    ...ProductConstants.dls20or40withoutLeg,
    denier: "20",
    price: 20,
    supplier: "sharon",
  };

  public static dls20withoutLegOnesizeSlim: ProductDenierLegSize = {
    ...ProductConstants.dls20withoutLeg,
    ...SizeConstants.onesizeSlim,
    ...DiscountConstants.discount_dls20or40_2_in_35,
  };

  public static dls20withoutLeg40to44XXL: ProductDenierLegSize = {
    ...ProductConstants.dls20withoutLeg,
    ...SizeConstants.size40to44XXL,
    ...DiscountConstants.noDiscount,
  };

  // dls 20/40 with leg

  public static dls20or40withoutLeg36to40: ProductDenierLegSize = {
    ...ProductConstants.dls20or40base,
    ...LegConstants.withoutLeg,
    ...SizeConstants.size36to40,
  };

  public static dls20or40withoutLeg40to44XL: ProductDenierLegSize = {
    ...ProductConstants.dls20or40base,
    ...LegConstants.withoutLeg,
    ...SizeConstants.size40to44XL,
  };

  public static dls20or40withoutLeg44to50XXL: ProductDenierLegSize = {
    ...ProductConstants.dls20or40base,
    ...LegConstants.withoutLeg,
    ...SizeConstants.size44to50XXL,
  };

  public static dls20or40withoutLegOnesizeSlim: ProductDenierLegSize = {
    ...ProductConstants.dls20or40base,
    ...LegConstants.withoutLeg,
    ...SizeConstants.onesizeSlim,
    discount: DiscountConstants.discount_dls20or40_2_in_35,
  };

  public static dls20or40withoutLeg40to44XXL: ProductDenierLegSize = {
    ...ProductConstants.dls20or40base,
    ...LegConstants.withoutLeg,
    ...SizeConstants.size40to44XXL,
    discount: DiscountConstants.discount_dls20or40_2_in_35,
  };

  // lace

  public static laceBase: ProductLace = {
    schema: ProductSchema.BY_LACE,
    description: DescriptionConstants.lace, //Constants.description.dls200,
    slug: SlugConstants.lace,
    discount: DiscountConstants.noDiscount,
    image: ImagesConstants.default,
    sku: "LACE-FAN-ONESIZE-AZURE",
    lace: "fan",
    supplier: "filo",
    price: 25,
    size: "onesize",
    color: "azure",
  };

  public static laceFan: ProductLace = {
    ...ProductConstants.laceBase,
    ...LaceConstants.fan,
  };

  public static laceLengthWise: ProductLace = {
    ...ProductConstants.laceBase,
    ...LaceConstants.lengthWise,
  };
}
