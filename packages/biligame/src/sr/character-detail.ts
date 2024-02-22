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
      TAG: $properties.find("tr:nth-child(9) > td").text().trim(),
      lastmod: $(".pc-serve-msg > p:nth-child(2) > span").text().trim(),
      visited: $("#footer-info-0").text().trim(),
      version: $(".printfooter > a").text().trim(),
    },
    reference: `https://wiki.biligame.com/sr/${name}`,
    mtime: new Date().getTime(),
  };
}
