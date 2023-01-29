import { ProductInstance } from "../../model/productInstance/ProductInstance";
import { ImagesConstants } from "./constants/ImageConstants";
import { ProductInstanceConstants } from "./constants/ProductInstanceConstants";

export const catalog: ProductInstance[] = [
  // dls 200 with leg one size
  {
    ...ProductInstanceConstants.dls200withLegOnesize,
    color: "azure",
    image: ImagesConstants.default,
    sku: "DLS-200-LEG-ONESIZE-AZURE",
  },
  {
    ...ProductInstanceConstants.dls200withLegOnesize,
    color: "black",
    image: ImagesConstants.default,
    sku: "DLS-200-LEG-ONESIZE-BLACK",
  },
  {
    ...ProductInstanceConstants.dls200withLegOnesize,
    color: "cream",
    image: ImagesConstants.default,
    sku: "DLS-200-LEG-ONESIZE-CREAM",
  },

  // dls 200 with leg one 3XL to 5XL
  {
    ...ProductInstanceConstants.dls200withLeg3xlto5xl,
    color: "azure",
    image: ImagesConstants.default,
    sku: "DLS-200-LEG-3XL5XL-AZURE",
  },
  {
    ...ProductInstanceConstants.dls200withLeg3xlto5xl,
    color: "black",
    image: ImagesConstants.default,
    sku: "DLS-200-LEG-3XL5XL-BLACK",
  },
  {
    ...ProductInstanceConstants.dls200withLeg3xlto5xl,
    color: "cream",
    image: ImagesConstants.default,
    sku: "DLS-200-LEG-3XL5XL-CREAM",
  },

  // dls 200 without leg one size
  {
    ...ProductInstanceConstants.dls200withoutLegOnesize,
    color: "azure",
    image: ImagesConstants.default,
    sku: "DLS-200-NOLEG-ONESIZE-AZURE",
  },
  {
    ...ProductInstanceConstants.dls200withoutLegOnesize,
    color: "black",
    image: ImagesConstants.default,
    sku: "DLS-200-NOLEG-ONESIZE-BLACK",
  },
  {
    ...ProductInstanceConstants.dls200withoutLegOnesize,
    color: "cream",
    image: ImagesConstants.default,
    sku: "DLS-200-NOLEG-ONESIZE-CREAM",
  },

  // dls 200 without leg 3XL to 5XL
  {
    ...ProductInstanceConstants.dls200withoutLeg3XLto5XL,
    color: "azure",
    image: ImagesConstants.default,
    sku: "DLS-200-NOLEG-3XL5XL-AZURE",
  },
  {
    ...ProductInstanceConstants.dls200withoutLeg3XLto5XL,
    color: "black",
    image: ImagesConstants.default,
    sku: "DLS-200-NOLEG-3XL5XL-BLACK",
  },
  {
    ...ProductInstanceConstants.dls200withoutLeg3XLto5XL,
    color: "cream",
    image: ImagesConstants.default,
    sku: "DLS-200-NOLEG-3XL5XL-CREAM",
  },

  // dls 120 with leg 9-12
  {
    ...ProductInstanceConstants.dls120withLeg9to12,
    color: "azure",
    image: ImagesConstants.default,
    sku: "DLS-120-LEG-9TO12-AZURE",
  },
  {
    ...ProductInstanceConstants.dls120withLeg9to12,
    color: "black",
    image: ImagesConstants.default,
    sku: "DLS-120-LEG-9TO12-BLACK",
  },
  {
    ...ProductInstanceConstants.dls120withLeg9to12,
    color: "cream",
    image: ImagesConstants.default,
    sku: "DLS-120-LEG-9TO12-CREAM",
  },

  // dls 120 without leg 9-12
  {
    ...ProductInstanceConstants.dls120withoutLeg9to12,
    color: "azure",
    image: ImagesConstants.default,
    sku: "DLS-120-NOLEG-9TO12-AZURE",
  },
  {
    ...ProductInstanceConstants.dls120withoutLeg9to12,
    color: "black",
    image: ImagesConstants.default,
    sku: "DLS-120-NOLEG-9TO12-BLACK",
  },
  {
    ...ProductInstanceConstants.dls120withoutLeg9to12,
    color: "cream",
    image: ImagesConstants.default,
    sku: "DLS-120-NOLEG-9TO12-CREAM",
  },

  // dls 20 with leg 36-40
  {
    ...ProductInstanceConstants.dls20withLeg36to40,
    color: "azure",
    image: ImagesConstants.default,
    sku: "DLS-20-LEG-36TO40-AZURE",
  },
  {
    ...ProductInstanceConstants.dls20withLeg36to40,
    color: "black",
    image: ImagesConstants.default,
    sku: "DLS-20-LEG-36TO40-BLACK",
  },
  {
    ...ProductInstanceConstants.dls20withLeg36to40,
    color: "cream",
    image: ImagesConstants.default,
    sku: "DLS-20-LEG-36TO40-CREAM",
  },

  // dls 20 with leg XL 40-44
  {
    ...ProductInstanceConstants.dls20withLeg40to44XL,
    color: "azure",
    image: ImagesConstants.default,
    sku: "DLS-20-LEG-40TO44-AZURE",
  },
  {
    ...ProductInstanceConstants.dls20withLeg40to44XL,
    color: "black",
    image: ImagesConstants.default,
    sku: "DLS-20-LEG-40TO44-BLACK",
  },
  {
    ...ProductInstanceConstants.dls20withLeg40to44XL,
    color: "cream",
    image: ImagesConstants.default,
    sku: "DLS-20-LEG-40TO44-CREAM",
  },

  // dls 20 with leg XXL 44-50
  {
    ...ProductInstanceConstants.dls20withLeg44to50XXL,
    color: "azure",
    image: ImagesConstants.default,
    sku: "DLS-20-LEG-44TO50XXL-AZURE",
  },
  {
    ...ProductInstanceConstants.dls20withLeg44to50XXL,
    color: "black",
    image: ImagesConstants.default,
    sku: "DLS-20-LEG-44TO50XXL-BLACK",
  },
  {
    ...ProductInstanceConstants.dls20withLeg44to50XXL,
    color: "cream",
    image: ImagesConstants.default,
    sku: "DLS-20-LEG-44TO50XXL-CREAM",
  },

  // lace fan

  {
    ...ProductInstanceConstants.laceFan,
    color: "cream",
    image: ImagesConstants.default,
    sku: "LACE-FAN-ONESIZE-CREAM",
  },
  {
    ...ProductInstanceConstants.laceFan,
    color: "black",
    image: ImagesConstants.default,
    sku: "LACE-FAN-ONESIZE-BLACK",
  },

  // lace lengthwise

  {
    ...ProductInstanceConstants.laceLengthWise,
    color: "cream",
    image: ImagesConstants.default,
    sku: "LACE-LENGTHWISE-ONESIZE-CREAM",
  },
  {
    ...ProductInstanceConstants.laceLengthWise,
    color: "black",
    image: ImagesConstants.default,
    sku: "LACE-LENGTHWISE-ONESIZE-BLACK",
  },
];
