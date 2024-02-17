import { ErrorMessageState } from "@/errors";
import { LoadingState } from "@/types/loading-state.type";
import { KeyPrefix } from "@bh3/types/key-prefix.enum";

export type AccountMeta = {
  key: string;
  name: string;
  displayName: string;
};

export const DEFAULT_ACCOUNT = {
  key: `${KeyPrefix.Account}-default`,
  name: "default",
  displayName: "默认账户",
};

export type AccountsStateValues = {
  [accountKey: string]: AccountMeta;
};

export type AccountsState = {
  values: AccountsStateValues;
  loading: LoadingState;
  errorMessage: ErrorMessageState;
  isLoaded: boolean;
};
