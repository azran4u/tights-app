import { Denier } from "../../../model/denier/Denier";
import { Leg } from "../../../model/leg/Leg";
import { ProductBaseAttributes } from "../../../model/product/ProductBaseAttributes";
import { ProductDenierLegSize } from "../../../model/product/ProductDenierLegSize";
import { ProductDenierLegSizeAttributes } from "../../../model/product/ProductDenierLegSizeAttributes";
import { Size } from "../../../model/size/Size";

export function useProductDenierLegSizeAttributes(
  product: ProductDenierLegSize,
  denier: Denier,
  leg: Leg,
  size: Size
): ProductBaseAttributes | undefined {
  return ProductDenierLegSizeAttributes(product, denier, leg, size);
}
