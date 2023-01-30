import { isNil } from "lodash";
import { ProductInstance } from "../../../model/productInstance/ProductInstance";
import { useAppSelector } from "../../../store/hooks";
import { selectProductBySku } from "../store/productsSlice";

export function useProductBySku(sku: string): ProductInstance {
  const res = useAppSelector(selectProductBySku(sku));
  if (isNil(res)) throw new Error(`invalid sku ${sku}`);
  return res;
}
