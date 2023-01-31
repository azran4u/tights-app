import { Order } from "../../../model/order/order";
import { FirestoreService } from "../../../shared/services/firestoreService";
import { store } from "../../../store/store";
import {
  selectCartProductsWithAmount,
  selectCartTotalCost,
  selectCartTotalCostAfterDiscount,
} from "../../Cart/store/cartSlice";
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

    const order: Order = {
      totalCost,
      totalCostAfterDiscount,
      ...checkoutDetails,
      date: new Date().toLocaleString(),
      products,
      saleId: "1",
    };

    return order;
  }

  public async placeOrder() {
    const order = this.createOrder();
    const id = await this.writeDoc(order);
    return id;
  }
}

export const checkoutService = new CheckoutService();
