import no_image from "../assets/images/missing-image.svg";

import tights_or_stocking_girls_120_denier_azure from "../assets/images/tights_or_stocking_girls_120_denier/azure.jpg";
import tights_or_stocking_girls_120_denier_baby_pink from "../assets/images/tights_or_stocking_girls_120_denier/baby_pink.jpg";
import tights_or_stocking_girls_120_denier_black from "../assets/images/tights_or_stocking_girls_120_denier/black.jpg";
import tights_or_stocking_girls_120_denier_body from "../assets/images/tights_or_stocking_girls_120_denier/body.jpg";
import tights_or_stocking_girls_120_denier_bordeaux from "../assets/images/tights_or_stocking_girls_120_denier/bordeaux.jpg";
import tights_or_stocking_girls_120_denier_cream from "../assets/images/tights_or_stocking_girls_120_denier/cream.jpg";
import tights_or_stocking_girls_120_denier_dark_blue from "../assets/images/tights_or_stocking_girls_120_denier/dark_blue.jpg";
import tights_or_stocking_girls_120_denier_dark_purple from "../assets/images/tights_or_stocking_girls_120_denier/dark_purple.jpg";
import tights_or_stocking_girls_120_denier_white from "../assets/images/tights_or_stocking_girls_120_denier/white.jpg";
import { ColorOption } from "../model/color/ColorOption";
import { DenierOption } from "../model/denier/DenierOption";
import { LaceOption } from "../model/lace/LaceOption";
import { LegOption } from "../model/leg/LegOption";
import { Product } from "../model/product/Product";
import { ProductSchema } from "../model/product/ProductSchema";
import { SizeOption } from "../model/size/SizeOption";

export class ImagesConstants {
  public static girls120Azure = tights_or_stocking_girls_120_denier_azure;
  public static girls120babyPink =
    tights_or_stocking_girls_120_denier_baby_pink;
  public static girls120black = tights_or_stocking_girls_120_denier_black;
  public static girls120body = tights_or_stocking_girls_120_denier_body;
  public static girls120bordeaux = tights_or_stocking_girls_120_denier_bordeaux;
  public static girls120cream = tights_or_stocking_girls_120_denier_cream;
  public static girls120darkBlue =
    tights_or_stocking_girls_120_denier_dark_blue;
  public static girls120darkPurple =
    tights_or_stocking_girls_120_denier_dark_purple;
  public static girls120white = tights_or_stocking_girls_120_denier_white;
}

export interface ImageSrcByDenierLegSizeProps {
  denier?: DenierOption;
  leg?: LegOption;
  size?: SizeOption;
  color?: ColorOption;
}

export interface ImageSrcByLace {
  lace?: LaceOption;
  color?: ColorOption;
}
export type ImageSrcProps = ImageSrcByDenierLegSizeProps | ImageSrcByLace;

// export function imageSrcByCartItem(cartItem: CartItem) {
//   switch (cartItem.schema) {
//     case ProductSchema.BY_DENIER_LEG_SIZE:
//       return imageSrcByDenierLegSize(cartItem);

//     case ProductSchema.BY_LACE:
//       return imageSrcByLace(cartItem);

//     default:
//       return [no_image];
//   }
// }

export function imageSrcByDenierLegSize(input?: ImageSrcByDenierLegSizeProps) {
  switch (input?.denier) {
    case "120":
      return imageSrcFor120Denier(input);

    default:
      return [no_image];
  }
}
export function imageSrcFor120Denier(input?: ImageSrcByDenierLegSizeProps) {
  switch (input?.color) {
    case "azure":
      return [tights_or_stocking_girls_120_denier_azure];

    case "baby_pink":
      return [tights_or_stocking_girls_120_denier_baby_pink];

    case "black":
      return [tights_or_stocking_girls_120_denier_black];

    case "body":
      return [tights_or_stocking_girls_120_denier_body];

    case "bordeaux":
      return [tights_or_stocking_girls_120_denier_bordeaux];

    case "cream":
      return [tights_or_stocking_girls_120_denier_cream];

    case "dark_blue":
      return [tights_or_stocking_girls_120_denier_dark_blue];

    case "dark_purple":
      return [tights_or_stocking_girls_120_denier_dark_purple];

    case "white":
      return [tights_or_stocking_girls_120_denier_white];

    default:
      return [tights_or_stocking_girls_120_denier_black];
  }
}

export function imageSrcByLace(input?: ImageSrcByLace) {
  switch (input?.lace) {
    case "fan":
      return imageSrcByLaceFan(input);

    case "lengthwise":
      return imageSrcByLaceLengthWise(input);

    default:
      return [no_image];
  }
}

export function imageSrcByLaceFan(input?: ImageSrcByLace) {
  switch (input?.color) {
    default:
      return [no_image];
  }
}

export function imageSrcByLaceLengthWise(input?: ImageSrcByLace) {
  switch (input?.color) {
    default:
      return [no_image];
  }
}

export function productDefaultImage(product: Product) {
  if (product.schema === ProductSchema.BY_DENIER_LEG_SIZE) {
    return imageSrcByDenierLegSize({
      denier: product.denier[0].value,
    })[0];
  }
  if (product.schema === ProductSchema.BY_LACE) {
    return imageSrcByLace({
      lace: product.lace[0].value,
    })[0];
  }
  return no_image;
}
