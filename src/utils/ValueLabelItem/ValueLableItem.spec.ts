import { ValueLabelItem } from "./ValueLableItem";

describe("ValueLabelItem", () => {
  const valueLabel = ValueLabelItem.create({
    value: "value",
    label: "label",
  });

  test("basic", () => {
    expect(valueLabel.isOk()).toBeTruthy;
  });

  test("read value", () => {
    const value = valueLabel.value().get("value");
    expect(value).toEqual("value");
  });

  test("read label", () => {
    const value = valueLabel.value().get("label");
    expect(value).toEqual("label");
  });
});
