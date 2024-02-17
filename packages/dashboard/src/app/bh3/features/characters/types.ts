export type CharacterMeta = {
  headline: string;
  name: string;
  image: string;
};

export const DEFAULT_CHARACTERS_STATE: CharactersState = {
  values: {},
  isLoaded: false,
};

export type CharactersStateValues = { [characterName: string]: CharacterMeta };

export type CharactersState = {
  values: CharactersStateValues;
  isLoaded: boolean;
};
