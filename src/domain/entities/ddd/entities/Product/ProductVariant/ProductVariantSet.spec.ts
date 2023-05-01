import { ProductVariant } from "./ProductVariant";
import { ProductVariantSet } from "./ProductVariantSet";

describe("ProductVariantSet", () => {
  const variant1 = ProductVariant.create({
    kind: "kind",
    value: "value1",
    displayName: "display1",
  }).value();
  const variant2 = ProductVariant.create({
    kind: "kind",
    value: "value2",
    displayName: "display2",
  }).value();

  test("should create valid ProductVariant", () => {
    const productVariantSetOrError = ProductVariantSet.create({
      variants: [variant1, variant2],
    });
    const productVariantSet = productVariantSetOrError.value();
    expect(productVariantSetOrError.isOk()).toBeTruthy;
    expect(productVariantSet.getAll().length).toEqual(2);
  });

  test("create should fail when variants are undefined", () => {
    const productVariantSetOrError = ProductVariantSet.create({
      //@ts-ignore
      variants: undefined,
    });
    expect(productVariantSetOrError.isFail()).toBeTruthy;
  });

  test("create should fail when variants are not an array", () => {
    const productVariantSetOrError = ProductVariantSet.create({
      //@ts-ignore
      variants: 1,
    });
    expect(productVariantSetOrError.isFail()).toBeTruthy;
  });

  test("create should fail when variants include duplicate values", () => {
    const productVariantSetOrError = ProductVariantSet.create({
      variants: [variant1, variant1],
    });
    expect(productVariantSetOrError.isFail()).toBeTruthy;
  });
});
