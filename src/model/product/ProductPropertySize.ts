import { ProductBaseAttributes } from "./ProductBaseAttributes";
import { Size } from "../size/Size";

export interface ProductPropertySize extends Size {
  attributes: ProductBaseAttributes;
}
