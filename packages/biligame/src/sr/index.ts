import axios from "axios";
import { TargetType } from "..";
import { handleCharacters } from "./characters";

export const BASE_URL = "https://wiki.biligame.com/sr/";

export const axiosInstance = axios.create({
  baseURL: BASE_URL
})

export async function handleSrCommand(target: TargetType, outputDir: string, cache: boolean) {
  switch (target) {
    case "characters":
      await handleCharacters(outputDir, cache);
      break;
  }
}
