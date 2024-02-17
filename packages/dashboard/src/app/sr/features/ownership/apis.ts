import { KeyPrefix } from "@ys/types";
import localforage from "localforage";
import { CharacterOwnership } from "./types";
import { DEFAULT_CHARACTER_OWNERSHIP } from "./constants";
import { produce } from "immer";

export function getOwnerShipKey(accountKey: string, characterName: string) {
  return `${KeyPrefix.Ownership}-${accountKey}-${characterName}`;
}

export async function getOwnership(accountKey: string, characterName: string) {
  const keyName = getOwnerShipKey(accountKey, characterName);
  return (
    (await localforage.getItem<CharacterOwnership>(keyName)) ||
    DEFAULT_CHARACTER_OWNERSHIP
  );
}

export async function updateOwnership(
  accountKey: string,
  characterName: string,
  newValue: CharacterOwnership = DEFAULT_CHARACTER_OWNERSHIP
) {
  const keyName = getOwnerShipKey(accountKey, characterName);
  await localforage.setItem(keyName, newValue);
}

export async function updateOwnershipValue(
  accountKey: string,
  characterName: string,
  newValue: boolean
) {
  const baseState = await getOwnership(accountKey, characterName);
  const nextState = produce(baseState, (draft) => {
    draft.ownership = newValue;
  });
  await updateOwnership(accountKey, characterName, nextState);
}
