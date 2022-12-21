import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import { CartItem } from '../model';
import { isNil } from 'lodash';

export type CartItemsMap = Map<string, CartItem>;

function mapSerializer(map: CartItemsMap): string {
  return JSON.stringify(Array.from(map.entries()));
}

function mapDeSerializer(serializedMap: string): CartItemsMap {
  return new Map(JSON.parse(serializedMap));
}

export interface CartState {
  items: CartItemsMap;
  addToCart: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  updateAmount: (item: CartItem, value: UpdateCartItemAmountOperations) => void;
  clearCart: () => void;
}

function getLocalStorage() {
  let cart = localStorage.getItem('cart');
  if (!isNil(cart)) {
    return mapDeSerializer(cart);
  } else {
    return new Map<string, CartItem>();
  }
}

const initialState: CartState = {
  items: getLocalStorage(),
  addToCart: () => {},
  removeItem: () => {},
  updateAmount: () => {},
  clearCart: () => {},
};

const CartContext = React.createContext<CartState>(initialState);

export enum CartActionType {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_CART_ITEM = 'REMOVE_CART_ITEM',
  UPDATE_CART_ITEM_AMOUNT = 'UPDATE_CART_ITEM_AMOUNT',
  CLEAR_CART = 'CLEAR_CART',
}

export type UpdateCartItemAmountOperations = "increase-one" | "decrease-one";
export type CartActions =
  | { type: CartActionType.ADD_TO_CART; payload: { item: CartItem } }
  | { type: CartActionType.CLEAR_CART }
  | { type: CartActionType.REMOVE_CART_ITEM; payload: { item: CartItem } }
  | {
      type: CartActionType.UPDATE_CART_ITEM_AMOUNT;
      payload: { item: CartItem; operation: UpdateCartItemAmountOperations };
    };

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (item: CartItem) => {
    dispatch({ type: CartActionType.ADD_TO_CART, payload: { item } });
  };

  const removeItem = (item: CartItem) => {
    dispatch({ type: CartActionType.REMOVE_CART_ITEM, payload: { item } });
  };

  const updateAmount = (
    item: CartItem,
    operation: UpdateCartItemAmountOperations
  ) => {
    dispatch({
      type: CartActionType.UPDATE_CART_ITEM_AMOUNT,
      payload: { item, operation },
    });
  };

  const clearCart = () => {
    dispatch({ type: CartActionType.CLEAR_CART });
  };

  // when the cart changes, store the changes to localStorage + re-calculate total amount in cart
  useEffect(() => {
    localStorage.setItem('cart', mapSerializer(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, updateAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
