import { getArrayByKeys, getKeysByPrefix } from "@/utils";
import { KeyPrefix } from "@ys/types";
import localforage from "localforage";
import { AccountMeta, DEFAULT_ACCOUNT } from "./types";

export async function getAndInitAccounts() {
  const prefix = `${KeyPrefix.Account}`;
  const keys = await getKeysByPrefix(prefix);
  if (keys.length == 0) {
    await localforage.setItem(DEFAULT_ACCOUNT.key, DEFAULT_ACCOUNT);
    keys.push(DEFAULT_ACCOUNT.key);
  }
  return getArrayByKeys<AccountMeta>(keys);
}
