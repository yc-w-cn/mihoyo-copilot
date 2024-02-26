import * as cheerio from "cheerio";
import { axiosInstance } from ".";
import { ExecuteOptions, execute } from "@/execute";
import { BiligameOptions } from "@/biligame";

export async function handleCharacterDetail(biligameOptions: BiligameOptions) {
  const { name } = biligameOptions;
  return execute({
    name: `execute-sr-character-detail-${name}`,
    biligameOptions,
    fetchFn,
    parseFn,
    cacheFileName: `sr-character-detail-${name}.html`,
    outputFileName: `sr-character-detail-${name}.json`,
  });
}

export async function fetchFn(options: ExecuteOptions) {
  const { biligameOptions } = options;
  if (biligameOptions.name) {
    const response = await axiosInstance.get<string>(
      "/" + biligameOptions.name
    );
    return response.data;
  }
  return null;
}

export async function parseFn(html: string | null, options: ExecuteOptions) {
  const {
    biligameOptions: { name },
  } = options;

  const $ = cheerio.load(html);
  const $properties = $($(".wikitable").get(0));
  return {
    meta: {
      name: $("#firstHeading").text(),
      gender: $properties.find("tr:nth-child(1) > td").text().trim(),
      稀有度: $properties
        .find("tr:nth-child(3) > td > img")
        .attr("alt")
        .replace(".png", "")
        .trim(),
      命途: $properties.find("tr:nth-child(4) > td").text().trim(),
      战斗属性: $properties
        .find("tr:nth-child(5) > td")
        .text()
        .replace("战斗属性", "")
        .trim(),
      阵营: $properties.find("tr:nth-child(6) > td").text().trim(),
      "常驻/限定": $properties.find("tr:nth-child(7) > td").text().trim(),
      实装日期: $properties.find("tr:nth-child(8) > td").text().trim(),
      xinghun: {
        1: $('[data-xinghuntype="xinghun-name-A"] .flex-col span:nth-child(2)')
          .text()
          .trim(),
        2: $('[data-xinghuntype="xinghun-name-B"] .flex-col span:nth-child(2)')
          .text()
          .trim(),
        3: $('[data-xinghuntype="xinghun-name-C"] .flex-col span:nth-child(2)')
          .text()
          .trim(),
        4: $('[data-xinghuntype="xinghun-name-D"] .flex-col span:nth-child(2)')
          .text()
          .trim(),
        5: $('[data-xinghuntype="xinghun-name-E"] .flex-col span:nth-child(2)')
          .text()
          .trim(),
        6: $('[data-xinghuntype="xinghun-name-F"] .flex-col span:nth-child(2)')
          .text()
          .trim(),
      },
      TAG: $properties.find("tr:nth-child(9) > td").text().trim(),
      recommend: {
        隧洞遗器: $("tr")
          .filter((_, element) => {
            return $(element).find("th").text().trim() === "隧洞遗器";
          })
          .find("td .item > a")
          .map((_, element) => $(element).attr("title"))
          .get(),
        位面饰品: $("tr")
          .filter((_, element) => {
            return $(element).find("th").text().trim() === "位面饰品";
          })
          .find("td .item > a")
          .map((_, element) => $(element).attr("title"))
          .get(),
        毕业光锥: $("tr")
          .filter((_, element) => {
            return $(element).find("th").text().trim() === "毕业光锥";
          })
          .find("td .item > a")
          .map((_, element) => $(element).attr("title"))
          .get(),
        可选光锥: $("tr")
          .filter((_, element) => {
            return $(element).find("th").text().trim() === "可选光锥";
          })
          .find("td .item > a")
          .map((_, element) => $(element).attr("title"))
          .get(),
        阵容搭配: getTeams($),
      },
      lastmod: $(".pc-serve-msg > p:nth-child(2) > span").text().trim(),
      visited: $("#footer-info-0").text().trim(),
      version: $(".printfooter > a").text().trim(),
    },
    reference: `https://wiki.biligame.com/sr/${name}`,
    mtime: new Date().getTime(),
  };
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

export function getTeams($: cheerio.CheerioAPI): Record<string, any> {
  const title = $("h3").filter(
    (_, element) => $(element).find(".mw-headline").text().trim() === "阵容搭配"
  );

  const names = title
    .next(".main-line-wrap ")
    .find(".resp-tabs-list li .tab-panel")
    .map((_, element) => $(element).text().trim())
    .get();

  const members = [];

  title
    .next(".main-line-wrap")
    .find(".resp-tab-content > table")
    .each((_, element) => {
      const labels = $(element)
        .find("tr th")
        .map((_, element) => $(element).text().trim())
        .get();
      const characters = $(element)
        .find("tr td div.tubiaoda")
        .map((_, element) => $(element).find("a").attr("title"))
        .get();
        console.log('characters', characters)
      members.push(zipArrays(labels, characters));
    })
    .get();

  return zipArrays(names, members);
}
