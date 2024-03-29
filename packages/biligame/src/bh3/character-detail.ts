import * as cheerio from "cheerio";
import { axiosInstance } from ".";
import { ExecuteOptions, execute } from "@/execute";
import { BiligameOptions } from "@/biligame";

export async function handleCharacterDetail(biligameOptions: BiligameOptions) {
  const { name, game } = biligameOptions;
  return execute({
    name: `execute-${game}-character-detail-${name}`,
    biligameOptions,
    fetchFn,
    parseFn,
    cacheFileName: `${game}-character-detail-${name}.html`,
    outputFileName: `${game}-character-detail-${name}.json`,
  });
}

export async function fetchFn(options: ExecuteOptions) {
  const { biligameOptions } = options;
  const response = await axiosInstance.get<string>("/" + biligameOptions.name);
  return response.data;
}

export async function parseFn(html: string | null, options: ExecuteOptions) {
  const {
    biligameOptions: { name },
  } = options;

  const $ = cheerio.load(html);

  return {
    meta: {
      name: $("#firstHeading").text(),
      ...getTableProperties($, ["装甲名", "角色名", "简称", "属性", "特色"]),
      rarity: getTableData($, "稀有度"),
      recommend: getRecommendItems($),
      lastmod: $(".pc-serve-msg > p:nth-child(2) > span").text().trim(),
      visited: $("#footer-info-0").text().trim(),
      version: $(".printfooter > a").text().trim(),
    },
    reference: `https://wiki.biligame.com/bh3/${name}`,
    mtime: new Date().getTime(),
  };
}

export function getRecommendItems($: cheerio.CheerioAPI) {
  const tables = $("h2")
    .filter(
      (_, element) =>
        $(element).find(".mw-headline").text().trim() === "推荐装备"
    )
    .nextAll(".wikitable");

  const result = [];

  tables.each((_, element) => {
    const category = $(element).find("th").text().trim();
    const items = $(element)
      .find("td > a")
      .map((_, link) => $(link).text().trim())
      .get();
    if (items.length > 0) {
      result.push({ category, items });
    }
  });

  return result;
}

export function getTableProperties($: cheerio.CheerioAPI, names: string[]) {
  return Object.fromEntries(names.map((name) => [name, getTableData($, name)]));
}

export function getTableData($: cheerio.CheerioAPI, name: string) {
  return $("tr")
    .filter((_, element) => {
      return $(element).find("th").text().trim() === name;
    })
    .find("td")
    .text()
    .trim();
}

export function zipArrays<T = any>(
  keyArray: string[],
  valueArray: T[]
): Record<string, T> {
  const result: Record<string, T> = {};

  const minLength = Math.min(keyArray.length, valueArray.length);
  for (let i = 0; i < minLength; i++) {
    result[keyArray[i]] = valueArray[i];
  }

  return result;
}
