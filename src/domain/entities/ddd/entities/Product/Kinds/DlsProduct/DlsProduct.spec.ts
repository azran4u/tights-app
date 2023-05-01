import { clone } from "lodash";
import { HEXColorValueObject } from "types-ddd";
import { DlsProduct, DlsProductProps } from "./DlsProduct";
import { ProductMedia } from "../../ProductMedia/ProductMedia";
import { ProductVariant } from "../../ProductVariant/ProductVariant";
import { ProductColorVariant } from "../../ProductVariant/ProductColorVariant";
import { ProductVariantSet } from "../../ProductVariant/ProductVariantSet";

describe("DlsProduct", () => {
  const denier = ProductVariant.create({
    kind: "denier",
    value: "120",
    displayName: "120 דניר",
    displayOrder: 1,
  }).value();
  const leg = ProductVariant.create({
    kind: "leg",
    value: "with-leg",
    displayName: "עם רגל",
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
  const props: DlsProductProps = {
    description: "description",
    media: ProductMedia.create({ images: [], primaryImage: "" }).value(),
    price: 1,
    supplier: "supplier",
    denier,
    leg,
    size,
    color,
  };

  test("should create minimal viable base product", () => {
    const productOrError = DlsProduct.create(clone(props));
    const product = productOrError.value();
    expect(productOrError.isOk()).toBeTruthy;
    expect(product.getKind()).toEqual("DlsProduct");
    expect(product.getDescription()).toEqual(props.description);
    expect(product.getImages()).toEqual(props.media.getImages());
    expect(product.getPrimaryImage()).toEqual(props.media.getPrimaryImage());
    expect(product.getPrice()).toEqual(props.price);
    expect(product.getSupplier()).toEqual(props.supplier);
    expect(product.getVariants().toObject()).toEqual(
      ProductVariantSet.create({ variants: [denier, leg, size, color] })
        .value()
        .toObject()
    );
  });

  test("create should fail when mandatory prop is undefined", () => {
    const mandatoryProps = ["denier", "leg", "size", "color"];
    mandatoryProps.forEach((prop) => {
      const baseProductProps: DlsProductProps = clone(props);
      // @ts-ignore
      baseProductProps[prop] = undefined;
      const productOrError = DlsProduct.create(baseProductProps);
      expect(productOrError.isFail()).toBeTruthy;
    });
  });
});
