import { Ok, Fail, IResult, ValueObject, Result } from "types-ddd";
import { Guard } from "../../Guard/Guard";

export interface ValueDisplayNameProps {
  value: string;
  displayName: string;
}

export class ValueDisplayName extends ValueObject<ValueDisplayNameProps> {
  protected constructor(props: ValueDisplayNameProps) {
    super(props, { disableSetters: true });
  }

  public static create(
    props: ValueDisplayNameProps
  ): IResult<ValueDisplayName> {
    const validOrError = this.validateProps(props);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new ValueDisplayName(props));
  }

  protected static validateProps(props: ValueDisplayNameProps): IResult<any> {
    return Result.combine([
      Guard.againstNullOrUndefinedBulk([
        { argument: props?.value, argumentName: "value" },
        { argument: props?.displayName, argumentName: "displayName" },
      ]),
      Guard.againstAtLeast(1, props?.value, "value"),
      Guard.againstAtLeast(1, props?.displayName, "displayName"),
    ]);
  }

  public getValue() {
    return this.get("value");
  }

  public getDisplayName() {
    return this.get("displayName");
  }
}
