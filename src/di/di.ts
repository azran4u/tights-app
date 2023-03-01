import { OrdersService } from "../features/Order/services/ordersSrevice";
import { OrdersRepository } from "../domain/repositories/ordersRepository";

export interface DI {
  ordersRepository: OrdersRepository;
}

export const di: DI = {
  ordersRepository: new OrdersService(),
};
