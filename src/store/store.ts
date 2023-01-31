import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/Cart/store/cartSlice";
import sidebarReducer from "../features/Layout/Sidebar/store/sidebarSlice";
import productsReducer from "../features/Product/store/productsSlice";
import checkoutReducer from "../features/Checkout/store/checkoutSlice";
import pickupReducer from "../features/Pickup/store/pickupSlice";
import successfulOrderReducer from "../features/SuccessfulOrder/store/successfulOrderSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    sidebar: sidebarReducer,
    products: productsReducer,
    checkout: checkoutReducer,
    pickup: pickupReducer,
    successfulOrder: successfulOrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
