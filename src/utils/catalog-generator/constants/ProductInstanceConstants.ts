import { LaceOption } from "../../../model/lace/LaceOption";
import { LegOption } from "../../../model/leg/LegOption";
import { ProductSchema } from "../../../model/product/ProductSchema";
import { ProductInstanceDenierLegSize } from "../../../model/productInstance/ProductInstanceDenierLegSize";
import { ProductInstanceLace } from "../../../model/productInstance/ProductInstanceLace";
import { DescriptionConstants } from "./DescriptionConstants";
import { DiscountConstants } from "./DiscountConstants";
import { ImagesConstants } from "./ImageConstants";
import { LaceConstants } from "./LaceConstants";
import { LegConstants } from "./LegConstants";
import { SizeConstants } from "./SizeConstants";
import { SlugConstants } from "./SlugConstants";

export class ProductInstanceConstants {
  public static dlsBase: ProductInstanceDenierLegSize = {
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
  public static dls200base: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dlsBase,
    description: DescriptionConstants.dls200,
    slug: SlugConstants.dls200,
  };

  public static dls200withLeg: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls200base,
    ...LegConstants.withLeg,
  };

  public static dls200withLegOnesize: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls200withLeg,
    ...SizeConstants.onesize,
    discount: DiscountConstants.discount_dls200_3_in_60,
    price: 22,
    supplier: "filo",
  };

  public static dls200withLeg3xlto5xl: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls200withLeg,
    ...SizeConstants.size3xlTo5xl,
    price: 30,
    ...DiscountConstants.noDiscount,
    supplier: "filo",
  };

  public static dls200withoutLeg: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls200base,
    ...LegConstants.withoutLeg,
  };

  public static dls200withoutLegOnesize: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls200withoutLeg,
    ...SizeConstants.onesize,
    discount: DiscountConstants.discount_dls200_3_in_60,
    price: 22,
    supplier: "filo",
  };

  public static dls200withoutLeg3XLto5XL: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls200withoutLeg,
    ...SizeConstants.onesize,
    discount: DiscountConstants.noDiscount,
    price: 30,
    supplier: "filo",
  };

  // dls 120

  public static dls120base: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dlsBase,
    description: DescriptionConstants.dlsGirls120,
    slug: SlugConstants.dlsGirls120,
  };

  public static dls120withLeg: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls120base,
    ...LegConstants.withLeg,
  };

  public static dls120withLeg9to12: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls120withLeg,
    ...SizeConstants.size9to12,
    discount: DiscountConstants.discount_dls120_3_in_40,
    price: 15,
    supplier: "filo",
  };

  public static dls120withoutLeg: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls120base,
    ...LegConstants.withoutLeg,
  };

  public static dls120withoutLeg9to12: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls120withoutLeg,
    ...SizeConstants.size9to12,
    discount: DiscountConstants.discount_dls120_3_in_40,
    price: 15,
    supplier: "filo",
  };

  // dls 20/40 with leg

  public static dls20or40base: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dlsBase,
    description: DescriptionConstants.dls20or40,
    slug: SlugConstants.dls20or40,
  };

  public static dls20or40withLeg: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls20or40base,
    ...LegConstants.withLeg,
  };

  public static dls20or40withoutLeg: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls20or40base,
    ...LegConstants.withoutLeg,
  };

  // dls 20 with leg

  public static dls20withLeg: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls20or40withLeg,
    denier: "20",
    price: 20,
    ...DiscountConstants.noDiscount,
    supplier: "sharon",
  };

  public static dls20withLeg36to40: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls20withLeg,
    ...SizeConstants.size36to40,
  };

  public static dls20withLeg40to44XL: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls20withLeg,
    ...SizeConstants.size40to44XL,
  };

  public static dls20withLeg44to50XXL: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls20withLeg,
    ...SizeConstants.size44to50XXL,
  };

  // dls 20 without leg

  public static dls20withoutLeg: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls20or40withoutLeg,
    denier: "20",
    price: 20,
    supplier: "sharon",
  };

  public static dls20withoutLegOnesizeSlim: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls20withoutLeg,
    ...SizeConstants.onesizeSlim,
    ...DiscountConstants.discount_dls20or40_2_in_35,
  };

  public static dls20withoutLeg40to44XXL: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls20withoutLeg,
    ...SizeConstants.size40to44XXL,
    ...DiscountConstants.noDiscount,
  };

  // dls 20/40 with leg

  public static dls20or40withoutLeg36to40: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls20or40base,
    ...LegConstants.withoutLeg,
    ...SizeConstants.size36to40,
  };

  public static dls20or40withoutLeg40to44XL: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls20or40base,
    ...LegConstants.withoutLeg,
    ...SizeConstants.size40to44XL,
  };

  public static dls20or40withoutLeg44to50XXL: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls20or40base,
    ...LegConstants.withoutLeg,
    ...SizeConstants.size44to50XXL,
  };

  public static dls20or40withoutLegOnesizeSlim: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls20or40base,
    ...LegConstants.withoutLeg,
    ...SizeConstants.onesizeSlim,
    discount: DiscountConstants.discount_dls20or40_2_in_35,
  };

  public static dls20or40withoutLeg40to44XXL: ProductInstanceDenierLegSize = {
    ...ProductInstanceConstants.dls20or40base,
    ...LegConstants.withoutLeg,
    ...SizeConstants.size40to44XXL,
    discount: DiscountConstants.discount_dls20or40_2_in_35,
  };

  // lace

  public static laceBase: ProductInstanceLace = {
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

  public static laceFan: ProductInstanceLace = {
    ...ProductInstanceConstants.laceBase,
    ...LaceConstants.fan,
  };

  public static laceLengthWise: ProductInstanceLace = {
    ...ProductInstanceConstants.laceBase,
    ...LaceConstants.lengthWise,
  };
}
