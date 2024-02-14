import { handleBh3Command } from "./bh3";
import { handleSrCommand } from "./sr";
import { handleYsCommand } from "./ys";

export type GameType = "sr" | "ys" | "bh3";

export type TargetType = "characters";

export interface Options {
  game: GameType;
  outputDir: string;
  target: TargetType;
  cache: boolean;
}

export async function biligame({ game, outputDir, target, cache }: Options) {
  console.log(
    `Start to download ${game}'s ${target} to ${outputDir} from biligame ${
      cache ? "" : "not "
    }using cache:`
  );
  switch (game) {
    case "sr":
      handleSrCommand(target, outputDir, cache);
      break;
    case "ys":
      handleYsCommand(target, outputDir, cache);
      break;
    case "bh3":
      handleBh3Command(target, outputDir, cache);
      break;
  }
}
