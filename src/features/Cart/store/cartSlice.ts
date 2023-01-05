import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import { CartItem, CartItemSku } from "../../../model";
import { isNil } from "lodash";

export type CartItemsMap = Map<string, CartItem>;
export type UpdateCartItemAmountOperations = "increase-one" | "decrease-one";

export interface CartState {
  items: CartItemsMap;
}

const initialState: CartState = {
  items: getLocalStorage(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clear: (state) => {
      state.items.clear();
    },
    updateItem: (
      state,
      action: PayloadAction<{
        item: CartItem;
        operation: UpdateCartItemAmountOperations;
      }>
    ) => {
      const { item, operation } = action.payload;
      const itemSku = CartItemSku(item);

      if (isNil(itemSku)) {
        console.error(
          `UPDATE_CART_ITEM_AMOUNT: invalid payload ${JSON.stringify(item)}`
        );
        return state;
      }
      const foundItem = state.items.get(itemSku);

      if (isNil(foundItem)) {
        return state;
      }

      let value: number = 0;
      if (operation === "increase-one") {
        value = 1;
      }
      if (operation === "decrease-one") {
        value = -1;
      }
      state.items.set(itemSku, {
        ...foundItem,
        amount: foundItem.amount + value,
      });
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const itemSku = CartItemSku(item);

      if (isNil(itemSku)) {
        console.error(`ADD_TO_CART: invalid payload ${JSON.stringify(item)}`);
        return state;
      }

      const foundItem = state.items.get(itemSku);

      if (isNil(foundItem)) {
        state.items.set(itemSku, item);
      } else {
        state.items.set(itemSku, {
          ...item,
          amount: foundItem.amount + item.amount,
        });
      }
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const itemSku = CartItemSku(item);

      if (isNil(itemSku)) {
        console.error(
          `REMOVE_CART_ITEM: invalid payload ${JSON.stringify(item)}`
        );
        return state;
      }
      const foundItem = state.items.get(itemSku);

      if (isNil(foundItem)) {
        return state;
      }

      state.items.delete(itemSku);
    },
  },
});

export const cartActions = cartSlice.actions;
export const { addItem, removeItem, updateItem, clear } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemsMap = createSelector(
  selectCart,
  (cart) => cart.items
);
export const selectCartItemsArray = createSelector(selectCartItemsMap, (map) =>
  Array.from(map.values())
);
export const selectCartItemsTotalAmount = createSelector(
  selectCartItemsArray,
  (items) => items.reduce((prev, curr) => prev + curr.amount, 0)
);

export const cartSelectors = {
  selectCart,
  selectCartItemsArray,
  selectCartItemsMap,
  selectCartItemsTotalAmount,
};

export default cartSlice.reducer;

function mapSerializer(map: CartItemsMap): string {
  return JSON.stringify(Array.from(map.entries()));
}

function mapDeSerializer(serializedMap: string): CartItemsMap {
  return new Map(JSON.parse(serializedMap));
}

function getLocalStorage() {
  let cart = localStorage.getItem("cart");
  if (!isNil(cart)) {
    return mapDeSerializer(cart);
  } else {
    return new Map<string, CartItem>();
  }
}
