import {
  ColorOptions,
  DenierOptions,
  LaceOptions,
  LegOptions,
  Product,
  ProductSchema,
  SizeOptions,
} from '../model';

import no_image from '../assets/images/missing-image.svg';

import tights_or_stocking_girls_120_denier_azure from '../assets/images/tights_or_stocking_girls_120_denier/azure.jpg';
import tights_or_stocking_girls_120_denier_baby_pink from '../assets/images/tights_or_stocking_girls_120_denier/baby_pink.jpg';
import tights_or_stocking_girls_120_denier_black from '../assets/images/tights_or_stocking_girls_120_denier/black.jpg';
import tights_or_stocking_girls_120_denier_body from '../assets/images/tights_or_stocking_girls_120_denier/body.jpg';
import tights_or_stocking_girls_120_denier_bordeaux from '../assets/images/tights_or_stocking_girls_120_denier/bordeaux.jpg';
import tights_or_stocking_girls_120_denier_cream from '../assets/images/tights_or_stocking_girls_120_denier/cream.jpg';
import tights_or_stocking_girls_120_denier_dark_blue from '../assets/images/tights_or_stocking_girls_120_denier/dark_blue.jpg';
import tights_or_stocking_girls_120_denier_dark_purple from '../assets/images/tights_or_stocking_girls_120_denier/dark_purple.jpg';
import tights_or_stocking_girls_120_denier_white from '../assets/images/tights_or_stocking_girls_120_denier/white.jpg';

export interface ImageSrcByDenierLegSizeProps {
  schema?: ProductSchema.BY_DENIER_LEG_SIZE;
  denier?: DenierOptions;
  leg?: LegOptions;
  size?: SizeOptions;
  color?: ColorOptions;
}

export interface ImageSrcByLace {
  schema?: ProductSchema.BY_LACE;
  lace?: LaceOptions;
  size?: SizeOptions;
  color?: ColorOptions;
}
export type ImageSrcProps = ImageSrcByDenierLegSizeProps | ImageSrcByLace;

export function imageSrc(input?: ImageSrcProps) {
  switch (input?.schema) {
    case ProductSchema.BY_DENIER_LEG_SIZE:
      return imageSrcByDenierLegSize(input);

    case ProductSchema.BY_LACE:
      return imageSrcByLace(input);

    default:
      return [no_image];
  }
}

export function imageSrcByDenierLegSize(input?: ImageSrcByDenierLegSizeProps) {
  switch (input?.denier) {
    case '120':
      return imageSrcFor120Denier(input);

    default:
      return [no_image];
  }
}
export function imageSrcFor120Denier(input?: ImageSrcByDenierLegSizeProps) {
  switch (input?.color) {
    case 'azure':
      return [tights_or_stocking_girls_120_denier_azure];

    case 'baby_pink':
      return [tights_or_stocking_girls_120_denier_baby_pink];

    case 'black':
      return [tights_or_stocking_girls_120_denier_black];

    case 'body':
      return [tights_or_stocking_girls_120_denier_body];

    case 'bordeaux':
      return [tights_or_stocking_girls_120_denier_bordeaux];

    case 'cream':
      return [tights_or_stocking_girls_120_denier_cream];

    case 'dark_blue':
      return [tights_or_stocking_girls_120_denier_dark_blue];

    case 'dark_purple':
      return [tights_or_stocking_girls_120_denier_dark_purple];

    case 'white':
      return [tights_or_stocking_girls_120_denier_white];

    default:
      return [tights_or_stocking_girls_120_denier_black];
  }
}

export function imageSrcByLace(input?: ImageSrcByLace) {
  switch (input?.lace) {
    case 'fan':
      return imageSrcByLaceFan(input);

    case 'lengthwise':
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
    return imageSrc({
      schema: product.schema,
      denier: product.denier[0].value,
    })[0];
  }
  if (product.schema === ProductSchema.BY_LACE) {
    return imageSrc({
      schema: product.schema,
      lace: product.lace[0].value,
    })[0];
  }
  return no_image;
}
