import * as cheerio from "cheerio";
import { axiosInstance } from ".";
import { ExecuteOptions, execute } from "@/execute";
import { BiligameOptions } from "@/biligame";
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
  const response = await axiosInstance.get("/女武神图鉴");
  return response.data;
}

export async function parseFn(html: string, options: ExecuteOptions) {
  const $ = cheerio.load(html);
  const { biligameOptions } = options;
  const characters = $(".home-tag-logo")
    .map((_, element) => ({
      headline: $(element).prevAll("h2").first().find("a").text(),
      name: $(element).find("a").attr("title"),
      image: $(element).find("img").attr("src"),
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
      updated: $(".pc-serve-msg > p:nth-child(2) > span").text(),
    },
    mtime: new Date().getTime(),
  };
}
