import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";

export interface SuccessfulOrderState {
  orderId: string | undefined;
}

const initialState: SuccessfulOrderState = {
  orderId: undefined,
};

export const successfulOrderSlice = createSlice({
  name: "successfulOrder",
  initialState,
  reducers: {
    upsert: (state, action: PayloadAction<SuccessfulOrderState>) => {
      return {
        ...action.payload,
      };
    },

    clear: (state) => {
      return initialState;
    },
  },
});

export const successfulOrderActions = successfulOrderSlice.actions;

export const selectSuccessfulOrder = (state: RootState) =>
  state.successfulOrder;

export const selectSuccessfulOrderId = createSelector(
  selectSuccessfulOrder,
  (state) => state.orderId
);

export default successfulOrderSlice.reducer;
