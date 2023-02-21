import { Order } from "../../../model/order/order";
import { PickupHistogramEntry } from "../../../model/report/pickupHistogram";
import { Report } from "../../../model/report/report";
import {
  ordersService,
  OrdersService,
} from "../../Order/services/ordersSrevice";
import { saleService, SaleService } from "../../Sale/services/saleSrevice";

export class ReportService {
  private orders: Order[] = [];

  constructor(
    private ordersService: OrdersService,
    private saleService: SaleService
  ) {}

  async getReport(): Promise<Report> {
    await this.getOrders();

    return {
      totalOrderCount: this.orders.length,
      totalCost: this.totalCost(),
      pickupHistogram: this.pickupCostHistogram(),
      orders: this.orders,
    };
  }

  private totalCost() {
    return this.orders.reduce(
      (totalCost, order) => totalCost + order.totalCostAfterDiscount,
      0
    );
  }

  private pickupCostHistogram(): PickupHistogramEntry[] {
    const histogramMap = new Map<string, number>();

    this.orders.forEach((order) => {
      const pickupLocation = order.checkoutDetails.prefferedPickupLocation;
      const currentCost = histogramMap.get(pickupLocation) ?? 0;
      histogramMap.set(
        pickupLocation,
        currentCost + order.totalCostAfterDiscount
      );
    });

    const histogram: PickupHistogramEntry[] = [];
    histogramMap.forEach((value, key) => {
      histogram.push({
        pickupDisplayName: key,
        totalCost: value,
        commision: 0.1 * value,
      });
    });

    return histogram;
  }

  private async getOrders() {
    this.orders = await this.ordersService.getAll();
  }
}

export const reportService = new ReportService(ordersService, saleService);
