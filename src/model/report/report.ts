import { Order } from "../order/order";
import { PickupHistogramEntry } from "./pickupHistogram";

export interface Report {
  totalOrderCount: number;
  totalCost: number;
  pickupHistogram: PickupHistogramEntry[];
  orders: Order[];
}
