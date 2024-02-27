import * as cheerio from "cheerio";
import { axiosInstance } from ".";
import { BiligameOptions } from "@/biligame";
import { ExecuteOptions, execute } from "@/execute";
import { handleCharacterDetail } from "./character-detail";

export async function handleCharacters(biligameOptions: BiligameOptions) {
  const { name, game } = biligameOptions;
  return execute({
    name: `execute-sr-character-detail-${name}`,
    biligameOptions,
    fetchFn,
    parseFn,
    cacheFileName: `${game}-characters.html`,
    outputFileName: `${game}-characters.json`,
  });
}

export async function fetchFn() {
  const response = await axiosInstance.get("/角色");
  return response.data;
}

export async function parseFn(html: string, options: ExecuteOptions) {
  const $ = cheerio.load(html);
  const { biligameOptions } = options;
  const characters = $(".divsort")
    .map((_, element) => ({
      name: $(element).find(".L").text(),
      image: $(element).find("img").attr("src"),
      rarity: $(element).data("param1"),
      element: $(element).data("param2"),
      weapon: $(element).data("param3"),
    }))
    .get();

  // download details
  for (const character of characters) {
    await handleCharacterDetail({
      ...biligameOptions,
      target: "character-detail",
      name: character.name,
    });
  }

  return {
    meta: {
      characters,
      lastmod: $("#footer-info-lastmod").text().trim(),
      visited: $("#footer-info-0").text().trim(),
    },
    mtime: new Date().getTime(),
  };
}
