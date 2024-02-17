import { AccountsState } from "./types";

export const DEFAULT_ACCOUNTS_STATE: AccountsState = {
  values: {},
  loading: "idle",
  errorMessage: null,
  isLoaded: false,
} as const;
