import { IResult, Result, Ok, Fail, Entity, UID } from "types-ddd";
import { Guard } from "../../../../../../utils/Guard/Guard";
import { Product } from "../Product.interface";
import { ProductMedia } from "../ProductMedia/ProductMedia";
import { ImagePath } from "../../../ValueObjects/ImagePath/ImagePath";
import { ProductVariantSet } from "../ProductVariant/ProductVariantSet";

export interface BaseProductProps {
  id?: UID;
  variants: ProductVariantSet;
  description: string;
  media: ProductMedia;
  price: number;
  supplier: string;
}

export class BaseProduct extends Entity<BaseProductProps> implements Product {
  protected constructor(protected props: BaseProductProps) {
    super(props, { disableGetters: false, disableSetters: true });
  }

  protected kind = "BaseProduct";

  protected static validateCommonProps(props: BaseProductProps): IResult<any> {
    return Result.combine([
      Guard.againstNullOrUndefinedBulk([
        { argument: props?.variants, argumentName: "variants" },
        { argument: props?.description, argumentName: "description" },
        { argument: props?.media, argumentName: "media" },
        { argument: props?.price, argumentName: "price" },
        { argument: props?.supplier, argumentName: "supplier" },
      ]),
    ]);
  }

  getKind(): string {
    return this.kind;
  }
  getPrimaryImage(): ImagePath {
    return this.get("media").getPrimaryImage();
  }
  getImages(): ImagePath[] {
    return this.get("media").getImages();
  }
  getPrice(): number {
    return this.get("price");
  }
  getSupplier(): string {
    return this.get("supplier");
  }
  getVariants(): ProductVariantSet {
    return this.get("variants");
  }
  getDescription(): string {
    return this.get("description");
  }
  getSlug(): string {
    throw new Error("Method not implemented.");
  }
  getSku(): string {
    throw new Error("Method not implemented.");
  }
}
