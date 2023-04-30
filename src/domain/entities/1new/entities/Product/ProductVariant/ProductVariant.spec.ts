import { ProductVariant } from "./ProductVariant";

describe("ProductVariant", () => {
  const value = "leg";
  const displayName = "עם רגל";
  const displayOrder = 1;
  test("should create valid ProductVariant", () => {
    const productVariantOrError = ProductVariant.create({
      value,
      displayName,
      displayOrder,
    });
    expect(productVariantOrError.isOk()).toBeTruthy;
    expect(productVariantOrError.value().getValue()).toEqual("leg");
    expect(productVariantOrError.value().getDisplayName()).toEqual("עם רגל");
    expect(productVariantOrError.value().getDisplayOrder()).toEqual(1);
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
