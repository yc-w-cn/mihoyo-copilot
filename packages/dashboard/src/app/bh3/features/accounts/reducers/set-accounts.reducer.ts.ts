import { PayloadAction, CaseReducer } from "@reduxjs/toolkit";
import { AccountsState } from "@bh3/features/accounts/types";
import { AccountMeta } from "@bh3/features/accounts/types";
import { arrayToObject } from "@/utils";

export const setAccountsReducer: CaseReducer<
  AccountsState,
  PayloadAction<AccountMeta[]>
> = (state, { payload: accounts }) => {
  state = {
    values: arrayToObject(accounts),
    loading: "succeeded",
    errorMessage: null,
    isLoaded: true
  };
};
