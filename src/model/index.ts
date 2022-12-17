import { flatten, isNil, uniq } from 'lodash';
import { stringify } from 'querystring';

export interface ValueLabel<V = string, L = string> {
  value: V;
  label: L;
}

export interface Color extends ValueLabel<AvailableColor> {
  cssColor: string;
}

export interface Size extends ValueLabel<AvailableSize> {}

export type Supplier = 'filo' | 'sharon';

export type Price = number;

export type ImageUrl = string;

export type ImageUrlFn = (
  color: AvailableColor,
  size: AvailableSize
) => ImageUrl[];

export enum DiscountKind {
  NO_DISCOUNT = 'NO_DISCOUNT',
  COUNT_DISCOUNT = 'COUNT_DISCOUNT',
}

export interface CountDiscount {
  kind: DiscountKind.COUNT_DISCOUNT;
  count: number;
  pricePerCount: number;
  displayText?: string;
}

export interface NoDiscount {
  kind: DiscountKind.NO_DISCOUNT;
}

export type Discount = NoDiscount | CountDiscount;

export interface ProductBaseAttributes {
  colors: Color[];
  price: Price;
  supplier: Supplier;
  discount: Discount;
  images: ImageUrlFn;
}

export type LegOptions = 'with-leg' | 'without-leg';
export interface Leg extends ValueLabel<LegOptions> {}
export const legs: Leg[] = [
  {
    value: 'with-leg',
    label: 'עם רגל',
  },
  {
    value: 'without-leg',
    label: 'ללא רגל',
  },
];

export type DenierOptions = '200' | '120' | '40' | '20';
export interface Denier extends ValueLabel<DenierOptions> {}
export const deniers: Denier[] = [
  {
    value: '200',
    label: '200 דניר',
  },
  {
    value: '120',
    label: '120 דניר',
  },
  {
    value: '40',
    label: '40 דניר',
  },
  {
    value: '20',
    label: '20 דניר',
  },
];

export type LaceOptions = 'fan' | 'lengthwise';
export interface Lace extends ValueLabel<LaceOptions> {}
export const laces: Lace[] = [
  {
    value: 'fan',
    label: 'מניפה',
  },
  {
    value: 'lengthwise',
    label: 'לאורך',
  },
];

export enum ProductSchema {
  BY_DENIER_LEG_SIZE = 'BY_DENIER_LEG_SIZE',
  BY_LACE = 'BY_LACE',
}

export interface ProductPropertyLace extends Lace {
  attributes: ProductBaseAttributes;
}

export interface ProductBase {
  schema: ProductSchema;
  kind: ProductKind;
  description: string;
}

export interface ProductLace extends ProductBase {
  schema: ProductSchema.BY_LACE;
  kind: ProductKind.LACE_FAN_TIGHTS;
  lace: ProductPropertyLace[];
}

export interface ProductDenierLegSize extends ProductBase {
  schema: ProductSchema.BY_DENIER_LEG_SIZE;
  kind:
    | ProductKind.TIGHTS_OR_STOCKING_200_DENIER
    | ProductKind.TIGHTS_OR_STOCKING_GIRLS_120_DENIER
    | ProductKind.TIGHTS_OR_STOCKING_20_OR_40_DENIER;
  denier: ProductPropertyDenier[];
}

export interface ProductPropertyDenier extends Denier {
  legOptions: ProductPropertyLeg[];
}

export interface ProductPropertyLeg extends Leg {
  sizes: ProductPropertySize[];
}

export interface ProductPropertySize extends Size {
  attributes: ProductBaseAttributes;
}

export enum ProductKind {
  TIGHTS_OR_STOCKING_200_DENIER = 'TIGHTS_OR_STOCKING_200_DENIER',
  TIGHTS_OR_STOCKING_GIRLS_120_DENIER = 'TIGHTS_OR_STOCKING_GIRLS_120_DENIER',
  TIGHTS_OR_STOCKING_20_OR_40_DENIER = 'TIGHTS_OR_STOCKING_20_OR_40_DENIER',
  LACE_FAN_TIGHTS = 'LACE_FAN_TIGHTS',
}

export type Product = ProductDenierLegSize | ProductLace;

export type AvailableSize =
  | 'onesize'
  | '3XL_to_5XL'
  | '9-12'
  | 'L(36-40)'
  | 'XL(40-44)'
  | 'XXL(44-50)'
  | 'onesize-slim'
  | 'XXL(40-44)';

export const sizes: Size[] = [
  {
    value: 'onesize',
    label: 'One Size',
  },
  {
    value: 'onesize-slim',
    label: 'One Size מידה צרה',
  },
  {
    value: 'XXL(44-50)',
    label: 'XXL(44-50)',
  },
  {
    value: 'XXL(40-44)',
    label: 'XXL(40-44)',
  },
  {
    value: 'XL(40-44)',
    label: 'XL(40-44)',
  },
  {
    value: 'L(36-40)',
    label: 'L(36-40)',
  },
  {
    value: '9-12',
    label: '9-12 מידות',
  },
  {
    value: '3XL_to_5XL',
    label: '3XL עד 5XL',
  },
];

export type AvailableColor =
  | 'black'
  | 'body'
  | 'cream'
  | 'silver-very-light-gray-not-shimmery'
  | 'gray-light'
  | 'white';

export const colors: Color[] = [
  {
    value: 'black',
    label: 'שחור',
    cssColor: ' #000000',
  },
  {
    value: 'body',
    label: 'גוף',
    cssColor: ' #ffcc99',
  },
  {
    value: 'cream',
    label: 'שמנת',
    cssColor: '#fff2e6',
  },
  {
    value: 'silver-very-light-gray-not-shimmery',
    label: 'כסף - אפור בהיר מאד (לא מנצנץ)',
    cssColor: '#e6e6e6',
  },
  {
    value: 'gray-light',
    label: 'אפור בהיר',
    cssColor: '#b3b3b3',
  },
  {
    value: 'white',
    label: 'לבן',
    cssColor: '#ffffff',
  },
];

export const TIGHTS_OR_STOCKING_200_DENIER: Product = {
  schema: ProductSchema.BY_DENIER_LEG_SIZE,
  kind: ProductKind.TIGHTS_OR_STOCKING_200_DENIER,
  description: 'טייץ / גרביון 200 דניר',
  denier: [
    {
      ...selectDenier('200'),
      legOptions: [
        {
          ...selectLeg('with-leg'),
          sizes: [
            {
              ...selectSize('onesize'),
              attributes: {
                colors: selectColors(['black', 'body']),
                price: 22,
                discount: {
                  kind: DiscountKind.COUNT_DISCOUNT,
                  count: 3,
                  pricePerCount: 60,
                  displayText: undefined,
                },
                supplier: 'filo',
                images: (color, size) => ['legging-bordeaux.jpg'],
              },
            },
          ],
        },
        {
          ...selectLeg('without-leg'),
          sizes: [
            {
              ...selectSize('3XL_to_5XL'),
              attributes: {
                colors: selectColors(['black', 'body']),
                price: 30,
                discount: {
                  kind: DiscountKind.NO_DISCOUNT,
                },
                supplier: 'filo',
                images: (color, size) => [],
              },
            },
          ],
        },
      ],
    },
  ],
};

export const TIGHTS_OR_STOCKING_GIRLS_120_DENIER: Product = {
  schema: ProductSchema.BY_DENIER_LEG_SIZE,
  kind: ProductKind.TIGHTS_OR_STOCKING_GIRLS_120_DENIER,
  description: 'טייץ / גרביון ילדות 120 דניר לגיל גן חובה עד א-ב',
  denier: [
    {
      ...selectDenier('120'),
      legOptions: [
        {
          ...selectLeg('with-leg'),
          sizes: [
            {
              ...selectSize('9-12'),
              attributes: {
                colors: selectColors(['black', 'body', 'white']),
                price: 15,
                discount: {
                  kind: DiscountKind.COUNT_DISCOUNT,
                  count: 3,
                  pricePerCount: 40,
                  displayText: undefined,
                },
                supplier: 'filo',
                images: (color, size) => [],
              },
            },
          ],
        },
        {
          ...selectLeg('without-leg'),
          sizes: [
            {
              ...selectSize('9-12'),
              attributes: {
                colors: selectColors(['black', 'body', 'white', 'cream']),
                price: 15,
                discount: {
                  kind: DiscountKind.COUNT_DISCOUNT,
                  count: 3,
                  pricePerCount: 40,
                  displayText: undefined,
                },
                supplier: 'filo',
                images: (color, size) => [],
              },
            },
          ],
        },
      ],
    },
  ],
};

export const TIGHTS_OR_STOCKING_20_OR_40_DENIER: Product = {
  schema: ProductSchema.BY_DENIER_LEG_SIZE,
  kind: ProductKind.TIGHTS_OR_STOCKING_20_OR_40_DENIER,
  description: 'טייץ / גרביון 20 / 40 דניר',
  denier: [
    {
      ...selectDenier('20'),
      legOptions: [
        {
          ...selectLeg('with-leg'),
          sizes: [
            {
              ...selectSize('L(36-40)'),
              attributes: {
                colors: selectColors(['black', 'body']),
                price: 20,
                discount: {
                  kind: DiscountKind.NO_DISCOUNT,
                },
                supplier: 'sharon',
                images: (color, size) => [],
              },
            },
            {
              ...selectSize('XL(40-44)'),
              attributes: {
                colors: selectColors(['black', 'body']),
                price: 20,
                discount: {
                  kind: DiscountKind.NO_DISCOUNT,
                },
                supplier: 'sharon',
                images: (color, size) => [],
              },
            },
            {
              ...selectSize('XXL(44-50)'),
              attributes: {
                colors: selectColors(['black', 'body']),
                price: 20,
                discount: {
                  kind: DiscountKind.NO_DISCOUNT,
                },
                supplier: 'sharon',
                images: (color, size) => [],
              },
            },
          ],
        },
        {
          ...selectLeg('without-leg'),
          sizes: [
            {
              ...selectSize('onesize'),
              attributes: {
                colors: selectColors(['black']),
                price: 20,
                discount: {
                  kind: DiscountKind.COUNT_DISCOUNT,
                  count: 2,
                  pricePerCount: 35,
                  displayText: '',
                },
                supplier: 'sharon',
                images: (color, size) => [],
              },
            },
            {
              ...selectSize('XXL(40-44)'),
              attributes: {
                colors: selectColors(['black']),
                price: 20,
                discount: {
                  kind: DiscountKind.NO_DISCOUNT,
                },
                supplier: 'sharon',
                images: (color, size) => [],
              },
            },
          ],
        },
      ],
    },
    {
      ...selectDenier('40'),
      legOptions: [
        {
          ...selectLeg('with-leg'),
          sizes: [
            {
              ...selectSize('L(36-40)'),
              attributes: {
                colors: selectColors(['black', 'body']),
                price: 20,
                discount: {
                  kind: DiscountKind.NO_DISCOUNT,
                },
                supplier: 'sharon',
                images: (color, size) => [],
              },
            },
            {
              ...selectSize('XL(40-44)'),
              attributes: {
                colors: selectColors(['black', 'body']),
                price: 20,
                discount: {
                  kind: DiscountKind.NO_DISCOUNT,
                },
                supplier: 'sharon',
                images: (color, size) => [],
              },
            },
            {
              ...selectSize('XXL(44-50)'),
              attributes: {
                colors: selectColors(['black', 'body']),
                price: 20,
                discount: {
                  kind: DiscountKind.NO_DISCOUNT,
                },
                supplier: 'filo',
                images: (color, size) => [],
              },
            },
          ],
        },
        {
          ...selectLeg('without-leg'),
          sizes: [
            {
              ...selectSize('onesize'),
              attributes: {
                colors: selectColors(['black']),
                price: 20,
                discount: {
                  kind: DiscountKind.NO_DISCOUNT,
                },
                supplier: 'sharon',
                images: (color, size) => [],
              },
            },
            {
              ...selectSize('XXL(40-44)'),
              attributes: {
                colors: selectColors(['black']),
                price: 20,
                discount: {
                  kind: DiscountKind.NO_DISCOUNT,
                },
                supplier: 'sharon',
                images: (color, size) => [],
              },
            },
            {
              ...selectSize('XXL(44-50)'),
              attributes: {
                colors: selectColors(['black']),
                price: 20,
                discount: {
                  kind: DiscountKind.NO_DISCOUNT,
                },
                supplier: 'sharon',
                images: (color, size) => [],
              },
            },
          ],
        },
      ],
    },
  ],
};

export const LACE_FAN_TIGHTS: Product = {
  schema: ProductSchema.BY_LACE,
  kind: ProductKind.LACE_FAN_TIGHTS,
  description: 'תחרה מניפה טייץ onesize',
  lace: [
    {
      ...selectLace('fan'),
      attributes: {
        colors: selectColors(['black', 'white']),
        price: 25,
        discount: {
          kind: DiscountKind.NO_DISCOUNT,
        },
        supplier: 'sharon',
        images: (color, size) => [],
      },
    },
    {
      ...selectLace('lengthwise'),
      attributes: {
        colors: selectColors(['black', 'white']),
        price: 25,
        discount: {
          kind: DiscountKind.NO_DISCOUNT,
        },
        supplier: 'sharon',
        images: (color, size) => [],
      },
    },
  ],
};

export function selectDenier(denier: DenierOptions): Denier {
  return deniers.find((v) => v.value === denier)!;
}

export function selectLeg(legOption: LegOptions): Leg {
  return legs.find((v) => v.value === legOption)!;
}

export function selectSize(size: AvailableSize): Size {
  return sizes.find((v) => v.value === size)!;
}

export function selectColors(colorValues: AvailableColor[]): Color[] {
  return colors.filter((v) => colorValues.includes(v.value))!;
}

export function selectLace(lace: LaceOptions): Lace {
  return laces.find((v) => v.value === lace)!;
}

export const productsDenierLegSize: ProductDenierLegSize[] = [
  TIGHTS_OR_STOCKING_200_DENIER,
  TIGHTS_OR_STOCKING_GIRLS_120_DENIER,
  TIGHTS_OR_STOCKING_20_OR_40_DENIER,
];

export const productsLace: ProductLace[] = [LACE_FAN_TIGHTS];
export const products: Product[] = [...productsDenierLegSize, ...productsLace];

export function ProductDenierLegSizeAvailableDenier(
  product: ProductDenierLegSize
): ProductPropertyDenier[] {
  return product.denier;
}

export function useProductDenierLegSizeAvailableDenier(
  product: ProductDenierLegSize
): Denier[] {
  return ProductDenierLegSizeAvailableDenier(product);
}

export function ProductDenierLegSizeAvailableLegs(
  product: ProductDenierLegSize,
  denier: Denier
): ProductPropertyLeg[] {
  const foundDenier = ProductDenierLegSizeAvailableDenier(product).find(
    (d) => d.value === denier.value
  );
  if (isNil(foundDenier)) return [];

  return foundDenier.legOptions;
}

export function useProductDenierLegSizeAvailableLegs(
  product: ProductDenierLegSize,
  denier: Denier
): Leg[] {
  return ProductDenierLegSizeAvailableLegs(product, denier);
}

export function ProductDenierLegSizeAvailableSizes(
  product: ProductDenierLegSize,
  denier: Denier,
  leg: Leg
): ProductPropertySize[] {
  const foundLeg = ProductDenierLegSizeAvailableLegs(product, denier).find(
    (x) => x.value === leg.value
  );
  if (isNil(foundLeg)) return [];

  return foundLeg.sizes;
}

export function useProductDenierLegSizeAvailableSizes(
  product: ProductDenierLegSize,
  denier: Denier,
  leg: Leg
): Size[] {
  return ProductDenierLegSizeAvailableSizes(product, denier, leg);
}

export function ProductDenierLegSizeAttributes(
  product: ProductDenierLegSize,
  denier: Denier,
  leg: Leg,
  size: Size
): ProductBaseAttributes | undefined {
  const foundSize = ProductDenierLegSizeAvailableSizes(
    product,
    denier,
    leg
  ).find((x) => x.value === size.value);
  if (isNil(foundSize)) return undefined;

  return foundSize.attributes;
}

export function useProductDenierLegSizeAttributes(
  product: ProductDenierLegSize,
  denier: Denier,
  leg: Leg,
  size: Size
): ProductBaseAttributes | undefined {
  return ProductDenierLegSizeAttributes(product, denier, leg, size);
  // ?? {
  //   colors: [],
  //   discount: {
  //     kind: DiscountKind.NO_DISCOUNT,
  //   },
  //   images: (color, size) => [],
  //   price: 0,
  //   supplier: 'filo',
  // }
}

// export function ProductDenierLegSizeAttributes(
//   product: ProductDenierLegSize,
//   denier: Denier,
//   leg: Leg,
//   size: Size
// ): ProductBaseAttributes {
//   const foundDenier = product.denier.find((d) => d.value === denier.value);
//   if (isNil(foundDenier))
//     throw new Error(
//       ProductDenierLegSizeAttributesErrorMessage(denier, 'denier')
//     );

//   const foundLeg = foundDenier.legOptions.find((l) => l.value === leg.value);
//   if (isNil(foundLeg))
//     throw new Error(ProductDenierLegSizeAttributesErrorMessage(leg, 'leg'));

//   const foundSize = foundLeg.sizes.find((s) => s.value === size.value);
//   if (isNil(foundSize))
//     throw new Error(ProductDenierLegSizeAttributesErrorMessage(size, 'size'));

//   return foundSize.attributes;

//   function ProductDenierLegSizeAttributesErrorMessage(
//     value: Denier | Leg | Size,
//     text: string
//   ): string {
//     return `ProductDenierLegSizeAvailableColors ${text} ${value.label} not found`;
//   }
// }
