import {
  Ok,
  Fail,
  IResult,
  ValueObject,
  Result,
  EmailValueObject,
} from "types-ddd";
import { Guard } from "../../../../../utils/Guard/Guard";

export class MobilePhoneNumber extends ValueObject<string> {
  private constructor(value: string) {
    super(value, { disableSetters: true });
  }

  public static create(value: string): Result<MobilePhoneNumber> {
    const validOrError = this.validateProps(value);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new MobilePhoneNumber(value));
  }

  private static validateProps(value: string): IResult<any> {
    return Result.combine([
      Guard.againstNullOrUndefined(value, "value"),
      Guard.againstAtLeast(9, value, "phoneNumber"),
      Guard.againstAtMost(10, value, "phoneNumber"),
    ]);
  }

  public value() {
    return this.props;
  }
}
