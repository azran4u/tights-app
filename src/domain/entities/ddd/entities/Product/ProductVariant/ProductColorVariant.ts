import { Fail, IResult, Result, Ok, HEXColorValueObject } from "types-ddd";
import { Guard } from "../../../../../../utils/Guard/Guard";
import { ProductVariantProps, ProductVariant } from "./ProductVariant";

export interface ProductColorVariantProps extends ProductVariantProps {
  cssColor: HEXColorValueObject;
}

export class ProductColorVariant extends ProductVariant {
  private cssColor: HEXColorValueObject;
  protected constructor(props: ProductColorVariantProps) {
    super(props);
    this.cssColor = props.cssColor;
  }

  public static create(
    props: ProductColorVariantProps
  ): IResult<ProductColorVariant> {
    const validOrError = this.validateColorProps(props);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new ProductColorVariant(props));
  }

  private static validateColorProps(
    props: ProductColorVariantProps
  ): IResult<any> {
    return Result.combine([
      ProductVariant.validateProps(props),
      Guard.againstNullOrUndefinedBulk([
        { argument: props?.cssColor, argumentName: "cssColor" },
      ]),
    ]);
  }

  public getCssColor() {
    return this.cssColor.value();
  }
}
