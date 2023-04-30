import { HEXColorValueObject } from "types-ddd";
import { ProductVariant } from "./ProductVariant";
import { ProductColorVariant } from "./ProductColorVariant";

describe("ProductColorVariant", () => {
  const value = "black";
  const displayName = "שחור";
  const displayOrder = 1;
  const cssColor = HEXColorValueObject.create("#ffffff").value();
  test("should create valid ProductVariant", () => {
    const productColorVariantOrError = ProductColorVariant.create({
      value,
      displayName,
      displayOrder,
      cssColor,
    });
    const productColorVariant = productColorVariantOrError.value();
    expect(productColorVariantOrError.isOk()).toBeTruthy;
    expect(productColorVariant.getValue()).toEqual(value);
    expect(productColorVariant.getDisplayName()).toEqual(displayName);
    expect(productColorVariant.getDisplayOrder()).toEqual(displayOrder);
    expect(productColorVariant.getCssColor()).toEqual("#ffffff");
  });

  test("display order is optional", () => {
    const productVariantOrError = ProductVariant.create({
      value,
      displayName,
    });
    expect(productVariantOrError.isOk()).toBeTruthy;
    expect(productVariantOrError.value().getDisplayOrder()).toEqual(0);
  });

  test("create should fail when value is undefined", () => {
    const productVariantOrError = ProductVariant.create({
      // @ts-ignore
      value: undefined,
      displayName,
      displayOrder,
    });
    expect(productVariantOrError.isFail()).toBeTruthy;
  });

  test("create should fail when displayName is undefined", () => {
    const productVariantOrError = ProductVariant.create({
      value,
      // @ts-ignore
      displayName: undefined,
      displayOrder,
    });
    expect(productVariantOrError.isFail()).toBeTruthy;
  });
});
