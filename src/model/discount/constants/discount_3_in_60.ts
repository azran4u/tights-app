import { CountDiscount } from "../CountDiscount";
import { DiscountKind } from "../DiscountKind";

export const discount_3_in_60: CountDiscount = {
  kind: DiscountKind.COUNT_DISCOUNT,
  count: 3,
  pricePerCount: 60,
  displayText: undefined,
};
