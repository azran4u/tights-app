import { CheckoutDetails } from "../checkout/checkout";
import { PickupLocation } from "../pickup/pickupLocation";
import { ProductWithAmount } from "../product/ProductWithAmount";

export interface Order {
  checkoutDetails: CheckoutDetails;
  pickupLocation: PickupLocation;
  saleName: string;
  date: string;
  products: ProductWithAmount[];
  totalCost: number;
  totalCostAfterDiscount: number;
}
