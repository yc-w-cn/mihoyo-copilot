import { useAppSelector } from "@bh3/hooks";
import { selectGroupCharacters } from "@bh3/features/characters";
import { selectOwnCharacterNames } from "@bh3/features/ownership";
import { selectAccountByName } from "@bh3/features/accounts";
import { useMemo } from "react";

export type GroupEmptyPlaceholderProps = {
  headline: string;
  accountName: string;
};

export const emptyPlaceholder = <span className="px-2">无</span>

export function GroupEmptyPlaceholder({
  headline,
  accountName,
}: GroupEmptyPlaceholderProps) {
  const account = useAppSelector((state) =>
    selectAccountByName(state.accounts, accountName)
  );
  const accountKey = account?.key || null
  const { ownershipFilter } = useAppSelector((state) => state.view);
  const characters = useAppSelector((state) =>
    selectGroupCharacters(state.characters, headline)
  );
  const characterNames = useMemo(
    () => characters.map((character) => character.name),
    [characters]
  );
  const ownCharacterNames = useAppSelector((state) =>
    selectOwnCharacterNames(state.ownership, accountKey, characterNames)
  );

  if (ownershipFilter === "both" && characters.length === 0) {
    return emptyPlaceholder;
  }

  if (ownershipFilter === "true" && ownCharacterNames.length === 0) {
    return emptyPlaceholder;
  }

  if (
    ownershipFilter === "false" &&
    characters.length === ownCharacterNames.length
  ) {
    return emptyPlaceholder;
  }

  return <></>;
}
