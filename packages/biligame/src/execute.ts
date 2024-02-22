import { fileExists, readFromFile, saveToFile } from "@/utils";
import { BiligameOptions } from "./biligame";

export type ExecuteOptions = {
  name: string;
  biligameOptions: BiligameOptions;
  fetchFn: (options: ExecuteOptions) => Promise<string | null>;
  parseFn: (html: string | null, options: ExecuteOptions) => object;
  cacheFileName: string;
  outputFileName: string;
};

export async function execute(options: ExecuteOptions) {
  const { parseFn, outputFileName, biligameOptions } = options;
  const { outputDir } = biligameOptions;
  const html = await fetchHtml(options);
  const outputData = await parseFn(html, options);
  await saveToFile(outputData, outputFileName, outputDir);
}

export async function fetchHtml(options: ExecuteOptions) {
  const { fetchFn, cacheFileName, biligameOptions } = options;
  const { cache, outputDir } = biligameOptions;

  // check: cache
  if (cache) {
    const exists = await fileExists(cacheFileName, outputDir);
    if (exists) {
      const html = await readFromFile(cacheFileName, outputDir);
      return html;
    }
  }
  // default/fallback: fetch
  const html = await fetchFn(options);
  await saveToFile(html, cacheFileName, outputDir);
  return html;
}
