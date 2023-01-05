import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/Cart/store/cartSlice";
import sidebarReducer from "../features/Layout/Sidebar/store/sidebarSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    sidebar: sidebarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
