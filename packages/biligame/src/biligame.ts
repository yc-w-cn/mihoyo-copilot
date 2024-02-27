import { handleBh3Command } from "./bh3";
import { handleSrCommand } from "./sr";
import { handleYsCommand } from "./ys";

export type GameType = "sr" | "ys" | "bh3";

export type TargetType = "characters" | "character-detail";

export type BiligameOptions = {
  game: GameType;
  outputDir: string;
  target: TargetType;
  cache: boolean;
  name?: string;
};

export async function biligame(options: BiligameOptions) {
  const { game, outputDir, target, cache, name } = options;
  const showCache = cache ? "" : "not ";
  const showCharacterDetail = name ? name + " " : "";
  console.log(
    `Start to download ${game}'s ${target} ${showCharacterDetail} to ${outputDir} from biligame ${showCache}using cache:`
  );
  switch (game) {
    case "sr":
      handleSrCommand(options);
      break;
    case "ys":
      handleYsCommand(options);
      break;
    case "bh3":
      handleBh3Command(options);
      break;
  }
}
