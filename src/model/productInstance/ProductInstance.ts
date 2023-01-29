import { ProductInstanceDenierLegSize } from "./ProductInstanceDenierLegSize";
import { ProductInstanceLace } from "./ProductInstanceLace";

export type ProductInstance =
  | ProductInstanceDenierLegSize
  | ProductInstanceLace;
