import { createSlice } from "@reduxjs/toolkit";
import { addFetchAccountsCases } from "./thunks";
import { setAccountsReducer, setDisplayNameReducer } from "./reducers";
import { BH3_KEY_PREFIX } from "@bh3/constants";
import { selectAccountByKey, selectAccountByName } from "./selectors";
import { DEFAULT_ACCOUNTS_STATE } from "./constants";
import cloneDeep from "lodash/cloneDeep";

export const accountsSlice = createSlice({
  name: `${BH3_KEY_PREFIX}/accounts`,
  initialState: cloneDeep(DEFAULT_ACCOUNTS_STATE),
  reducers: {
    setAccounts: setAccountsReducer,
    setDisplayName: setDisplayNameReducer,
  },
  selectors: {
    selectAccountByKey,
    selectAccountByName,
  },
  extraReducers: (builder) => {
    addFetchAccountsCases(builder);
  },
});

export const { setAccounts, setDisplayName } = accountsSlice.actions;

export const accountsReducer = accountsSlice.reducer;
