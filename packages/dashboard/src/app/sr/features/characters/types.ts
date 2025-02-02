export type CharacterMeta = {
  name: string;
  image: string;
  rarity: string;
  element: string;
  type: string;
  detail: any & {
    recommend: {
      "隧洞遗器": string[]
      "位面饰品": string[]
      "主词条推荐": {
        躯干: string[]
        "脚部": string[],
        "位面球": string[],
        "连结绳": string[]
      }
      "副词条推荐": string[],
      "词条推荐理由": string
    }
  };
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
