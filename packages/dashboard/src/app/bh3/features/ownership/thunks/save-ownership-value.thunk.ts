import { DEFAULT_ERROR_MESSAGE, KnownError } from "@/errors";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { updateOwnershipValue } from "@bh3/features/ownership/apis";
import { OwnershipState } from "../types";
import { RootState } from "@bh3/store";
import { BH3_KEY_PREFIX } from "@bh3/constants";

export type Payload = {
  characterName: string | null;
  accountKey: string | null;
  newValue: boolean;
};

export const saveOwnershipValue = createAsyncThunk<
  void,
  Payload,
  {
    state: RootState;
    rejectValue: KnownError;
  }
>(
  `${BH3_KEY_PREFIX}/ownership/saveOwnershipValue`,
  async ({ characterName, accountKey, newValue }, { rejectWithValue }) => {
    try {
      if (!characterName || !accountKey) return;
      await updateOwnershipValue(characterName, accountKey, newValue);
    } catch (e: any) {
      return rejectWithValue({
        errorMessage: e.errorMessage || DEFAULT_ERROR_MESSAGE,
      });
    }
  }
);

export const addSaveOwnershipValueCases = (
  builder: ActionReducerMapBuilder<OwnershipState>
) => {
  /**
   * pending
   */
  builder.addCase(saveOwnershipValue.pending, (state) => {
    state.loading = "pending";
    state.errorMessage = null;
  });
  /**
   * fulfilled
   */
  builder.addCase(saveOwnershipValue.fulfilled, (state) => {
    state.loading = "succeeded";
    state.errorMessage = null;
  });
  /**
   * rejected
   */
  builder.addCase(saveOwnershipValue.rejected, (state, action) => {
    state.loading = "failed";
    if (action.payload) {
      state.errorMessage = action.payload.errorMessage;
    } else {
      state.errorMessage = action.error.message || DEFAULT_ERROR_MESSAGE;
    }
  });
};
