import { PayloadAction, CaseReducer } from "@reduxjs/toolkit";
import { AccountsState } from "@ys/features/accounts/types";

export type Payload = PayloadAction<{
  key: string;
  displayName: string;
}>;

export const setDisplayNameReducer: CaseReducer<AccountsState, Payload> = (
  state,
  { payload }
) => {
  const { key, displayName } = payload;
  if (!key) {
    return state;
  } else if (key in state.values) {
    state.values[key].displayName = displayName;
  } else {
    state.loading = "failed";
    state.errorMessage = `redux 没有未找到 key 为 ${key} 的 Account 对象`;
  }
};
