import axios from "axios";
import { BiligameOptions } from "@/biligame";
import { handleCharacters } from "./characters";
import { handleCharacterDetail } from "./character-detail";

export const BASE_URL = "https://wiki.biligame.com/sr/";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export async function handleSrCommand(options: BiligameOptions) {
  const { target, outputDir, cache } = options;
  switch (target) {
    case "characters":
      await handleCharacters(outputDir, cache);
      break;
    case "character-detail":
      await handleCharacterDetail(options);
      break;
  }
}
