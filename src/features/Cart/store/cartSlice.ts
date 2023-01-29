import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import { isNil } from "lodash";
import { CartItem } from "../../../model/cart/CartItem";

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
    upsertItem: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const { sku, amount } = item;

      if (isNil(sku)) {
        console.error(
          `ADD_TO_CART: invalid payload ${JSON.stringify(action.payload)}`
        );
        return state;
      }

      state.items.set(sku, item);
    },
    clear: (state) => {
      state.items.clear();
    },
    increaseAmount: (
      state,
      action: PayloadAction<{
        sku: string;
      }>
    ) => {
      const { sku } = action.payload;

      if (isNil(sku)) {
        console.error(`INCREASE_CART_ITEM_AMOUNT: invalid sku ${sku}`);
        return state;
      }
      const foundItem = state.items.get(sku);

      if (isNil(foundItem)) {
        return state;
      }

      state.items.set(sku, {
        sku,
        amount: foundItem.amount + 1,
      });
    },

    decreaseAmount: (
      state,
      action: PayloadAction<{
        sku: string;
      }>
    ) => {
      const { sku } = action.payload;

      if (isNil(sku)) {
        console.error(`DECREASE_CART_ITEM_AMOUNT: invalid sku ${sku}`);
        return state;
      }
      const foundItem = state.items.get(sku);

      if (isNil(foundItem)) {
        return state;
      }

      state.items.set(sku, {
        sku,
        amount: foundItem.amount - 1,
      });
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const { sku, amount } = item;

      if (isNil(sku)) {
        console.error(
          `REMOVE_CART_ITEM: invalid payload ${JSON.stringify(item)}`
        );
        return state;
      }

      const foundItem = state.items.get(sku);

      if (isNil(foundItem)) {
        return state;
      }

      state.items.delete(sku);
    },
  },
});

export const cartActions = cartSlice.actions;
export const { upsertItem, removeItem, clear, increaseAmount, decreaseAmount } =
  cartSlice.actions;

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
