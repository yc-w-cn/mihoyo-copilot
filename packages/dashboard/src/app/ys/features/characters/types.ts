export type CharacterMeta = {
  name: string;
  image: string;
  rarity: string;
  element: string;
  weapon: string;
  detail: any;
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
