import { Result as IResult, Fail, Ok } from "types-ddd";
import {
  ValueDisplayName,
  ValueDisplayNameProps,
} from "../../../../../utils/ValueObjects/ValueDisplayName/ValueDisplayName";

export type DenierThicknessProps = ValueDisplayNameProps;

export class DenierThickness extends ValueDisplayName {
  public static create(props: ValueDisplayNameProps): IResult<DenierThickness> {
    const validOrError = ValueDisplayName.validateProps(props);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new DenierThickness(props));
  }
}

// import { Ok, Fail, IResult, ValueObject, Result } from "types-ddd";
// import { Guard } from "../../../../utils/Guard/Guard";

// export interface DenierThicknessProps {
//   value: string;
//   displayName: string;
// }

// export class DenierThickness extends ValueObject<DenierThicknessProps> {
//   private constructor(props: DenierThicknessProps) {
//     super(props, { disableSetters: true });
//   }

//   public static create(props: DenierThicknessProps): Result<DenierThickness> {
//     const validOrError = this.validateProps(props);
//     if (validOrError.isFail()) return Fail(validOrError.error());
//     return Ok(new DenierThickness(props));
//   }

//   private static validateProps(props: DenierThicknessProps): IResult<any> {
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
