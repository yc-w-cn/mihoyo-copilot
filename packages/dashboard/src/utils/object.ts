export const shallow = <T>(origin: T): T => Object.assign({}, origin) as T;
export const deep = <T = any>(origin: T) =>
  JSON.parse(JSON.stringify(origin)) as T;
