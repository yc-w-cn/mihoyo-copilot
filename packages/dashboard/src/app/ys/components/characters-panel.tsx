import { CharacterMeta } from "@ys/features/characters/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleCharacterContainer } from "./toggle-character-container";
import { useMemo } from "react";
import { useAppSelector } from "@ys/hooks";
import { GroupEmptyPlaceholder } from "./group-empty-placeholder";

export type CharactersPanelProps = {
  showImage?: boolean;
};

export function CharactersPanel({ showImage = false }: CharactersPanelProps) {
  const charactersValue = useAppSelector((state) => state.characters.values);

  const characters = useMemo(
    () => Object.values(charactersValue),
    [charactersValue]
  );

  return (
    <div className="flex flex-wrap gap-4 mt-5">
      {characters?.map((character: any) => (
        <ToggleCharacterContainer
          key={`character-${character.name}`}
          character={character}
          showImage={showImage}
        />
      ))}
    </div>
  );
}
