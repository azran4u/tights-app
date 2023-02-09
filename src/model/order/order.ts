import { CheckoutDetails } from "../checkout/checkout";
import { OrderNumber } from "../orderNumber/orderNumber";
import { PickupLocation } from "../pickup/pickupLocation";
import { ProductWithAmount } from "../product/ProductWithAmount";

export interface OrderInput {
  orderNumber: OrderNumber;
  checkoutDetails: CheckoutDetails;
  pickupLocation: PickupLocation;
  saleName: string;
  date: string;
  products: ProductWithAmount[];
  totalCost: number;
  totalCostAfterDiscount: number;
}

export interface Order extends OrderInput {
  id: string;
}
