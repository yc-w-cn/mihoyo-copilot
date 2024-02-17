import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DEFAULT_VIEW_STATE, OwnershipFilter } from "./types";
import { SR_KEY_PREFIX } from "@sr/constants";
import cloneDeep from "lodash/cloneDeep";

export const viewSlice = createSlice({
  name: `${SR_KEY_PREFIX}/ownership`,
  initialState: cloneDeep(DEFAULT_VIEW_STATE),
  reducers: {
    setOwnershipFilter: (
      state,
      { payload: ownershipFilter }: PayloadAction<OwnershipFilter>
    ) => {
      state.ownershipFilter = ownershipFilter;
    },
  },
});

export const { setOwnershipFilter } = viewSlice.actions;

export const viewReducer = viewSlice.reducer;
