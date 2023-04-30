import { IResult, Result, Ok, Fail } from "types-ddd";
import { Guard } from "../../../../../../../utils/Guard/Guard";
import { BaseProductProps, BaseProduct } from "../../BaseProduct/BaseProduct";
import { ProductVariant } from "../../ProductVariant/ProductVariant";
import { ProductColorVariant } from "../../ProductVariant/ProductColorVariant";
import { ProductVariantSet } from "../../ProductVariant/ProductVariantSet";

export interface DlsProductProps
  extends Omit<DlsProductConstructorProps, "variants"> {}

export interface DlsProductConstructorProps
  extends BaseProductProps,
    DlsProductVariants {}

export interface DlsProductVariants {
  denier: ProductVariant;
  leg: ProductVariant;
  size: ProductVariant;
  color: ProductColorVariant;
}

export class DlsProduct extends BaseProduct {
  private constructor(protected props: DlsProductConstructorProps) {
    super(props);
    this.kind = "DlsProduct";
  }

  static create(props: DlsProductProps): IResult<DlsProduct> {
    const constructorPropsOrError = this.calcConstructorProps(props);
    if (constructorPropsOrError.isFail())
      return Fail(constructorPropsOrError.error());

    const constructorProps = constructorPropsOrError.value();

    const validOrError = this.validateProps(constructorPropsOrError.value());
    if (validOrError.isFail()) return Fail(validOrError.error());

    return Ok(new DlsProduct(constructorProps));
  }

  private static calcConstructorProps(
    props: DlsProductProps
  ): IResult<DlsProductConstructorProps> {
    const productVariantSetOrError = ProductVariantSet.create({
      variants: [props?.denier, props?.leg, props?.size, props?.color],
    });
    if (productVariantSetOrError.isFail())
      return Fail(productVariantSetOrError.error());
    const constructorProps: DlsProductConstructorProps = {
      ...props,
      variants: productVariantSetOrError.value(),
    };
    return Ok(constructorProps);
  }

  private static validateProps(
    props: DlsProductConstructorProps
  ): IResult<any> {
    return Result.combine([
      BaseProduct.validateCommonProps(props),
      Guard.againstNullOrUndefinedBulk([
        { argument: props?.denier, argumentName: "denier" },
        { argument: props?.leg, argumentName: "leg" },
        { argument: props?.size, argumentName: "size" },
        { argument: props?.color, argumentName: "color" },
      ]),
    ]);
  }

  getDenier(): ProductVariant {
    return this.props.denier;
  }
  getLeg(): ProductVariant {
    return this.props.leg;
  }
  getSize(): ProductVariant {
    return this.props.size;
  }
  getColor(): ProductColorVariant {
    return this.props.color;
  }
}
