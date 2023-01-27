import { Discount } from "../discount/Discount";
import { Price } from "../price/Price";
import { Supplier } from "../supplier/Supplier";
import { ColorOption } from "../color/ColorOption";

export interface ProductDataShared {
  description: string;
  slug: string; // product identifier
  sku: string; // specific item including size, color, etc.
  image: string;
  color: ColorOption;
  price: Price;
  discount: Discount;
  supplier: Supplier;
}
