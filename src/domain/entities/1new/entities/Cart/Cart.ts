import { Ok, Fail, IResult, Result, Entity, UID } from "types-ddd";
import { Guard } from "../../../../../utils/Guard/Guard";
import { CartItem } from "../../ValueObjects/CartItem/CartItem";
import { Amount } from "../../ValueObjects/Amount/Amount";
import { isNil } from "lodash";
import { ProductSku } from "../Product/ProductSku/ProductSku";

export interface CartProps {
  id?: UID;
  items: CartItem[];
}

export class Cart extends Entity<CartProps> {
  private map: Map<ProductSku, Amount>;

  private constructor(props: CartProps) {
    super(props, { disableSetters: true, disableGetters: true });
    this.map = new Map<ProductSku, Amount>();
    this.itemsArrayToMap(props.items);
  }

  public static create(props: CartProps): IResult<Cart> {
    const validOrError = this.validateProps(props);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new Cart(props));
  }

  public static createEmptyCart(): Cart {
    return this.create({ items: [] }).value();
  }

  private static validateProps(props: CartProps): IResult<any> {
    return Result.combine([
      Guard.againstNullOrUndefined(props?.items, "items"),
      Guard.isArray(props?.items, "items"),
    ]);
  }

  public getItemsMap(): Map<ProductSku, Amount> {
    return this.map;
  }

  public getItemsArray(): CartItem[] {
    const cartItemsArray: CartItem[] = [];
    this.map.forEach((amount, sku) => {
      const cartItem = CartItem.create({ sku, amount }).value();
      cartItemsArray.push(cartItem);
    });
    return cartItemsArray;
  }

  public getAmountBySku(sku: ProductSku): IResult<Amount> {
    const skuGuard = Guard.againstNullOrUndefined(sku, "sku");
    if (skuGuard.isFail()) return Fail(skuGuard.error());

    const amountOrundefined = this.map.get(sku);

    if (isNil(amountOrundefined)) return Fail(`sku ${sku} not found`);
    return Ok(amountOrundefined);
  }

  public getSkuCount(): number {
    return this.map.size;
  }

  public getTotalAmount(): Amount {
    const totalAmount = Array.from(this.map.values()).reduce(
      (sum, amount) => sum + amount.getValue(),
      0
    );
    return Amount.create(totalAmount).value();
  }

  public addItems(items: CartItem[]): IResult<Cart> {
    // we create a clone so in case we have failure with one item the original cart won't change
    const cartClone = this.clone();

    const results: IResult<Cart>[] = [];
    items.forEach((item) => {
      const result = cartClone.addItem(item);
      results.push(result);
    });

    const successOrError = Result.combine(results);
    if (successOrError.isFail()) return Fail(successOrError.error());

    items.forEach((item) => {
      this.addItem(item);
    });

    return Ok(cartClone);
  }

  public addItem(item: CartItem): IResult<Cart> {
    const itemGuard = Guard.againstNullOrUndefined(item, "item");
    if (itemGuard.isFail()) return Fail(itemGuard.error());

    const sku = item.getSku();
    const amount = item.getAmount();

    const amountOrError = this.getAmountBySku(sku);
    if (amountOrError.isFail())
      return this.createOrOverrideSkuAmount(sku, amount);

    const currentAmount = amountOrError.value();
    return this.createOrOverrideSkuAmount(sku, currentAmount.add(amount));
  }

  public removeItemBySku(sku: ProductSku): IResult<Cart> {
    const skuGuard = Guard.againstNullOrUndefined(sku, "sku");
    if (skuGuard.isFail()) return Fail(skuGuard.error());

    const amountOrError = this.getAmountBySku(sku);
    if (amountOrError.isFail()) return Fail(amountOrError.error());

    this.map.delete(sku);

    return Ok(this.clone());
  }

  public increamentSkuByAmount(sku: ProductSku, amount: Amount): IResult<Cart> {
    return this.changeSkuAmountByOperation(sku, amount, "add");
  }

  public increamentSkuByOne(sku: ProductSku): IResult<Cart> {
    return this.increamentSkuByAmount(sku, Amount.one());
  }

  public decreamentSkuByAmount(sku: ProductSku, amount: Amount): IResult<Cart> {
    return this.changeSkuAmountByOperation(sku, amount, "subtract");
  }

  public decreamentSkuByOne(sku: ProductSku): IResult<Cart> {
    return this.decreamentSkuByAmount(sku, Amount.one());
  }

  public clone(): Cart {
    return Cart.create({ items: this.getItemsArray() }).value();
  }

  private changeSkuAmountByOperation(
    sku: ProductSku,
    amount: Amount,
    operation: "add" | "subtract"
  ): IResult<Cart> {
    const amountOrError = this.getAmountBySku(sku);
    if (amountOrError.isFail()) return Fail(amountOrError.error());

    const currentAmount = amountOrError.value();

    let newAmount: Amount;
    switch (operation) {
      case "add":
        newAmount = currentAmount.add(amount);
        break;

      case "subtract":
        newAmount = currentAmount.subtract(amount);
        break;

      default:
        return Fail(`illegal operation ${operation}`);
    }

    return this.createOrOverrideSkuAmount(sku, newAmount);
  }

  private createOrOverrideSkuAmount(
    sku: ProductSku,
    amount: Amount
  ): IResult<Cart> {
    this.map.set(sku, amount);
    return Ok(this.clone());
  }

  private itemsArrayToMap(items: CartItem[]) {
    items.forEach((item) => {
      const currentOrUndefined = this.map.get(item.getSku());
      if (isNil(currentOrUndefined)) {
        this.map.set(item.getSku(), item.getAmount());
      } else {
        this.map.set(item.getSku(), currentOrUndefined.add(item.getAmount()));
      }
    });
  }
}
