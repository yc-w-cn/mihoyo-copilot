import localforage from "localforage";
import { getKeysByPrefix } from "./key-names";
import { removeByKeys } from "./key-values";

export async function recovery(
  content: Record<string, any>,
  keyPrefixFilter: string = ""
) {
  const removeKeys = await getKeysByPrefix(keyPrefixFilter);
  await removeByKeys(removeKeys);
  await Promise.all(
    Object.keys(content).map(async (keyName) => {
      await localforage.setItem(keyName, content[keyName]);
    })
  );
}
