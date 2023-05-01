import { clone } from "lodash";
import { ProductVariant, ProductVariantProps } from "./ProductVariant";

describe("ProductVariant", () => {
  const kind = "leg";
  const value = "with leg";
  const displayName = "עם רגל";
  const displayOrder = 1;
  const props: ProductVariantProps = {
    kind,
    value,
    displayName,
    displayOrder,
  };
  test("should create valid ProductVariant", () => {
    const productVariantOrError = ProductVariant.create(props);
    expect(productVariantOrError.isOk()).toBeTruthy;
    expect(productVariantOrError.value().getKind()).toEqual(kind);
    expect(productVariantOrError.value().getValue()).toEqual(value);
    expect(productVariantOrError.value().getDisplayName()).toEqual(displayName);
    expect(productVariantOrError.value().getDisplayOrder()).toEqual(
      displayOrder
    );
  });

  test("create should fail when mandatory prop is undefined", () => {
    const mandatoryProps = ["kind", "value", "displayName"];
    mandatoryProps.forEach((prop) => {
      const productVariantProps: ProductVariantProps = clone(props);
      // @ts-ignore
      productVariantProps[prop] = undefined;
      const productOrError = ProductVariant.create(productVariantProps);
      expect(productOrError.isFail()).toBeTruthy;
    });
  });
});
