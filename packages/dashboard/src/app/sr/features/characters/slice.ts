import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { CharactersState, DEFAULT_CHARACTERS_STATE } from "./types";
import { CharacterMeta } from "@sr/features/characters/types";
import { SR_KEY_PREFIX } from "@sr/constants";
import cloneDeep from "lodash/cloneDeep";

export const charactersSlice = createSlice({
  name: `${SR_KEY_PREFIX}/characters`,
  initialState: cloneDeep(DEFAULT_CHARACTERS_STATE),
  reducers: {
    setCharacters: (_, { payload }: PayloadAction<CharacterMeta[]>) => {
      return {
        values: Object.fromEntries(payload.map((item) => [item.name, item])),
        isLoaded: true,
      };
    },
  },
  selectors: {
    selectCharacter: createSelector(
      [
        (state: CharactersState) => state.isLoaded,
        (state: CharactersState) => state.values,
        (_, characterName: string) => characterName,
      ],
      (isLoaded, values, characterName) => {
        if (isLoaded) {
          return values[characterName];
        }
        return null;
      }
    ),
  },
});

export const { setCharacters } = charactersSlice.actions;

export const { selectCharacter } =
  charactersSlice.getSelectors();

export const charactersReducer = charactersSlice.reducer;
