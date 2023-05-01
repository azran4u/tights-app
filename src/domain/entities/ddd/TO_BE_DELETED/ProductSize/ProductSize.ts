import { Result, Fail, Ok } from "types-ddd";
import {
  ValueDisplayName,
  ValueDisplayNameProps,
} from "../../../../../utils/ValueObjects/ValueDisplayName/ValueDisplayName";

export type ProductSizeProps = ValueDisplayNameProps;
export class ProductSize extends ValueDisplayName {
  public static create(props: ValueDisplayNameProps): Result<ProductSize> {
    const validOrError = ValueDisplayName.validateProps(props);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new ProductSize(props));
  }
}
// import { Ok, Fail, IResult, ValueObject, Result } from "types-ddd";
// import { Guard } from "../../../../utils/Guard/Guard";

// export interface ProductSizeProps {
//   value: string;
//   displayName: string;
// }

// export class ProductSize extends ValueObject<ProductSizeProps> {
//   private constructor(props: ProductSizeProps) {
//     super(props, { disableSetters: true });
//   }

//   public static create(props: ProductSizeProps): Result<ProductSize> {
//     const validOrError = this.validateProps(props);
//     if (validOrError.isFail()) return Fail(validOrError.error());
//     return Ok(new ProductSize(props));
//   }

//   private static validateProps(props: ProductSizeProps): IResult<any> {
//     return Result.combine([
//       Guard.againstNullOrUndefinedBulk([
//         { argument: props?.value, argumentName: "value" },
//         { argument: props?.displayName, argumentName: "displayName" },
//       ]),
//       Guard.againstAtLeast(1, props?.value, "value"),
//       Guard.againstAtLeast(1, props?.displayName, "displayName"),
//     ]);
//   }

//   public getValue() {
//     return this.get("value");
//   }

//   public getDisplayName() {
//     return this.get("displayName");
//   }
// }
