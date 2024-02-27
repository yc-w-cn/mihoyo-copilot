import { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import { PageContent } from "./page-content";
import { CharacterMeta } from "./features/characters";

export const metadata: Metadata = {
  title: "原神",
};

const HomePage = async () => {
  const file = await fs.readFile(
    path.join(process.cwd(), "../biligame/output/ys-characters.json"),
    "utf8"
  );
  const characters: CharacterMeta[] = JSON.parse(file).meta.characters;

  return <PageContent characters={characters} />;
};

export default HomePage;
