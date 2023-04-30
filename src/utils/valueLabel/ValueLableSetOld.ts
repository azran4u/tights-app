import { isNil } from "lodash";
import { ValueLabel } from "./ValueLabel";

export class ValueLabelSetOld<VALUE = string, LABLE = string> {
  private map: Map<VALUE, LABLE> = new Map<VALUE, LABLE>();

  constructor(private list: ValueLabel<VALUE, LABLE>[]) {
    this.list.forEach((element) => {
      const key = element.value;
      const value = element.label;
      this.map.set(key, value);
    });
  }

  public hasValue(value: VALUE): boolean {
    return this.map.has(value);
  }

  public getByValue(value: VALUE): ValueLabel<VALUE, LABLE> {
    const label = this.map.get(value);
    if (isNil(label)) throw Error(`value ${value} not found in list`);
    return {
      value,
      label,
    };
  }

  public getList(): ValueLabel<VALUE, LABLE>[] {
    return this.list;
  }
}
