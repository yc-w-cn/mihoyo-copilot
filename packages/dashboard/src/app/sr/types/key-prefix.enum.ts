import { SR_KEY_PREFIX } from "../constants";

export enum KeyPrefix {
  Account = `${SR_KEY_PREFIX}-account`,
  Ownership = `${SR_KEY_PREFIX}-ownership`,
  Character = `${SR_KEY_PREFIX}-character`
}