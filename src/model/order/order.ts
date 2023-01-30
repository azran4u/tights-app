import { CartItem } from "../cart/CartItem";
import { CheckoutDetails } from "../checkout/checkout";
import { ProductInstance } from "../productInstance/ProductInstance";

export type ProductInstanceWithAmount = ProductInstance & CartItem;
export interface Order extends CheckoutDetails {
  saleId: string;
  date: string;
  products: ProductInstanceWithAmount[];
  totalCost: number;
  totalCostAfterDiscount: number;
}
