import { YS_KEY_PREFIX } from "../constants";

export enum KeyPrefix {
  Account = `${YS_KEY_PREFIX}-account`,
  Ownership = `${YS_KEY_PREFIX}-ownership`,
  Character = `${YS_KEY_PREFIX}-character`
}