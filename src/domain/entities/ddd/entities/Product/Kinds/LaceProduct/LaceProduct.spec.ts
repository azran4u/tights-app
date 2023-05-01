import { clone } from "lodash";
import { HEXColorValueObject } from "types-ddd";
import { ProductMedia } from "../../ProductMedia/ProductMedia";
import { ProductVariant } from "../../ProductVariant/ProductVariant";
import { ProductColorVariant } from "../../ProductVariant/ProductColorVariant";
import { ProductVariantSet } from "../../ProductVariant/ProductVariantSet";
import { LaceProduct, LaceProductProps } from "./LaceProduct";

describe("LaceProduct", () => {
  const lace = ProductVariant.create({
    kind: "lace",
    value: "fan",
    displayName: "מניפה",
    displayOrder: 1,
  }).value();
  const size = ProductVariant.create({
    kind: "size",
    value: "L",
    displayName: "L",
    displayOrder: 1,
  }).value();
  const color = ProductColorVariant.create({
    kind: "color",
    value: "black",
    displayName: "שחור",
    displayOrder: 1,
    cssColor: HEXColorValueObject.create("#ffffff").value(),
  }).value();
  const props: LaceProductProps = {
    description: "description",
    media: ProductMedia.create({ images: [], primaryImage: "" }).value(),
    price: 1,
    supplier: "supplier",
    lace,
    size,
    color,
  };

  test("should create minimal viable base product", () => {
    const productOrError = LaceProduct.create(clone(props));
    const product = productOrError.value();
    expect(productOrError.isOk()).toBeTruthy;
    expect(product.getKind()).toEqual("LaceProduct");
    expect(product.getDescription()).toEqual(props.description);
    expect(product.getImages()).toEqual(props.media.getImages());
    expect(product.getPrimaryImage()).toEqual(props.media.getPrimaryImage());
    expect(product.getPrice()).toEqual(props.price);
    expect(product.getSupplier()).toEqual(props.supplier);
    expect(product.getVariants().toObject()).toEqual(
      ProductVariantSet.create({ variants: [lace, size, color] })
        .value()
        .toObject()
    );
  });

  test("create should fail when mandatory prop is undefined", () => {
    const mandatoryProps = ["lace", "size", "color"];
    mandatoryProps.forEach((prop) => {
      const baseProductProps: LaceProductProps = clone(props);
      // @ts-ignore
      baseProductProps[prop] = undefined;
      const productOrError = LaceProduct.create(baseProductProps);
      expect(productOrError.isFail()).toBeTruthy;
    });
  });
});
