import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import { ProductInstance } from "../../../model/productInstance/ProductInstance";
import { catalog } from "../../../utils/catalog-generator/catalog";

export type ProductItemsMap = Map<string, ProductInstance>;

export interface ProductsState {
  products: ProductItemsMap;
}

const initialState: ProductsState = {
  products: catalog.reduce((prev, curr) => {
    prev.set(curr.sku, curr);
    return prev;
  }, new Map<string, ProductInstance>()),
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

export const selectProductBySku = (sku: string) =>
  createSelector(selectProductsMap, (products) => products.get(sku));

export const selectProductsArray = createSelector(selectProductsMap, (map) =>
  Array.from(map.values())
);

export const cartSelectors = {
  selectProductsMap,
  selectProductsArray,
  selectProductBySku,
};

export default cartSlice.reducer;
