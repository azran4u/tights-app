import { Color } from "../color/Color";
import { ImageUrlFn } from "../image/ImageUrlFn";
import { Price } from "../price/Price";
import { Supplier } from "../supplier/Supplier";
import { DiscountField } from "../discount/DiscountField";

export interface ProductBaseAttributes extends DiscountField {
  colors: Color[];
  price: Price;
  supplier: Supplier;
  images: ImageUrlFn;
}
