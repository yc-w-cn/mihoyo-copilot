import localforage from "localforage";

export async function getKeysByPrefix(prefix: string = "") {
  const allKeys = await localforage.keys();
  const filterKeys = allKeys.filter((item) => item.startsWith(prefix));
  return filterKeys;
}

export const createKeyName = (...values: string[]) => {
  // 字符串替换：替换空格为下划线
  return values.map((item) => item.replace(/\s/g, "_")).join("-") || "";
};
