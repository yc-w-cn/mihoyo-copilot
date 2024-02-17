import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import {
  DEFAULT_CHARACTER_OWNERSHIP,
  DEFAULT_OWNERSHIP_STATE,
} from "./constants";
import { SR_KEY_PREFIX } from "@sr/constants";
import { addFetchOwnershipCases } from "./thunks";
import cloneDeep from "lodash/cloneDeep";

export const ownershipSlice = createSlice({
  name: `${SR_KEY_PREFIX}/ownership`,
  initialState: cloneDeep(DEFAULT_OWNERSHIP_STATE),
  reducers: {
    setOwnershipValue(
      state,
      {
        payload: { accountKey, characterName, newValue },
      }: PayloadAction<{
        accountKey: string | null;
        characterName: string | null;
        newValue: boolean;
      }>
    ) {
      if (newValue === undefined) {
        return;
      }
      if (!accountKey) {
        return;
      }
      if (!characterName) {
        return;
      }
      if (state.values[accountKey] === undefined) {
        state.values[accountKey] = {};
      }
      if (state.values[accountKey][characterName] === undefined) {
        state.values[accountKey][characterName] = cloneDeep(DEFAULT_CHARACTER_OWNERSHIP);
      }
      state.values[accountKey][characterName].ownership = newValue;
    },
  },
  selectors: {
    selectOwnershipValue: createSelector(
      [
        (state) => state.values,
        (_, accountKey: string | null) => accountKey,
        (_, _accountKey: string | null, characterName: string) => characterName,
      ],
      (values, accountKey: string | null, characterName: string) => {
        if (!accountKey) {
          return DEFAULT_CHARACTER_OWNERSHIP.ownership;
        }
        const characterOwnership =
          values[accountKey]?.[characterName] ||
          cloneDeep(DEFAULT_CHARACTER_OWNERSHIP);
        return characterOwnership.ownership;
      }
    ),
    selectOwnCharacterNames: createSelector(
      [
        (state) => state.values,
        (_, accountKey: string | null) => accountKey,
        (_, _accountKey: string | null, characterNames: string[]) =>
          characterNames,
      ],
      (values, accountKey: string | null, characterNames: string[]) => {
        if (!accountKey) {
          return [];
        }
        const ownCharacterNames = [];
        for (const characterName in characterNames) {
          if (values[accountKey]?.[characterName]?.ownership === true) {
            ownCharacterNames.push(characterName);
          }
        }
        return ownCharacterNames;
      }
    ),
  },
  extraReducers: (builder) => {
    addFetchOwnershipCases(builder);
  },
});

export const { setOwnershipValue } = ownershipSlice.actions;

export const { selectOwnershipValue, selectOwnCharacterNames } =
  ownershipSlice.getSelectors();

export const ownershipReducer = ownershipSlice.reducer;
