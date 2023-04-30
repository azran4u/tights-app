import { Ok, Result, ValueObject, IResult, Fail } from "types-ddd";
import { Guard } from "../../Guard/Guard";

export class NonEmptyString extends ValueObject<string> {
  private static minLength: number = 1;
  private static maxLength: number = 20;

  protected constructor(value: string) {
    super(value, { disableSetters: true });
  }

  public static create(value: string): Result<NonEmptyString> {
    const validOrError = this.validateProps(value);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new NonEmptyString(value));
  }

  protected static validateProps(value: string): IResult<any> {
    return Result.combine([
      Guard.againstNullOrUndefined(value, "value"),
      Guard.againstAtLeast(this.minLength, value, "value"),
      Guard.againstAtMost(this.maxLength, value, "value"),
    ]);
  }

  public getValue() {
    return this.props;
  }
}
