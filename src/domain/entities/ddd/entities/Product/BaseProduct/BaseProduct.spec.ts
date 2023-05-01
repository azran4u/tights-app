import { clone } from "lodash";
import { ProductMedia } from "../ProductMedia/ProductMedia";
import { ProductVariantSet } from "../ProductVariant/ProductVariantSet";
import { BaseProduct, BaseProductProps } from "./BaseProduct";
import { Fail, IResult, Result, Ok } from "types-ddd";

describe("BaseProduct", () => {
  const props: BaseProductProps = {
    description: "description",
    media: ProductMedia.create({ images: [], primaryImage: "" }).value(),
    price: 1,
    supplier: "supplier",
    variants: ProductVariantSet.create({ variants: [] }).value(),
  };

  class TestProduct extends BaseProduct {
    constructor(props: BaseProductProps) {
      super(props);
      this.kind = "TestProduct";
    }

    public static create(props: BaseProductProps): IResult<TestProduct> {
      const validOrError = this.validateProps(props);
      if (validOrError.isFail()) return Fail(validOrError.error());
      return Ok(new TestProduct(props));
    }

    private static validateProps(props: BaseProductProps): IResult<any> {
      return Result.combine([BaseProduct.validateCommonProps(props)]);
    }
  }

  test("should create minimal viable base product", () => {
    const productOrError = TestProduct.create(clone(props));
    const product = productOrError.value();
    expect(productOrError.isOk()).toBeTruthy;
    expect(product.getKind()).toEqual("TestProduct");
    expect(product.getDescription()).toEqual(props.description);
    expect(product.getImages()).toEqual(props.media.getImages());
    expect(product.getPrimaryImage()).toEqual(props.media.getPrimaryImage());
    expect(product.getPrice()).toEqual(props.price);
    expect(product.getSupplier()).toEqual(props.supplier);
    expect(product.getVariants()).toEqual(props.variants);
  });

  test("create should fail when mandatory prop is undefined", () => {
    const mandatoryProps = ["description", "media", "price", "supplier"];
    mandatoryProps.forEach((prop) => {
      const baseProductProps: BaseProductProps = clone(props);
      // @ts-ignore
      baseProductProps[prop] = undefined;
      const productOrError = TestProduct.create(baseProductProps);
      expect(productOrError.isFail()).toBeTruthy;
    });
  });
});
