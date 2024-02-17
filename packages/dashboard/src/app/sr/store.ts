import {
  TypedAddListener,
  TypedStartListening,
  addListener,
  configureStore,
  createListenerMiddleware,
  createSelector,
} from "@reduxjs/toolkit";
import { charactersReducer } from "./features/characters/slice";
import { accountsReducer } from "./features/accounts/slice";
import { viewReducer } from "./features/view/slice";
import { ownershipReducer } from "./features/ownership/slice";

const listenerMiddleware = createListenerMiddleware();

export const makeStore = () => {
  return configureStore({
    reducer: {
      characters: charactersReducer,
      ownership: ownershipReducer,
      accounts: accountsReducer,
      view: viewReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AddListener = TypedAddListener<RootState, AppDispatch>;
export const createAppSelector = createSelector.withTypes<RootState>();

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;
export const addAppListener = addListener as AddListener;
