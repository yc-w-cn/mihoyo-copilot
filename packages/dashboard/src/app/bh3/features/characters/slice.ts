import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { CharactersState, CharactersStateValues } from "./types";
import { CharacterMeta } from "@bh3/features/characters/types";
import { BH3_KEY_PREFIX } from "@bh3/constants";

export const charactersSlice = createSlice({
  name: `${BH3_KEY_PREFIX}/characters`,
  initialState: {} as CharactersState,
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
    selectGroupCharacters: createSelector(
      [
        (state: CharactersState) => state.values,
        (_, headline: string) => headline,
      ],
      (values: CharactersStateValues, headline: string) =>
        Object.values(values).filter((item) => item.headline === headline)
    ),
  },
});

export const { setCharacters } = charactersSlice.actions;

export const { selectCharacter, selectGroupCharacters } =
  charactersSlice.getSelectors();

export const charactersReducer = charactersSlice.reducer;
