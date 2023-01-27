import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import { productDataGenerator } from "../../../utils/catalog-generator/productDataGenerator";
import { ProductData } from "../../../model/product/ProductData";

export type ProductItemsMap = Map<string, ProductData>;

export interface ProductsState {
  products: ProductItemsMap;
}

const initialState: ProductsState = {
  products: productDataGenerator(),
};

export const cartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const cartActions = cartSlice.actions;
export const {} = cartSlice.actions;

export const selectProductsState = (state: RootState) => state.products;
export const selectProductsMap = createSelector(
  selectProductsState,
  (state) => state.products
);

export const selectProductsArray = createSelector(selectProductsMap, (map) =>
  Array.from(map.values())
);

export const cartSelectors = {
  selectProductsMap,
  selectProductsArray,
};

export default cartSlice.reducer;
