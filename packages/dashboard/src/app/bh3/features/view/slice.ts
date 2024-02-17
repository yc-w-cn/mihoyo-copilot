import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DEFAULT_VIEW_STATE, OwnershipFilter } from "./types";
import { BH3_KEY_PREFIX } from "@bh3/constants";
import cloneDeep from "lodash/cloneDeep";

export const viewSlice = createSlice({
  name: `${BH3_KEY_PREFIX}/ownership`,
  initialState: cloneDeep(DEFAULT_VIEW_STATE),
  reducers: {
    setOwnershipFilter: (
      state,
      { payload: ownershipFilter }: PayloadAction<OwnershipFilter>
    ) => {
      state.ownershipFilter = ownershipFilter;
    },
    setShowGroup: (state, { payload: showGroup }: PayloadAction<boolean>) => {
      state.showGroup = showGroup;
    },
  },
});

export const { setOwnershipFilter, setShowGroup } = viewSlice.actions;

export const viewReducer = viewSlice.reducer;
