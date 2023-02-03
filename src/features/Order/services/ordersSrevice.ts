import { isNil } from "lodash";
import { Order } from "../../../model/order/order";
import { FirestoreService } from "../../../shared/services/firestoreService";
import { store } from "../../../store/store";
import {
  selectCartProductsWithAmount,
  selectCartTotalCost,
  selectCartTotalCostAfterDiscount,
} from "../../Cart/store/cartSlice";
import { selectOrderId } from "../store/orderSlice";
import { selectPickupLocationByDispalyName } from "../../Pickup/store/pickupSlice";
import { selectSaleActive } from "../../Sale/store/saleSlice";
import { selectCheckout } from "../../Checkout/store/checkoutSlice";

export class OrdersService extends FirestoreService<Order> {
  constructor() {
    super("orders");
  }

  public createOrder(): Order {
    const state = store.getState();
    const totalCostAfterDiscount = selectCartTotalCostAfterDiscount(state);
    const totalCost = selectCartTotalCost(state);
    const checkoutDetails = selectCheckout(state);
    const products = selectCartProductsWithAmount(state);
    const pickupLocation = selectPickupLocationByDispalyName(
      checkoutDetails.prefferedPickupLocation
    )(state)!;
    const activeSale = selectSaleActive(state);

    const order: Order = {
      totalCost,
      totalCostAfterDiscount,
      checkoutDetails,
      pickupLocation,
      date: new Date().toLocaleString(),
      products,
      saleName: activeSale?.name!,
    };

    return order;
  }

  public async placeOrder() {
    // verify sale is open
    const state = store.getState();
    const activeSale = selectSaleActive(state);
    if (!activeSale?.active) return;

    const order = this.createOrder();

    // check if an order already exists
    const orderId = selectOrderId(state);
    if (isNil(orderId)) {
      return this.insert(order);
    } else {
      await this.update(orderId, order);
      return orderId;
    }
  }
}

export const ordersService = new OrdersService();
