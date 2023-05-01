import { Result, Fail, Ok } from "types-ddd";
import {
  ValueDisplayName,
  ValueDisplayNameProps,
} from "../../../../../utils/ValueObjects/ValueDisplayName/ValueDisplayName";

export type ProductLegProps = ValueDisplayNameProps;
export class ProductLeg extends ValueDisplayName {
  public static create(props: ValueDisplayNameProps): Result<ProductLeg> {
    const validOrError = ValueDisplayName.validateProps(props);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new ProductLeg(props));
  }
}

// import { Ok, Fail, IResult, ValueObject, Result } from "types-ddd";
// import { NonEmptyString } from "../NonEmptyString/NonEmptyString";
// import { Guard } from "../../../../utils/Guard/Guard";

// export interface ProductLegProps {
//   value: string;
//   displayName: string;
// }

// export class ProductLeg extends ValueObject<ProductLegProps> {
//   private constructor(props: ProductLegProps) {
//     super(props, { disableSetters: true });
//   }

//   public static create(props: ProductLegProps): Result<ProductLeg> {
//     const validOrError = this.validateProps(props);
//     if (validOrError.isFail()) return Fail(validOrError.error());
//     return Ok(new ProductLeg(props));
//   }

//   private static validateProps(props: ProductLegProps): IResult<any> {
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
