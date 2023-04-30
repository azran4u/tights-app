import { Fail, IResult, Ok, Result, ValueObject } from "types-ddd";
import { Guard } from "../../../../../utils/Guard/Guard";

export class Amount extends ValueObject<number> {
  private static minValue = 0;
  private static maxValue = Number.MAX_SAFE_INTEGER;

  protected constructor(value: number) {
    super(value, { disableSetters: true });
  }

  public static create(value: number): IResult<Amount> {
    const validOrError = this.validateProps(value);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new Amount(value));
  }

  static validateProps(value: number): IResult<boolean> {
    return Result.combine([
      Guard.againstNullOrUndefined(value, "value"),
      Guard.isNumber(value, "value"),
      Guard.inRange(value, this.minValue, this.maxValue, "value"),
    ]);
  }

  public static zero(): Amount {
    return new Amount(0);
  }

  public static one(): Amount {
    return new Amount(1);
  }

  public static minAmount(): Amount {
    return new Amount(Amount.minValue);
  }

  public static maxAmount(): Amount {
    return new Amount(Amount.maxValue);
  }

  public add(x: Amount): Amount {
    const value = x.getValue();
    const current = this.getValue();
    const amount = current + value;
    if (amount > Amount.maxValue) return Amount.maxAmount();
    return new Amount(amount);
  }

  public subtract(x: Amount): Amount {
    const value = x.getValue();
    const current = this.getValue();
    const amount = current - value;
    if (amount < Amount.minValue) return Amount.minAmount();
    return new Amount(amount);
  }

  public addOne(): Amount {
    return this.add(Amount.one());
  }

  public subtractOne(): Amount {
    return this.subtract(Amount.one());
  }

  public getValue() {
    return this.props;
  }
}
