import { DEFAULT_ERROR_MESSAGE, KnownError } from "@/errors";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { getOwnership } from "@ys/features/ownership/apis";
import { OwnershipState, OwnershipStateValues } from "@ys/features/ownership/types";
import { RootState } from "@ys/store";
import { YS_KEY_PREFIX } from "@ys/constants";

export const fetchOwnership = createAsyncThunk<
  OwnershipStateValues | null,
  void,
  {
    state: RootState;
    rejectValue: KnownError;
  }
>(
  `${YS_KEY_PREFIX}/ownership/fetchOwnership`,
  async (_, { getState, rejectWithValue }) => {
    try {
      const reuslt: OwnershipStateValues = {};
      const state = getState();
      const accounts = state.accounts.values;
      const characters = state.characters.values;
      if (!state.accounts.isLoaded || !state.characters.isLoaded) {
        return null;
      }
      for (const accountKey in accounts) {
        for (const characterName in characters) {
          reuslt[accountKey] = {
            [characterName]: await getOwnership(accountKey, characterName),
          };
        }
      }
      return reuslt;
    } catch (e: any) {
      return rejectWithValue({
        errorMessage: e.errorMessage || DEFAULT_ERROR_MESSAGE,
      });
    }
  }
);

export const addFetchOwnershipCases = (
  builder: ActionReducerMapBuilder<OwnershipState>
) => {
  /**
   * pending
   */
  builder.addCase(fetchOwnership.pending, (state) => {
    state.loading = "pending";
    state.errorMessage = null;
  });
  /**
   * fulfilled
   */
  builder.addCase(fetchOwnership.fulfilled, (_, action) => {
    if (action.payload) {
      return {
        loading: "succeeded",
        values: action.payload,
        errorMessage: null,
        isLoaded: true,
      };
    }
  });
  /**
   * rejected
   */
  builder.addCase(fetchOwnership.rejected, (state, action) => {
    state.loading = "failed";
    if (action.payload) {
      state.errorMessage = action.payload.errorMessage;
    } else {
      state.errorMessage = action.error.message || DEFAULT_ERROR_MESSAGE;
    }
  });
};
