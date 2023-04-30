import { Ok, Fail, IResult, Result, ValueObject } from "types-ddd";
import { ProductVariant } from "./ProductVariant";
import { isArray, isNil } from "lodash";
import { Guard } from "../../../../../../utils/Guard/Guard";

export interface ProductVariantSetProps {
  variants: ProductVariant[];
}

export class ProductVariantSet extends ValueObject<ProductVariantSetProps> {
  private map: Map<string, ProductVariant>;
  protected constructor(props: ProductVariantSetProps) {
    super(props, { disableSetters: true });
    this.map = ProductVariantSet.variantsArrayToMap(props?.variants);
  }

  public static create(
    props: ProductVariantSetProps
  ): IResult<ProductVariantSet> {
    const validOrError = this.validateProps(props);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new ProductVariantSet(props));
  }

  protected static validateProps(props: ProductVariantSetProps): IResult<any> {
    return Result.combine([
      Guard.againstNullOrUndefinedBulk([
        { argument: props?.variants, argumentName: "variants" },
      ]),
      this.guardAgainstDuplicateVariants(props?.variants),
    ]);
  }

  getAll(): ProductVariant[] {
    return Array.from(this.map.values());
  }

  findByValue(value: string): IResult<ProductVariant> {
    const foundOrError = this.map.get(value);
    if (isNil(foundOrError)) return Fail(`value ${value} not found`);
    return Ok(foundOrError);
  }

  private static guardAgainstDuplicateVariants(
    variants: ProductVariant[]
  ): IResult<boolean> {
    if (isNil(variants) || !isArray(variants))
      return Fail(`variants must be an array`);
    const map = this.variantsArrayToMap(variants);
    if (map.size !== variants.length) return Fail(`duplicate variants`);
    return Ok(true);
  }

  private static variantsArrayToMap(
    variants: ProductVariant[]
  ): Map<string, ProductVariant> {
    const map = new Map<string, ProductVariant>();
    variants.forEach((variant) => map.set(variant.getValue(), variant));
    return map;
  }
}
