import { Fail, IResult, Result, ValueObject, Ok } from "types-ddd";
import { Guard } from "../../../../../../utils/Guard/Guard";

export interface ProductVariantProps {
  value: string;
  displayName: string;
  displayOrder?: number;
}

export class ProductVariant extends ValueObject<ProductVariantProps> {
  protected constructor(props: ProductVariantProps) {
    super(props, { disableSetters: true });
  }

  public static create(props: ProductVariantProps): IResult<ProductVariant> {
    const validOrError = this.validateProps(props);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new ProductVariant(props));
  }

  protected static validateProps(props: ProductVariantProps): IResult<any> {
    return Result.combine([
      Guard.againstNullOrUndefinedBulk([
        { argument: props?.value, argumentName: "value" },
        { argument: props?.displayName, argumentName: "displayName" },
      ]),
    ]);
  }

  getValue(): string {
    return this.get("value");
  }

  getDisplayName(): string {
    return this.get("displayName");
  }

  getDisplayOrder(): number {
    return this.get("displayOrder") ?? 0;
  }
}
