import { ValueLabelItem } from "../ValueLabelItem/ValueLableItem";
import { ValueLabelSet } from "./ValueLableSet";

describe("ValueLabelSet", () => {
  const itemA = ValueLabelItem.create({ value: "valueA", label: "labelA" });
  const itemB = ValueLabelItem.create({ value: "valueB", label: "labelB" });
  const validValueLabelSet = ValueLabelSet.create([
    itemA.value(),
    itemB.value(),
  ]).value();

  test("basic", () => {
    expect(validValueLabelSet).toBeDefined;
  });

  test("should not allow duplicate values", () => {
    try {
      ValueLabelSet.create([itemA.value(), itemA.value()]);
    } catch (error) {
      expect(error).toBeDefined;
    }
  });

  test("should find label by value", () => {
    const labelOeError = validValueLabelSet.getLabelByValue("valueA");
    expect(labelOeError.isOk()).toEqual(true);
    expect(labelOeError.value()).toEqual("labelA");
  });

  test("should find if value exsits", () => {
    const valueExists = validValueLabelSet.hasValue("valueA");
    expect(valueExists).toEqual(true);
  });

  test("should return list length", () => {
    const size = validValueLabelSet.size();
    expect(size).toEqual(2);
  });

  test("should return all items", () => {
    const items = validValueLabelSet.getList();
    expect(items.length).toEqual(2);
  });

  test("should throw when given non exists value", () => {
    const itemOrError = validValueLabelSet.getItemByValue("non-exists");
    expect(itemOrError.isFail()).toBeTruthy;
  });
});
