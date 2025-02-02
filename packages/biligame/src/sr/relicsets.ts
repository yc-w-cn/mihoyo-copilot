import * as cheerio from "cheerio";
import { axiosInstance } from ".";
import { handleCharacterDetail } from "./character-detail";
import { BiligameOptions } from "@/biligame";
import { ExecuteOptions, execute } from "@/execute";

export async function handleRelicsets(biligameOptions: BiligameOptions) {
  const { name, game } = biligameOptions;
  return execute({
    name: `execute-${game}-relicsets-${name}`,
    biligameOptions,
    fetchFn,
    parseFn,
    cacheFileName: `${game}-relicsets.html`,
    outputFileName: `${game}-relicsets.json`,
  });
}

export async function fetchFn() {
  const response = await axiosInstance.get("/遗器图鉴");
  return response.data;
}

export async function parseFn(html: string, options: ExecuteOptions) {
  const { biligameOptions } = options;
  const $ = cheerio.load(html);
  const relicsets = $(".relicset-box")
    .map((_, element) => {
      return {
        name: $(element).find(".relicset-name").text(),
        image: $(element).find(".relicset-image img").attr("src"),
        rarity: $(element)
          .find(".relicset-link img")
          .attr("alt")
          .replace("遗器一览-", "")
          .replace("星.png", ""),
      }
    })
    .get();

  return {
    meta: {
      relicsets,
      lastmod: $("#footer-info-lastmod").text().trim(),
      visited: $("#footer-info-0").text().trim(),
    },
    mtime: new Date().getTime(),
  };
}
