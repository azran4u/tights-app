import { isNil } from "lodash";
import { Order, OrderInput } from "../../../model/order/order";
import { FirestoreService } from "../../../shared/services/firestoreService";
import { store } from "../../../store/store";
import {
  selectCartProductsWithAmount,
  selectCartTotalCost,
  selectCartTotalCostAfterDiscount,
} from "../../Cart/store/cartSlice";
import { selectOrderSate } from "../store/orderSlice";
import { selectPickupLocationByDispalyName } from "../../Pickup/store/pickupSlice";
import { selectSaleActive } from "../../Sale/store/saleSlice";
import { selectCheckout } from "../../Checkout/store/checkoutSlice";
import { orderNumberService } from "./orderNumberService";
import { where } from "firebase/firestore";
import { OrderNumber } from "../../../model/orderNumber/orderNumber";

export class OrdersService extends FirestoreService<Order> {
  constructor() {
    super("orders");
  }

  public async createOrder(): Promise<OrderInput> {
    const state = store.getState();
    const totalCostAfterDiscount = selectCartTotalCostAfterDiscount(state);
    const totalCost = selectCartTotalCost(state);
    const checkoutDetails = selectCheckout(state);
    const products = selectCartProductsWithAmount(state);
    const pickupLocation = selectPickupLocationByDispalyName(
      checkoutDetails.prefferedPickupLocation
    )(state)!;
    const activeSale = selectSaleActive(state);
    let { orderNumber, isExisitingOrder } = selectOrderSate(state);
    if (!isExisitingOrder) {
      orderNumber = await orderNumberService.nextOrderNumber();
    }

    if (isNil(orderNumber))
      throw new Error(`cannot get orderNumber ${orderNumber}`);

    const order: OrderInput = {
      orderNumber,
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
    if (!activeSale?.active) throw new Error("sale is closed");

    const order = await this.createOrder();

    // check if an order already exists
    const { isExisitingOrder } = selectOrderSate(state);

    if (isExisitingOrder) {
      const orderId = await this.getOrderIdByOrderNumber(order.orderNumber);
      await this.update(orderId, { ...order, id: orderId });
    } else {
      await this.insert(order);
    }
    return order.orderNumber;
  }

  public async getOrderIdByOrderNumber(orderNumber: OrderNumber) {
    const arr = await this.queryByOrderNumber(orderNumber);
    return arr[0]?.id;
  }

  public async getOrderByOrderNumber(orderNumber: OrderNumber) {
    const arr = await this.queryByOrderNumber(orderNumber);
    if (arr.length !== 1)
      throw new Error(`order ${orderNumber} couldn't be found`);
    return arr[0];
  }

  private queryByOrderNumber(orderNumber: OrderNumber) {
    return this.getByQuery(where("orderNumber", "==", orderNumber));
  }
}

export const ordersService = new OrdersService();
