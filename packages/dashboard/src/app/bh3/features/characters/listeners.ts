import { Unsubscribe } from "@reduxjs/toolkit";
import { AppStartListening } from "@bh3/store";
import { setCharacters } from "./slice";
import { fetchOwnership } from "../ownership/thunks";

/**
 * Subscribes counter listeners and returns a `teardown` function.
 * @example
 * ```ts
 * useEffect(() => {
 *   const unsubscribe = setupCharacterListeners();
 *   return unsubscribe;
 * }, []);
 * ```
 */
export function setupCharacterListeners(
  startListening: AppStartListening
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: setCharacters,
      effect: async (_, listenerApi) => {
        listenerApi.dispatch(fetchOwnership());
      },
    }),
  ];

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };
}
