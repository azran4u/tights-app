import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { OrderNotFound } from "../../Order/services/ordersSrevice";
import { di } from "../../../di/di";

export function useOrderByOrderName(orderNumber: string) {
  const [isOrderNumberExists, setIsOrderNumberExsits] = useState(true);

  const { isLoading: isLoadingQuery, refetch } = useQuery({
    queryKey: ["order", orderNumber],
    queryFn: () => di.ordersRepository.cancelOrder(orderNumber),
    onError: (error) => {
      if (error instanceof OrderNotFound) {
        setIsOrderNumberExsits(false);
      }
    },
  });
}
