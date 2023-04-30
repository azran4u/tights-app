import { Entity, UID } from "types-ddd";
import { ProductAttribute } from "./ProductAttribute";

interface Props {
  id?: UID;
  description: string;
  category: string;
  sku: string;
  image: string;
  slug: string;
  attributes: Record<string, ProductAttribute>;
}

export class Product extends Entity<Props> {}
