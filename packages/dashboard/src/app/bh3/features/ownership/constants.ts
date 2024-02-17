import { CharacterOwnership, OwnershipState } from "./types";

export const DEFAULT_CHARACTER_OWNERSHIP: CharacterOwnership = {
  ownership: false,
  level: null,
} as const;

export const DEFAULT_OWNERSHIP_STATE: OwnershipState = {
  values: {},
  isLoaded: false,
  loading: "idle",
  errorMessage: null,
} as const;
