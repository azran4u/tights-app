import {
  Ok,
  Fail,
  IResult,
  ValueObject,
  Result,
  HEXColorValueObject,
} from "types-ddd";
import { Guard } from "../../../../../utils/Guard/Guard";

export interface ProductColorProps {
  value: string;
  hebrewName: string;
  cssColor: HEXColorValueObject;
}

export class ProductColor extends ValueObject<ProductColorProps> {
  private constructor(props: ProductColorProps) {
    super(props, { disableSetters: true });
  }

  public static create(props: ProductColorProps): Result<ProductColor> {
    const validOrError = this.validateProps(props);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new ProductColor(props));
  }

  private static validateProps(props: ProductColorProps): IResult<any> {
    return Result.combine([
      Guard.againstNullOrUndefinedBulk([
        { argument: props?.value, argumentName: "value" },
        { argument: props?.hebrewName, argumentName: "hebrewName" },
        { argument: props?.cssColor, argumentName: "cssColor" },
      ]),
      Guard.againstAtLeast(1, props?.value, "value"),
      Guard.againstAtLeast(1, props?.hebrewName, "hebrewName"),
    ]);
  }

  public getCssColor() {
    return this.get("cssColor").value();
  }

  public getValue() {
    return this.get("value");
  }

  public getHebrewName() {
    return this.get("hebrewName");
  }
}
