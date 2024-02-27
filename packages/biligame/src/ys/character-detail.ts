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
  if (biligameOptions.name) {
    let name = biligameOptions.name;
    if (name.includes("旅行者")) {
      name = "旅行者/" + name.replace("旅行者(", "").replace(")", "");
    }
    const response = await axiosInstance.get<string>("/" + name);
    return response.data;
  }
  return null;
}

export async function parseFn(html: string | null, options: ExecuteOptions) {
  const {
    biligameOptions: { name },
  } = options;

  const $ = cheerio.load(html);

  return {
    meta: {
      name: $("#firstHeading").text(),
      ...getTableProperties($, [
        "称号",
        "全名/本名",
        "种族",
        "性别",
        "常驻/限定",
        "神之眼",
        "命之座",
        "特殊料理",
        "实装日期",
        "TAG",
        "介绍",
      ]),
      rarity: $("tr")
        .filter((_, element) => {
          return $(element).find("th").text().trim() === "稀有度";
        })
        .find("img")
        .attr("alt")
        ?.replace(".png", "")
        .trim(),
      constellations: $("h2")
        .filter(
          (_, element) =>
            $(element).find(".mw-headline").text().trim() === "命之座"
        )
        .next()
        .find("table tr > td:nth-child(1)")
        .map((_, element) => $(element).text().trim())
        .get(),
      recommend: {
        圣遗物套装: $("tr")
          .filter((_, element) => {
            return $(element).find("th").text().trim() === "圣遗物套装";
          })
          .find("td .ys-iconLarge > a")
          .map((_, element) => $(element).attr("title"))
          .get(),
        毕业武器: $("tr")
          .filter((_, element) => {
            return $(element).find("th").text().trim() === "毕业武器";
          })
          .find("td .ys-iconLarge > a")
          .map((_, element) => $(element).attr("title"))
          .get(),
        可选武器: $("tr")
          .filter((_, element) => {
            return $(element).find("th").text().trim() === "可选武器";
          })
          .find("td .ys-iconLarge > a")
          .map((_, element) => $(element).attr("title"))
          .get(),
      },
      lastmod: $(".pc-serve-msg > p:nth-child(2) > span").text().trim(),
      visited: $("#footer-info-0").text().trim(),
      version: $(".printfooter > a").text().trim(),
    },
    reference: `https://wiki.biligame.com/ys/${name}`,
    mtime: new Date().getTime(),
  };
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
