import * as cheerio from "cheerio";
import { fileExists, readFromFile, saveToFile } from "../utils";
import { axiosInstance } from ".";

const CACHE_FILE_NAME = "sr-characters.html";
const OUTPUT_FILE_NAME = "sr-characters.json";

export async function handleCharacters(outputDir: string, cache: boolean) {
  const html = await getCharactersHtml(outputDir, cache);
  const outputData = await getCharacters(html);
  saveToFile(outputData, OUTPUT_FILE_NAME, outputDir);
}

export async function getCharactersHtml(outputDir: string, cache: boolean) {
  // check: cache
  if (cache) {
    const exists = await fileExists(CACHE_FILE_NAME, outputDir);
    if (exists) {
      const html = await readFromFile(CACHE_FILE_NAME, outputDir);
      return html;
    }
  }
  // default/fallback: fetch
  const html = await fetchCharacters();
  await saveToFile(html, CACHE_FILE_NAME, outputDir);
  return html;
}

export async function fetchCharacters() {
  const response = await axiosInstance.get("/角色图鉴");
  return response.data;
}

export async function getCharacters(html: string) {
  const $ = cheerio.load(html);
  return {
    meta: {
      characters: $(".chara-box")
        .map((_, element) => ({
          name: $(element).find(".chara-name a").text(),
          image: $(element).find(".chara-image img").attr("src"),
          element: $(element)
            .find(".chara-element img")
            .attr("alt")
            .replace(".png", ""),
          type: $(element).find(".chara-type img").attr("alt").split("-")[0],
          rarity: $(element)
            .find(".chara-rarity img")
            .attr("alt")
            .split("-")[1]
            .replace(".png", ""),
        }))
        .get(),
      lastmod: $("#footer-info-lastmod").text().trim(),
      visited: $("#footer-info-0").text().trim(),
    },
    mtime: new Date().getTime(),
  };
}
