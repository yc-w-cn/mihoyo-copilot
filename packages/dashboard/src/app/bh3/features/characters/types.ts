export type CharacterMeta = {
  headline: string;
  name: string;
  image: string;
  detail?: CharacterDetail;
};

export type CharacterDetail = {
  rarity: string;
  [key: string]: any;
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
