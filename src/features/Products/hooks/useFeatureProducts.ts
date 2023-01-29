import { FeaturedProduct } from "../../../model/featuredProduct/featuredProduct";
import { FeatureProductsConstants } from "../../../utils/catalog-generator/constants/FeaturedProductsConstants";

export function useFeatureProducts(): FeaturedProduct[] {
  return FeatureProductsConstants.featuredProducts;
}
