#!/usr/bin/env node
import { Command, Option } from "commander";

import { biligame } from "./biligame";
import { exit } from "process";

const program = new Command();

console.log('process.argv', process.argv)

program
  .name("biligame")
  .version("1.0.1", "-v, --version", "output the current version")
  .description("download meta data from biligame")
  .addOption(
    new Option("-g, --game <game>", "specify game name (sr, ys, bh3)")
      .choices(["sr", "ys", "bh3"])
      .default("sr")
  )
  .addOption(
    new Option("-n, --name <name>", "specify character name")
  )
  .option("-o, --outputDir <outputDir>", "specify output dir", process.cwd())
  .addOption(
    new Option("-t, --target <target>", "specify output target (characters, character-detail)")
      .choices(["characters", "character-detail"])
      .default("characters")
  )
  .addOption(
    new Option("-c, --cache", "whether to check cache file data, default is false, add this option to set it to true").default(false)
  )
  .parse(process.argv);

biligame({
  game: program.opts().game,
  outputDir: program.opts().outputDir,
  target: program.opts().target,
  name:  program.opts().name,
  cache: program.opts().cache,
});
