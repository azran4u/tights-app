import { HEXColorValueObject } from "types-ddd";
import {
  ProductColorVariant,
  ProductColorVariantProps,
} from "./ProductColorVariant";
import { clone } from "lodash";

describe("ProductColorVariant", () => {
  const kind = "color";
  const value = "black";
  const displayName = "שחור";
  const displayOrder = 1;
  const cssColor = HEXColorValueObject.create("#ffffff").value();
  const props: ProductColorVariantProps = {
    kind,
    value,
    displayName,
    displayOrder,
    cssColor,
  };
  test("should create valid ProductVariant", () => {
    const productColorVariantOrError = ProductColorVariant.create(props);
    const productColorVariant = productColorVariantOrError.value();
    expect(productColorVariantOrError.isOk()).toBeTruthy;
    expect(productColorVariant.getKind()).toEqual(kind);
    expect(productColorVariant.getValue()).toEqual(value);
    expect(productColorVariant.getDisplayName()).toEqual(displayName);
    expect(productColorVariant.getDisplayOrder()).toEqual(displayOrder);
    expect(productColorVariant.getCssColor()).toEqual("#ffffff");
  });

  test("create should fail when mandatory prop is undefined", () => {
    const mandatoryProps = ["kind", "value", "displayName", "cssColor"];
    mandatoryProps.forEach((prop) => {
      const productVariantProps: ProductColorVariantProps = clone(props);
      // @ts-ignore
      productVariantProps[prop] = undefined;
      const productOrError = ProductColorVariant.create(productVariantProps);
      expect(productOrError.isFail()).toBeTruthy;
    });
  });
});
