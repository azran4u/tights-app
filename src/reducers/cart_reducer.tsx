import {
  CartActions,
  CartActionType,
  CartState,
} from '../context/cart_context';
import { CartItemSku } from '../model';
import produce, { enableMapSet } from 'immer';
import { isNil } from 'lodash';

enableMapSet();

const cart_reducer = (state: CartState, action: CartActions): CartState => {
  switch (action.type) {
    case CartActionType.ADD_TO_CART:
      return produce(state, (draft) => {
        const { item } = action.payload;
        const itemSku = CartItemSku(item);

        if (isNil(itemSku)) {
          console.error(`ADD_TO_CART: invalid payload ${JSON.stringify(item)}`);
          return draft;
        }
        const foundItem = state.items.get(itemSku);

        if (isNil(foundItem)) {
          draft.items.set(itemSku, item);
        } else {
          draft.items.set(itemSku, {
            ...item,
            amount: foundItem.amount + item.amount,
          });
        }
      });

    case CartActionType.CLEAR_CART:
      return produce(state, (draft) => {
        draft.items.clear();
      });

    case CartActionType.REMOVE_CART_ITEM:
      return produce(state, (draft) => {
        const { item } = action.payload;
        const itemSku = CartItemSku(item);

        if (isNil(itemSku)) {
          console.error(
            `REMOVE_CART_ITEM: invalid payload ${JSON.stringify(item)}`
          );
          return draft;
        }
        const foundItem = state.items.get(itemSku);

        if (isNil(foundItem)) {
          return draft;
        }

        draft.items.delete(itemSku);
      });

    case CartActionType.UPDATE_CART_ITEM_AMOUNT:
      return produce(state, (draft) => {
        const { item, operation } = action.payload;
        const itemSku = CartItemSku(item);

        if (isNil(itemSku)) {
          console.error(
            `UPDATE_CART_ITEM_AMOUNT: invalid payload ${JSON.stringify(item)}`
          );
          return draft;
        }
        const foundItem = state.items.get(itemSku);

        if (isNil(foundItem)) {
          return draft;
        }

        let value: number = 0;
        if (operation === 'increase-one') {
          value = 1;
        }
        if (operation === 'decrease-one') {
          value = -1;
        }
        draft.items.set(itemSku, {
          ...foundItem,
          amount: foundItem.amount + value,
        });
      });
    default:
      return state;
  }

  //   const { item } = action.payload;

  //   let tempItem: CartItem;
  //   if(item.schema === ProductSchema.BY_DENIER_LEG_SIZE){
  //     tempItem = state.items.find(
  //     (itemInCart) => item.schema === itemInCart.schema && item.
  //   );
  //   }

  //   if (tempItem) {
  //     const tempCart = state.cart.map((cartItem) => {
  //         const newAmount = tempItem.amount + amount;
  //         return { ...cartItem, amount: newAmount };
  //       if (cartItem.id === id) {
  //       } else {
  //         return cartItem;
  //       }
  //     });

  //     return { ...state, cart: tempCart };
  //   } else {
  //     const newItem: cartType = {
  //       id,
  //       slug,
  //       name: singleProduct.name,
  //       amount,
  //       image: singleProduct.images[0],
  //       price: singleProduct.price,
  //     };
  //     return { ...state, cart: [...state.cart, newItem] };
  //   }
  // }
  // if (action.type === CLEAR_CART) {
  //   return { ...state, cart: [] };
  // }
  // if (action.type === REMOVE_CART_ITEM) {
  //   const tempCart = state.cart.filter(
  //     (cartItem) => cartItem.id !== action.payload
  //   );
  //   return { ...state, cart: tempCart };
  // }
  // if (action.type === UPDATE_CART_ITEM_AMOUNT) {
  //   const { id, value } = action.payload;
  //   const tempCart = state.cart.map((cartItem) => {
  //     if (cartItem.id === id) {
  //       if (value === 'inc') {
  //         return { ...cartItem, amount: cartItem.amount + 1 };
  //       } else {
  //         let tempAmount = cartItem.amount - 1;
  //         if (tempAmount < 1) {
  //           tempAmount = 1;
  //         }
  //         return { ...cartItem, amount: tempAmount };
  //       }
  //     } else {
  //       return cartItem;
  //     }
  //   });

  //   return { ...state, cart: tempCart };
  // }
  // if (action.type === COUNT_CART_TOTALS) {
  //   const { totalItems, totalAmount } = state.cart.reduce(
  //     (total, cartItem) => {
  //       const { price, amount } = cartItem;

  //       total.totalItems += amount;
  //       total.totalAmount += amount * price;

  //       return total;
  //     },
  //     { totalItems: 0, totalAmount: 0 }
  //   );
  //   return { ...state, totalItems, totalAmount };
  // }
  // throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
