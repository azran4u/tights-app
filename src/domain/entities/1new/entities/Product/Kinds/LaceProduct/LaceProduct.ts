import { IResult, Result, Ok, Fail } from "types-ddd";
import { Guard } from "../../../../../../../utils/Guard/Guard";
import { BaseProductProps, BaseProduct } from "../../BaseProduct/BaseProduct";
import { ProductVariant } from "../../ProductVariant/ProductVariant";
import { ProductColorVariant } from "../../ProductVariant/ProductColorVariant";
import { ProductVariantSet } from "../../ProductVariant/ProductVariantSet";

export interface LaceProductProps
  extends Omit<LaceProductConstructorProps, "variants"> {}

export interface LaceProductConstructorProps
  extends BaseProductProps,
    LaceProductVariants {}

export interface LaceProductVariants {
  lace: ProductVariant;
  size: ProductVariant;
  color: ProductColorVariant;
}

export class LaceProduct extends BaseProduct {
  private constructor(protected props: LaceProductConstructorProps) {
    super(props);
    this.kind = "LaceProduct";
  }

  static create(props: LaceProductProps): IResult<LaceProduct> {
    const constructorPropsOrError = this.calcConstructorProps(props);
    if (constructorPropsOrError.isFail())
      return Fail(constructorPropsOrError.error());

    const constructorProps = constructorPropsOrError.value();

    const validOrError = this.validateProps(constructorPropsOrError.value());
    if (validOrError.isFail()) return Fail(validOrError.error());

    return Ok(new LaceProduct(constructorProps));
  }

  private static validateProps(
    props: LaceProductConstructorProps
  ): IResult<any> {
    return Result.combine([
      BaseProduct.validateCommonProps(props),
      Guard.againstNullOrUndefinedBulk([
        { argument: props?.lace, argumentName: "lace" },
        { argument: props?.size, argumentName: "size" },
        { argument: props?.color, argumentName: "color" },
      ]),
    ]);
  }

  private static calcConstructorProps(
    props: LaceProductProps
  ): IResult<LaceProductConstructorProps> {
    const productVariantSetOrError = ProductVariantSet.create({
      variants: [props?.lace, props?.size, props?.color],
    });
    if (productVariantSetOrError.isFail())
      return Fail(productVariantSetOrError.error());
    const constructorProps: LaceProductConstructorProps = {
      ...props,
      variants: productVariantSetOrError.value(),
    };
    return Ok(constructorProps);
  }
}
