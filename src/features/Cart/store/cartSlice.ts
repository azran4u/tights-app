import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import { isNil } from "lodash";
import { CartItem } from "../../../model/cart/CartItem";
import { selectProductsMap } from "../../Product/store/productsSlice";
import { DiscountKind } from "../../../model/discount/DiscountKind";
import { ProductWithAmount } from "../../../model/product/ProductWithAmount";

export type CartItemsMap = Map<string, CartItem>;
export type UpdateCartItemAmountOperations = "increase-one" | "decrease-one";

export interface CartState {
  items: CartItemsMap;
}

const initialState: CartState = {
  items: new Map<string, CartItem>(),
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

      const current = state.items.get(sku);

      if (isNil(current)) {
        state.items.set(sku, item);
      } else {
        state.items.set(sku, { ...current, amount: current.amount + amount });
      }
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
    removeItem: (state, action: PayloadAction<string>) => {
      const sku = action.payload;

      if (isNil(sku)) {
        console.error(`REMOVE_CART_ITEM: invalid payload ${sku}}`);
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

export const selectCartItemsCount = createSelector(
  selectCart,
  (cart) => cart.items.size
);

export const selectCartItemsArray = createSelector(selectCartItemsMap, (map) =>
  Array.from(map.values())
);

export const selectCartProducts = createSelector(
  selectCartItemsArray,
  selectProductsMap,
  (cartItems, products) =>
    cartItems.map((cartItem) => products.get(cartItem.sku)!)
);

export const selectCartProductsWithAmount = createSelector(
  selectCartItemsArray,
  selectProductsMap,
  (cartItems, products) => {
    return cartItems.map(
      (cartItem) =>
        ({
          ...products.get(cartItem.sku)!,
          amount: cartItem.amount,
        } as ProductWithAmount)
    );
  }
);

export const selectCartItemsTotalAmount = createSelector(
  selectCartItemsArray,
  (items) => items.reduce((prev, curr) => prev + curr.amount, 0)
);

export const selectCartTotalCost = createSelector(
  selectCartItemsArray,
  selectCartProducts,
  (cartItems, cartItemsProducts) => {
    const totalCost = cartItems.reduce((prev, curr) => {
      const productInstace = cartItemsProducts.find((x) => x.sku === curr.sku);
      if (isNil(productInstace)) return prev;
      return prev + productInstace.price * curr.amount;
    }, 0);
    return totalCost;
  }
);

export const selectCartTotalCostAfterDiscount = createSelector(
  selectCartItemsArray,
  selectCartProducts,
  (cartItems, cartItemsProducts) => {
    return cartItems.reduce((prev, curr) => {
      const productInstace = cartItemsProducts.find((x) => x.sku === curr.sku);

      if (isNil(productInstace)) return prev;

      if (productInstace.discount.kind === DiscountKind.COUNT_DISCOUNT) {
        const { group, count, pricePerCount } = productInstace.discount;
        const totalCount = cartItems.reduce((prev, curr) => {
          const productInstaceInCart = cartItemsProducts.find(
            (x) => x.sku === curr.sku
          );

          if (isNil(productInstaceInCart)) return prev;

          if (
            productInstaceInCart.discount.kind ===
              DiscountKind.COUNT_DISCOUNT &&
            productInstaceInCart.discount.group === group
          ) {
            return prev + curr.amount;
          }
          return prev;
        }, 0);

        if (totalCount >= count) {
          return prev + (pricePerCount / count) * curr.amount;
        }
      }

      return prev + productInstace.price * curr.amount;
    }, 0);
  }
);

export const cartSelectors = {
  selectCart,
  selectCartItemsArray,
  selectCartItemsMap,
  selectCartItemsTotalAmount,
};

export default cartSlice.reducer;

// function mapSerializer(map: CartItemsMap): string {
//   return JSON.stringify(Array.from(map.entries()));
// }

// function mapDeSerializer(serializedMap: string): CartItemsMap {
//   return new Map(JSON.parse(serializedMap));
// }

// function getLocalStorage() {
//   let cart = localStorage.getItem("cart");
//   if (!isNil(cart)) {
//     return mapDeSerializer(cart);
//   } else {
//     return initialState;
//   }
// }

// function setLocalStorage(items: CartItemsMap) {
//   const serializedString = mapSerializer(items);
//   const objectToSave: LocalStorageWithTTL = {
//     ttl: nowPlusDays(2),
//     value: serializedString,
//   };
//   localStorage.setItem("cart", serializedString);
// }

// function dateSerializer(date: Date): number {
//   return date.getTime();
// }

// function dateDesrializer(time: number): Date {
//   return new Date(time);
// }

// interface LocalStorageWithTTL {
//   ttl: Date;
//   value: string;
// }

// const nowPlusDays = (days: number): Date => {
//   let result = new Date();
//   result.setDate(result.getDate() + days);
//   return result;
// };
