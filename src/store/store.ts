import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/Cart/store/cartSlice";
import sidebarReducer from "../features/Layout/Sidebar/store/sidebarSlice";
import productsReducer from "../features/Product/store/productsSlice";
import checkoutReducer from "../features/Checkout/store/checkoutSlice";
import pickupReducer from "../features/Pickup/store/pickupSlice";
import successfulOrderReducer from "../features/SuccessfulOrder/store/successfulOrderSlice";
import saleReducer from "../features/Sale/store/saleSlice";
import saleListenerMiddleware from "../features/Sale/saleListenerMiddleware";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    sidebar: sidebarReducer,
    products: productsReducer,
    checkout: checkoutReducer,
    pickup: pickupReducer,
    successfulOrder: successfulOrderReducer,
    sale: saleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(saleListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
