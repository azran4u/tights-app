import { CartItem } from "../cart/CartItem";
import { CheckoutDetails } from "../checkout/checkout";
import { Product } from "../product/Product";

export type ProductWithAmount = Product & CartItem;
export interface Order extends CheckoutDetails {
  saleId: string;
  date: string;
  products: ProductWithAmount[];
  totalCost: number;
  totalCostAfterDiscount: number;
}
