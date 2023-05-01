import { HEXColorValueObject } from "types-ddd";
import { ProductColor, ProductColorProps } from "./ProductColor";

describe("ProductColor", () => {
  const validProductColorProps: ProductColorProps = {
    value: "black",
    hebrewName: "שחור",
    cssColor: HEXColorValueObject.create("#ffffff").value(),
  };
  const productColorOrError = ProductColor.create(validProductColorProps);
  const validProductColor = productColorOrError.value();

  test("basic", () => {
    expect(productColorOrError.isOk()).toBeTruthy;
  });

  test("should return values", () => {
    expect(validProductColor.getValue()).toEqual("black");
    expect(validProductColor.getHebrewName()).toEqual("שחור");
    expect(validProductColor.getCssColor()).toEqual("#ffffff");
  });

  test("should fail when props is undefined", () => {
    // @ts-ignore
    const valueLabelColorOrError = ProductColor.create(undefined);
    expect(valueLabelColorOrError.isFail()).toBeTruthy;
  });

  test("should fail when value is undefined", () => {
    const valueLabelColorOrError = ProductColor.create({
      ...validProductColorProps,
      // @ts-ignore
      value: undefined,
    });
    expect(valueLabelColorOrError.isFail()).toBeTruthy;
  });

  test("should fail when hebrewName is undefined", () => {
    const valueLabelColorOrError = ProductColor.create({
      ...validProductColorProps,
      // @ts-ignore
      hebrewName: undefined,
    });
    expect(valueLabelColorOrError.isFail()).toBeTruthy;
  });

  test("should fail when cssColor is undefined", () => {
    const valueLabelColorOrError = ProductColor.create({
      ...validProductColorProps,
      // @ts-ignore
      cssColor: undefined,
    });
    expect(valueLabelColorOrError.isFail()).toBeTruthy;
  });
});
