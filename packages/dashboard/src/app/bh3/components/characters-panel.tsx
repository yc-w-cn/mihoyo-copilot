import { CharacterMeta } from "@bh3/features/characters/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleCharacterContainer } from "./toggle-character-container";
import { useMemo } from "react";
import { useAppSelector } from "@bh3/hooks";
import { GroupEmptyPlaceholder } from "./group-empty-placeholder";

export type CharactersPanelProps = {
  showImage?: boolean;
};

export function CharactersPanel({ showImage = false }: CharactersPanelProps) {
  const { showGroup } = useAppSelector((state) => state.view);
  const charactersValue = useAppSelector((state) => state.characters.values);

  const characters = useMemo(
    () => Object.values(charactersValue),
    [charactersValue]
  );

  const groups = useMemo(() => {
    const result: string[] = [];
    characters.forEach((item) => {
      if (!result.includes(item.headline)) {
        result.push(item.headline);
      }
    });
    return result;
  }, [characters]);

  if (showGroup) {
    return (
      <div className="flex flex-wrap gap-4 mt-5">
        {groups.map((item) => (
          <Card key={`group-${item}`} className="w-[45%]">
            <CardHeader>
              <CardTitle className="px-2">{item}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {characters?.map((character: CharacterMeta) =>
                  character.headline === item ? (
                    <ToggleCharacterContainer
                      key={`group-character-${character.name}`}
                      accountName="default"
                      character={character}
                      showImage={showImage}
                    />
                  ) : null
                )}
                <GroupEmptyPlaceholder headline={item} accountName="default" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

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
