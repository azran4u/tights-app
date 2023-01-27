import { isNil } from "lodash";
import { Lace } from "../lace/Lace";
import { ProductBaseAttributes } from "./ProductBaseAttributes";
import { ProductLace } from "./ProductLace";
import { ProductLaceAvailableLaces } from "./ProductLaceAvailableLaces";

export function ProductLaceAttributes(
  product: ProductLace,
  lace: Lace
): ProductBaseAttributes | undefined {
  const foundLace = ProductLaceAvailableLaces(product).find(
    (x) => x.value === lace.value
  );
  if (isNil(foundLace)) return undefined;

  return foundLace.attributes;
}
