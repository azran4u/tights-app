import { ProductVariantSet } from "./ProductVariant/ProductVariantSet";

export interface Product {
  getKind(): string;
  getVariants(): ProductVariantSet;
  getDescription(): string;
  getSlug(): string;
  getSku(): string;
  getImages(): string[];
  getPrimaryImage(): string;
  getPrice(): number;
  getSupplier(): string;
}
