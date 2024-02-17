import { Unsubscribe } from "@reduxjs/toolkit";
import { AppStartListening } from "@sr/store";
import { setAccounts } from "./slice";
import { fetchOwnership } from "../ownership/thunks";

/**
 * Subscribes counter listeners and returns a `teardown` function.
 * @example
 * ```ts
 * useEffect(() => {
 *   const unsubscribe = setupAccountsListeners();
 *   return unsubscribe;
 * }, []);
 * ```
 */
export function setupAccountsListeners(
  startListening: AppStartListening
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: setAccounts,
      effect: async (_, listenerApi) => {
        listenerApi.dispatch(fetchOwnership());
      },
    }),
  ];

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };
}
