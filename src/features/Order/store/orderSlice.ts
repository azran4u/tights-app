import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";

export interface OrderState {
  orderId: string | undefined;
}

const initialState: OrderState = {
  orderId: undefined,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderId: (state, action: PayloadAction<string>) => {
      return {
        orderId: action.payload,
      };
    },

    clearOrderId: (state) => {
      return { orderId: undefined };
    },
  },
});

export const orderActions = orderSlice.actions;

export const selectOrderSate = (state: RootState) => state.order;

export const selectOrderId = createSelector(
  selectOrderSate,
  (state) => state.orderId
);

export default orderSlice.reducer;
