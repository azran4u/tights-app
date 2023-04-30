import { Result, Fail, Ok } from "types-ddd";
import { NonEmptyString } from "../../../../../utils/ValueObjects/NonEmptyString/NonEmptyString";

export class ProductSku extends NonEmptyString {
  public static create(value: string): Result<ProductSku> {
    const validOrError = NonEmptyString.validateProps(value);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new ProductSku(value));
  }
}
