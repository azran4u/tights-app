import { Ok, Fail, IResult, ValueObject, Result } from "types-ddd";
import { Guard } from "../../../../../../utils/Guard/Guard";
import { Amount } from "../../../ValueObjects/Amount/Amount";
import { ProductSku } from "../ProductSku/ProductSku";
import { ImagePath } from "../../../ValueObjects/ImagePath/ImagePath";

export interface ProductMediaProps {
  images: ImagePath[];
  primaryImage: ImagePath;
}

export class ProductMedia extends ValueObject<ProductMediaProps> {
  private constructor(props: ProductMediaProps) {
    super(props, { disableSetters: true });
  }

  public static create(props: ProductMediaProps): Result<ProductMedia> {
    const validOrError = this.validateProps(props);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new ProductMedia(props));
  }

  private static validateProps(props: ProductMediaProps): IResult<any> {
    return Result.combine([
      Guard.againstNullOrUndefinedBulk([
        { argument: props?.images, argumentName: "images" },
        { argument: props?.primaryImage, argumentName: "primaryImage" },
      ]),
      Guard.isArray(props?.images, "images"),
    ]);
  }

  public getImages(): ImagePath[] {
    return this.get("images");
  }

  public getPrimaryImage(): ImagePath {
    return this.get("primaryImage");
  }
}
