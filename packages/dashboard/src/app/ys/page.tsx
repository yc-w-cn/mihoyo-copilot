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
  const characters: CharacterMeta[] = file
    ? JSON.parse(file).meta.characters
    : [];
  for (const character of characters) {
    const detailFile = await fs.readFile(
      path.join(
        process.cwd(),
        `../biligame/output/ys-character-detail-${character.name}.json`
      ),
      "utf8"
    );
    character.detail = detailFile ? JSON.parse(detailFile).meta : null;
  }

  return <PageContent characters={characters} />;
};

export default HomePage;
