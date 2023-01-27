import { imageSrcByDenierLegSize, imageSrcByLace } from "../images";
import { ProductData } from "../../model/product/ProductData";
import { ProductDataDenierLegSize } from "../../model/product/ProductDataDenierLegSize";
import { ProductDataLace } from "../../model/product/ProductDataLace";
import { products } from "../../model/product/products";
import { ProductSchema } from "../../model/product/ProductSchema";
import { skuByDenierLegSize } from "../../model/sku/skuByDenierLegSize";
import { skuByLace } from "../../model/sku/skuByLace";

export function productDataGenerator() {
  const productDataMap = new Map<string, ProductData>();

  products.forEach((product) => {
    if (product.schema === ProductSchema.BY_DENIER_LEG_SIZE) {
      product.denier.forEach((denier) => {
        denier.legOptions.forEach((leg) => {
          leg.sizes.forEach((size) => {
            size.attributes.colors.forEach((color) => {
              const item: ProductDataDenierLegSize = {
                schema: ProductSchema.BY_DENIER_LEG_SIZE,
                slug: product.kind,
                sku: skuByDenierLegSize({
                  color: color.value,
                  denier: denier.value,
                  leg: leg.value,
                  size: size.value,
                  supplier: size.attributes.supplier,
                }),
                description: product.description,
                denier: denier.value,
                leg: leg.value,
                size: size.value,
                image: imageSrcByDenierLegSize({
                  color: color.value,
                  denier: denier.value,
                  leg: leg.value,
                  size: size.value,
                })[0],
                price: size.attributes.price,
                supplier: size.attributes.supplier,
                discount: size.attributes.discount,
                color: color.value,
              };

              productDataMap.set(item.sku, item);
            });
          });
        });
      });
    }

    if (product.schema === ProductSchema.BY_LACE) {
      product.lace.forEach((lace) => {
        lace.attributes.colors.forEach((color) => {
          const item: ProductDataLace = {
            schema: ProductSchema.BY_LACE,
            slug: product.kind,
            sku: skuByLace({
              color: color.value,
              lace: lace.value,
              supplier: lace.attributes.supplier,
            }),
            description: product.description,
            lace: lace.value,
            image: imageSrcByLace({
              color: color.value,
              lace: lace.value,
            })[0],
            price: lace.attributes.price,
            supplier: lace.attributes.supplier,
            discount: lace.attributes.discount,
            color: color.value,
          };
          productDataMap.set(item.sku, item);
        });
      });
    }
  });

  return productDataMap;
}
