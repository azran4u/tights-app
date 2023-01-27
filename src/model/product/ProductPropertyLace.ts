import { Lace } from "../lace/Lace";
import { ProductBaseAttributes } from "./ProductBaseAttributes";

export interface ProductPropertyLace extends Lace {
  attributes: ProductBaseAttributes;
}
