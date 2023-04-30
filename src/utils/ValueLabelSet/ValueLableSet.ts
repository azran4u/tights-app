import { isNil } from "lodash";
import { ValueLabelItem } from "../ValueLabelItem/ValueLableItem";
import { IResult, Ok, Fail } from "types-ddd";

export class ValueLabelSet<ITEM extends ValueLabelItem> {
  private constructor(private list: ITEM[]) {}

  public static create<U extends ValueLabelItem>(
    list: U[]
  ): IResult<ValueLabelSet<U>> {
    const isValid = this.isValid(list);
    if (!isValid) return Fail("list values must be unique");
    return Ok(new ValueLabelSet(list));
  }

  private static isValid<T extends ValueLabelItem>(list: T[]): boolean {
    const map = new Map<unknown, T>();
    list.forEach((item) => {
      map.set(item.getValue(), item);
    });
    const listHasUniqueValues = map.size === list.length;
    return listHasUniqueValues;
  }

  public getItemByValue(value: unknown): IResult<ITEM> {
    const item = this.list.find((x) => x.getValue() === value);
    if (isNil(item)) return Fail(`value ${value} not found in list`);
    const a = item;
    // @ts-ignore
    return Ok(item);
  }

  public getLabelByValue(value: unknown): IResult<unknown> {
    const item = this.getItemByValue(value);
    if (item.isFail()) return Fail(item.error());
    return Ok(item.value().getLabel());
  }

  public hasValue(value: unknown): boolean {
    return !!this.getItemByValue(value);
  }

  public getList(): ITEM[] {
    return this.list;
  }

  public size() {
    return this.list.length;
  }
}
