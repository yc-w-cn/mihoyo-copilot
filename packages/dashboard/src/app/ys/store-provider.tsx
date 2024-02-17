"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore, startAppListening } from "./store";
import { fetchAccounts } from "./features/accounts/thunks";
import { Unsubscribe } from "@reduxjs/toolkit";
import { setupAccountsListeners } from "./features/accounts/listeners";
import { setupOwnershipListeners } from "./features/ownership/listeners";
import { setupCharacterListeners } from "./features/characters/listeners";
import { CharacterMeta } from "@ys/features/characters/types";
import { setCharacters } from "./features/characters";

export default function StoreProvider({
  children,
  characters,
}: {
  children: React.ReactNode;
  characters: CharacterMeta[];
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(fetchAccounts());
    storeRef.current.dispatch(setCharacters(characters));
  }

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupAccountsListeners(startAppListening),
      setupOwnershipListeners(startAppListening),
      setupCharacterListeners(startAppListening),
    ];

    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
