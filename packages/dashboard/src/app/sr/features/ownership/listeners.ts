import { Unsubscribe } from "@reduxjs/toolkit";
import { AppStartListening } from "@sr/store";
import { setOwnershipValue } from "./slice";
import { saveOwnershipValue } from "./thunks/save-ownership-value.thunk";

/**
 * Subscribes counter listeners and returns a `teardown` function.
 * @example
 * ```ts
 * useEffect(() => {
 *   const unsubscribe = setupOwnershipListeners();
 *   return unsubscribe;
 * }, []);
 * ```
 */
export function setupOwnershipListeners(
  startListening: AppStartListening
): Unsubscribe {
  const subscriptions = [
    startListening({
      actionCreator: setOwnershipValue,
      effect: async ({ payload }, listenerApi) => {
        listenerApi.dispatch(saveOwnershipValue(payload));
      },
    }),
  ];

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };
}
