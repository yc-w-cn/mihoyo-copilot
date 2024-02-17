import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { CharactersState } from "./types";
import { CharacterMeta } from "@ys/features/characters/types";
import { YS_KEY_PREFIX } from "@ys/constants";

export const charactersSlice = createSlice({
  name: `${YS_KEY_PREFIX}/characters`,
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
  },
});

export const { setCharacters } = charactersSlice.actions;

export const { selectCharacter } =
  charactersSlice.getSelectors();

export const charactersReducer = charactersSlice.reducer;
