import localforage from "localforage";

export async function getByKeys<T = any>(keys: string[]) {
  const resultPair = await Promise.all(
    keys.map(async (key) => {
      return [key, await localforage.getItem<T>(key)];
    })
  );
  const result: Record<string, T> = Object.fromEntries(resultPair);
  return result;
}

export async function getArrayByKeys<T = any>(keys: string[]) {
  const result: T[] = [];
  for (const key of keys) {
    const item = await localforage.getItem<T>(key);
    if (item) {
      result.push(item);
    }
  }
  return result;
}

export async function removeByKeys(keys: string[]) {
  await Promise.all(
    keys.map(async (key) => {
      await localforage.removeItem(key);
    })
  );
}

export type PropsWithKey = { key: string; [others: string]: any };

export function arrayToObject(array: PropsWithKey[] | null) {
  if (!Array.isArray(array)) {
    return {};
  }
  const entries = array.map((item) => [item.key, item]);
  return Object.fromEntries(entries);
}

export function objectToArray<T = any>(object: Record<string, T>) {
  return Object.values(object);
}
