#!/usr/bin/env node
import { Command, Option } from "commander";

import { biligame } from "./index";

const program = new Command();

program
  .name("biligame")
  .version("1.0.0", "-v, --vers", "output the current version")
  .description("download meta data from biligame")
  .addOption(
    new Option("-g, --game <game>", "specify game name (sr, ys, bh3)")
      .choices(["sr", "ys", "bh3"])
      .default("sr")
  )
  .option("-o, --outputDir <directory>", "specify output dir", process.cwd())
  .addOption(
    new Option("-t, --target", "specify output target (characters)")
      .choices(["characters"])
      .default("characters")
  )
  .addOption(
    new Option("-c, --cache", "whether to check cache file data").default(true)
  )
  .parse(process.argv);

biligame({
  game: program.opts().game,
  outputDir: program.opts().outputDir,
  target: program.opts().target,
  cache: program.opts().cache,
});
