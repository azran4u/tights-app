import { Denier } from "../denier/Denier";
import ProductPropertyLeg from "./ProductPropertyLeg";

export interface ProductPropertyDenier extends Denier {
  legOptions: ProductPropertyLeg[];
}
