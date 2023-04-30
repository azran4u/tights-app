import { OrdersService } from "../features/Order/services/ordersSrevice";
import { OrdersRepository } from "../domain/repository-interface/OrdersRepository";

export interface DI {
  ordersRepository: OrdersRepository;
}

export const di: DI = {
  ordersRepository: new OrdersService(),
};
