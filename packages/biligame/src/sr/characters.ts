import * as cheerio from "cheerio";
import { axiosInstance } from ".";
import { handleCharacterDetail } from "./character-detail";
import { BiligameOptions } from "@/biligame";
import { ExecuteOptions, execute } from "@/execute";

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
  const response = await axiosInstance.get("/角色图鉴");
  return response.data;
}

export async function parseFn(html: string, options: ExecuteOptions) {
  const { biligameOptions } = options;
  const $ = cheerio.load(html);
  const characters = $(".chara-box")
    .map((_, element) => {
      return {
        name: $(element).find(".chara-name").text(),
        image: $(element).find(".chara-image").attr("src"),
        element: $(element)
          .find(".chara-element")
          .attr("alt")
          .replace(".png", ""),
        type: $(element).find(".chara-type").attr("alt").split("-")[0],
        rarity: $(element)
          .find(".chara-rarity")
          .attr("alt")
          .replace(".png", ""),
      }
    })
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
