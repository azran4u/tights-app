import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import { PickupLocation } from "../../../model/pickup/pickupLocation";
import { pickups } from "../../../utils/pickup-generator/pickupGenerator";

export interface PickupState {
  locations: Map<string, PickupLocation>;
}

const initialState: PickupState = {
  locations: pickups.reduce((prev, curr) => {
    prev.set(curr.dispalyNmae, curr);
    return prev;
  }, new Map<string, PickupLocation>()),
};

export const pickupSlice = createSlice({
  name: "pickup",
  initialState,
  reducers: {
    upsert: (state, action: PayloadAction<PickupLocation[]>) => {
      action.payload.forEach((location) =>
        state.locations.set(location.dispalyNmae, location)
      );
    },

    clear: (state) => {
      state.locations.clear();
    },
  },
});

export const pickupActions = pickupSlice.actions;

export const selectPickup = (state: RootState) => state.pickup;

export const selectPickupLocationsMap = createSelector(
  selectPickup,
  (state) => state.locations
);

export const selectPickupLocations = createSelector(
  selectPickupLocationsMap,
  (locationsMap) => Array.from(locationsMap.values())
);

export default pickupSlice.reducer;
