import { DEFAULT_ERROR_MESSAGE, KnownError } from "@/errors";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { AccountsState } from "@ys/features/accounts/types";
import { getAndInitAccounts } from "@ys/features/accounts/apis";
import { AccountMeta } from "@ys/features/accounts/types";
import { arrayToObject } from "@/utils";
import { YS_KEY_PREFIX } from "@/app/ys/constants";
import { RootState } from "@ys/store";

export const fetchAccounts = createAsyncThunk<
  AccountMeta[],
  void,
  {
    state: RootState;
    rejectValue: KnownError;
  }
>(
  `${YS_KEY_PREFIX}/accounts/fetchAccounts`,
  async (_, { rejectWithValue }) => {
    try {
      return getAndInitAccounts();
    } catch (e: any) {
      return rejectWithValue({
        errorMessage: e.errorMessage || DEFAULT_ERROR_MESSAGE,
      });
    }
  }
);

export const addFetchAccountsCases = (
  builder: ActionReducerMapBuilder<AccountsState>
) => {
  /**
   * pending
   */
  builder.addCase(fetchAccounts.pending, (state) => {
    state.loading = "pending";
    state.errorMessage = null;
  });
  /**
   * fulfilled
   */
  builder.addCase(fetchAccounts.fulfilled, (_, action) => {
    return {
      loading: "succeeded",
      values: arrayToObject(action.payload),
      errorMessage: null,
      isLoaded: true,
    } as AccountsState;
  });
  /**
   * rejected
   */
  builder.addCase(fetchAccounts.rejected, (state, action) => {
    state.loading = "failed";
    if (action.payload) {
      state.errorMessage = action.payload.errorMessage;
    } else {
      state.errorMessage = action.error.message || DEFAULT_ERROR_MESSAGE;
    }
  });
};
