import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import { Sale } from "../../../model/sale/sale";

export interface SaleState {
  activeSale: Sale | undefined;
  isLoading: boolean;
}

const initialState: SaleState = {
  activeSale: undefined,
  isLoading: true,
};

export const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    fetchActiveSale: (state) => state,
    upsertActiveSale: (state, action: PayloadAction<Sale>) => {
      return {
        activeSale: action.payload,
        isLoading: false,
      };
    },

    clearActiveSale: (state) => {
      state.activeSale = undefined;
    },
  },
});

export const saleActions = saleSlice.actions;

export const selectSale = (state: RootState) => state.sale;

export const selectSaleActive = createSelector(
  selectSale,
  (state) => state.activeSale
);

export default saleSlice.reducer;
