import { isString } from "lodash";
import { Ok, IResult, ValueObject, Fail } from "types-ddd";

export interface ValueLabelItemProps {
  value: string;
  label: string;
}
export class ValueLabelItem extends ValueObject<ValueLabelItemProps> {
  private constructor(props: ValueLabelItemProps) {
    super(props, { disableSetters: true });
  }

  public static create(props: ValueLabelItemProps): IResult<ValueLabelItem> {
    if (!this.isValidProps(props)) return Fail(`all props must be strings`);
    return Ok(new ValueLabelItem(props));
  }

  static isValidProps(props: any): boolean {
    return isString(props.value) && isString(props.label);
  }

  public getValue() {
    return this.props.value;
  }

  public getLabel() {
    return this.props.label;
  }
}
