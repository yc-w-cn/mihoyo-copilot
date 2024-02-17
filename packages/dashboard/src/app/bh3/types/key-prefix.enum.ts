import { BH3_KEY_PREFIX } from "../constants";

export enum KeyPrefix {
  Account = `${BH3_KEY_PREFIX}-account`,
  Ownership = `${BH3_KEY_PREFIX}-ownership`,
  Character = `${BH3_KEY_PREFIX}-character`
}