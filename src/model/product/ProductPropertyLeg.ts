import { Leg } from "../leg/Leg";
import { ProductPropertySize } from "./ProductPropertySize";

export default interface ProductPropertyLeg extends Leg {
  sizes: ProductPropertySize[];
}
