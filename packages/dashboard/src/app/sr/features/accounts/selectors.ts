import { objectToArray } from "@/utils";
import { AccountsState } from "./types";
import { createSelector } from "@reduxjs/toolkit";

export const selectAccountByKey = createSelector(
  [
    (state: AccountsState) => state.values,
    (_, accountKey?: string) => accountKey,
  ],
  (values, accountKey?: string) => {
    if (!accountKey) {
      return null;
    }
    return values[accountKey] || null;
  }
);

export const selectAccountByName = createSelector(
  [
    (state: AccountsState) => state.values,
    (_, accountName?: string) => accountName,
  ],
  (values, accountName?: string) => {
    if (!accountName) {
      return null;
    }
    const result = objectToArray(values).find(
      (item) => item.name === accountName
    );
    return result || null;
  }
);
