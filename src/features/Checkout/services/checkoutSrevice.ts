import { Order } from "../../../model/order/order";
import { FirestoreService } from "../../../shared/services/firestoreService";
import { store } from "../../../store/store";
import {
  selectCartProductsWithAmount,
  selectCartTotalCost,
  selectCartTotalCostAfterDiscount,
} from "../../Cart/store/cartSlice";
import { selectPickupLocationByDispalyName } from "../../Pickup/store/pickupSlice";
import { selectSaleActive } from "../../Sale/store/saleSlice";
import { selectCheckout } from "../store/checkoutSlice";

export class CheckoutService extends FirestoreService<Order> {
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
    const state = store.getState();
    const activeSale = selectSaleActive(state);
    if (!activeSale?.active) return;
    const order = this.createOrder();
    const id = await this.writeDoc(order);
    return id;
  }
}

export const checkoutService = new CheckoutService();
