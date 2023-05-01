import { Ok, Fail, IResult, ValueObject, Result } from "types-ddd";
import { Guard } from "../../../../../../utils/Guard/Guard";
import { Amount } from "../../../ValueObjects/Amount/Amount";
import { ProductSku } from "../../Product/ProductSku/ProductSku";

export interface CartItemProps {
  sku: ProductSku;
  amount: Amount;
}

export class CartItem extends ValueObject<CartItemProps> {
  private constructor(props: CartItemProps) {
    super(props, { disableSetters: true });
  }

  public static create(props: CartItemProps): Result<CartItem> {
    const validOrError = this.validateProps(props);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new CartItem(props));
  }

  private static validateProps(props: CartItemProps): IResult<any> {
    return Result.combine([
      Guard.againstNullOrUndefinedBulk([
        { argument: props?.sku, argumentName: "sku" },
        { argument: props?.amount, argumentName: "amount" },
      ]),
      Guard.againstAtLeast(1, props?.sku, "sku"),
    ]);
  }

  public getSku(): ProductSku {
    return this.get("sku");
  }

  public getAmount() {
    return this.get("amount");
  }
}
