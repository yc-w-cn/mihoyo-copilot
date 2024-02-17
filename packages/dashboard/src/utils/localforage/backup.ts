import { getKeysByPrefix } from "./key-names";
import { getByKeys } from "./key-values";

export async function backup(keyPrefixFilter: string = "") {
  const keys = await getKeysByPrefix(keyPrefixFilter);
  const result = await getByKeys(keys);
  return result;
}
