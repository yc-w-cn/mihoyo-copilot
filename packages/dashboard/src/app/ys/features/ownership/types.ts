import { ErrorMessageState } from "@/errors";
import { LoadingState } from "@/types/loading-state.type";

export type CharacterOwnership = {
  ownership: boolean;
  level?: number | null;
};

export type CharactersOwnership = {
  [characterName: string]: CharacterOwnership;
};

export type OwnershipStateValues = {
  [accountKey: string]: CharactersOwnership;
};

export type OwnershipState = {
  values: OwnershipStateValues;
  errorMessage: ErrorMessageState;
  loading: LoadingState;
  isLoaded: boolean;
};
