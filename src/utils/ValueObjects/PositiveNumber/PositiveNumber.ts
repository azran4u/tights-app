import { Ok, Fail, Result, ValueObject, IResult } from "types-ddd";
import { Guard } from "../../Guard/Guard";

export class PositiveNumber extends ValueObject<number> {
  protected constructor(value: number) {
    super(value, { disableSetters: true });
  }

  static validateProps(value: number): IResult<boolean> {
    return Result.combine([
      Guard.againstNullOrUndefined(value, "value"),
      Guard.isNumber(value, "value"),
      Guard.inRange(value, 0, Number.MAX_SAFE_INTEGER, "value"),
    ]);
  }

  public static create(props: number): IResult<PositiveNumber> {
    const isValidOrError = this.validateProps(props);
    if (isValidOrError.isFail()) return Fail(isValidOrError.error());
    return Ok(new PositiveNumber(props));
  }

  public getValue() {
    return this.props;
  }

  public increament(): PositiveNumber {
    return this.updateValue(1);
  }

  public decreament(): PositiveNumber {
    return this.updateValue(-1);
  }

  private updateValue(delta: number) {
    const value = this.getValue();
    const nextValueOrError = PositiveNumber.create(value + delta);
    if (nextValueOrError.isFail()) return this;
    return nextValueOrError.value();
  }
}
