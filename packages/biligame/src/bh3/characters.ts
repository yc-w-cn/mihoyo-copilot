import * as cheerio from "cheerio";
import { fileExists, readFromFile, saveToFile } from "../utils";
import { axiosInstance } from ".";

const CACHE_FILE_NAME = "bh3-characters.html";
const OUTPUT_FILE_NAME = "bh3-characters.json";

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
  const response = await axiosInstance.get("/女武神图鉴");
  return response.data;
}

export async function getCharacters(html: string) {
  const $ = cheerio.load(html);
  return {
    meta: {
      characters: $(".home-tag-logo")
        .map((_, element) => ({
          headline: $(element).prevAll('h2').first().find('a').text(),
          name: $(element).find("a").attr('title'),
          image: $(element).find("img").attr("src"),
        }))
        .get(),
      updated: $(".pc-serve-msg > p:nth-child(2) > span").text()
    },
    mtime: new Date().getTime(),
  };
}
