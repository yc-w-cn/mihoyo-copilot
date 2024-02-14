import * as cheerio from "cheerio";
import { fileExists, readFromFile, saveToFile } from "../utils";
import { axiosInstance } from ".";

const CACHE_FILE_NAME = "ys-characters.html";
const OUTPUT_FILE_NAME = "ys-characters.json";

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
  const response = await axiosInstance.get("/角色");
  return response.data;
}

export async function getCharacters(html: string) {
  const $ = cheerio.load(html);
  return {
    meta: {
      characters: $(".divsort")
        .map((_, element) => ({
          name: $(element).find(".L").text(),
          image: $(element).find("img").attr("src"),
          rarity: $(element).data("param1"),
          element: $(element).data("param2"),
          weapon: $(element).data("param3"),
        }))
        .get(),
      lastmod: $("#footer-info-lastmod").text().trim(),
      visited: $("#footer-info-0").text().trim(),
    },
    mtime: new Date().getTime(),
  };
}
