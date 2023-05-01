import { ProductVariantSet } from "./ProductVariant/ProductVariantSet";

export interface Product {
  getKind(): string; // dls, lace, etc.
  getSlug(): string; // url endpoint of the product. group all variants
  getSku(): string; // unique product identifier, eg. DLS-D120-WITHLEG-LARGE-BLACK
  getDescription(): string; // "טייץ 120 דניר במבחר מידות וצבעים"
  getVariants(): ProductVariantSet;
  getImages(): string[];
  getPrimaryImage(): string;
  getPrice(): number; // NIS units
  getSupplier(): string; // filo, sharon, etc.
}
