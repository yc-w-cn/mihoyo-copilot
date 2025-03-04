import axios from "axios";
import { BiligameOptions } from "@/biligame";
import { handleCharacters } from "./characters";
import { handleCharacterDetail } from "./character-detail";
import { handleRelicsets } from "./relicsets";

export const BASE_URL = "https://wiki.biligame.com/sr/";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export async function handleSrCommand(options: BiligameOptions) {
  const { target } = options;
  switch (target) {
    case "characters":
      await handleCharacters(options);
      break;
    case "character-detail":
      await handleCharacterDetail(options);
      break;
    case "relicsets":
      await handleRelicsets(options);
      break;
  }
}
