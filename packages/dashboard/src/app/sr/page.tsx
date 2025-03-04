import { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import { PageContent } from "./page-content";
import { CharacterMeta } from "./features/characters";
import { RelicsetMeta } from "./features/relicsets/types";

export const metadata: Metadata = {
  title: "崩坏：星穹铁道",
};

const HomePage = async () => {
  const file = await fs.readFile(
    path.join(process.cwd(), "../biligame/output/sr-characters.json"),
    "utf8"
  );

  const characters: CharacterMeta[] = file
    ? JSON.parse(file).meta.characters
    : [];
  for (const character of characters) {
    const detailFile = await fs.readFile(
      path.join(
        process.cwd(),
        `../biligame/output/sr-character-detail-${character.name}.json`
      ),
      "utf8"
    );
    character.detail = detailFile ? JSON.parse(detailFile).meta : null;
  }

  const relicsetsFile = await fs.readFile(
    path.join(process.cwd(), `../biligame/output/sr-relicsets.json`),
    "utf8"
  );

  const relicsets: RelicsetMeta[] = relicsetsFile ? JSON.parse(relicsetsFile).meta.relicsets : []

  return <PageContent characters={characters} relicsets={relicsets} />;
};

export default HomePage;
