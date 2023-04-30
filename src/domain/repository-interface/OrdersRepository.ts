export interface OrdersRepository {
  cancelOrder(orderNumber: string): Promise<void>;
}
