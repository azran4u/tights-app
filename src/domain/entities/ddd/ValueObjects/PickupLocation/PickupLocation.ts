import { IResult, Fail, Ok } from "types-ddd";
import {
  ValueDisplayName,
  ValueDisplayNameProps,
} from "../../../../../utils/ValueObjects/ValueDisplayName/ValueDisplayName";

export type PickupLocationProps = ValueDisplayNameProps;

export class PickupLocation extends ValueDisplayName {
  public static create(props: ValueDisplayNameProps): IResult<PickupLocation> {
    const validOrError = ValueDisplayName.validateProps(props);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new PickupLocation(props));
  }
}

// import { Ok, Fail, IResult, ValueObject, Result } from "types-ddd";
// import { NonEmptyString } from "../NonEmptyString/NonEmptyString";
// import { Guard } from "../../../../utils/Guard/Guard";

// export interface PickupLocationProps {
//   value: string;
//   displayName: string;
// }

// export class PickupLocation extends ValueObject<PickupLocationProps> {
//   private constructor(props: PickupLocationProps) {
//     super(props, { disableSetters: true });
//   }

//   public static create(props: PickupLocationProps): Result<PickupLocation> {
//     const validOrError = this.validateProps(props);
//     if (validOrError.isFail()) return Fail(validOrError.error());
//     return Ok(new PickupLocation(props));
//   }

//   private static validateProps(props: PickupLocationProps): IResult<any> {
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
