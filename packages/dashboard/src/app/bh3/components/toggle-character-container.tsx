"use client";

import { cn } from "@/utils";
import { useMemo } from "react";
import Image from "next/image";
import { CharacterMeta } from "@bh3/features/characters/types";
import { useAppDispatch, useAppSelector } from "@bh3/hooks";
import { selectAccountByName } from "@bh3/features/accounts/selectors";
import {
  selectOwnershipValue,
  setOwnershipValue,
} from "@bh3/features/ownership/slice";

export type ToggleCharacterContainerProps = {
  accountName?: string;
  character: CharacterMeta;
  showImage?: boolean;
};

export function ToggleCharacterContainer({
  accountName = "default",
  character,
  showImage = false,
}: ToggleCharacterContainerProps) {
  const { ownershipFilter } = useAppSelector((state) => state.view);
  const account = useAppSelector((state) =>
    selectAccountByName(state.accounts, accountName)
  );
  const accountKey = account?.key || null;
  const characterName = character.name;
  const ownershipValue = useAppSelector((state) =>
    selectOwnershipValue(state.ownership, accountKey, characterName)
  );
  const dispatch = useAppDispatch();

  const toggleOwnership = () => {
    dispatch(
      setOwnershipValue({
        accountKey,
        characterName,
        newValue: !ownershipValue,
      })
    );
  };

  const show = useMemo(() => {
    if (ownershipFilter === "true" && ownershipValue === false) return false;
    if (ownershipFilter === "false" && ownershipValue === true) return false;
    return true;
  }, [ownershipFilter, ownershipValue]);

  if (showImage) {
    return (
      <div
        className={cn(
          "flex flex-col gap-1 hover:cursor-pointer border-2 border-white hover:border-gray-200 p-1 rounded",
          ownershipValue && "text-green-600",
          !show && "hidden"
        )}
        onClick={toggleOwnership}
      >
        <Image
          width={100}
          height={86}
          src={character.image}
          alt={character.name}
          className="rounded-md object-cover"
          priority
        />
        <span className="text-sm">{character.name}</span>
      </div>
    );
  }

  return (
    <span
      className={cn(
        "hover:bg-gray-100 hover:cursor-pointer px-2 rounded",
        ownershipValue && "text-green-600",
        !show && "hidden"
      )}
      onClick={toggleOwnership}
    >
      {character.name}
    </span>
  );
}
