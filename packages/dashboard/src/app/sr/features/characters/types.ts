export type CharacterMeta = {
  name: string;
  image: string;
  rarity: string;
  element: string;
  type: string;
};

export const DEFAULT_CHARACTERS_STATE: CharactersState = {
  values: {},
  isLoaded: false,
} as const;

export type CharactersStateValues = { [characterName: string]: CharacterMeta };

export type CharactersState = {
  values: CharactersStateValues;
  isLoaded: boolean;
};
