import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";

import { localSliceReducer } from "./localStorageSlice";
import { moviesApiSlice } from "./moviesApiSlice";

const rootReducer = combineReducers({
  local: persistReducer(
    {
      key: "root",
      storage,
    },
    localSliceReducer
  ),
  [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
});

export const setupStore = (
  preloadedState?: PreloadedState<RootReducerType>
) => {
  return configureStore({
    reducer: rootReducer,
    //middleware refers to:
    //https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(moviesApiSlice.middleware),
    preloadedState,
  });
};

export const store = setupStore();
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootStoreStateType = ReturnType<typeof store.getState>;
export type RootReducerType = ReturnType<typeof rootReducer>;
export type AppStoreType = ReturnType<typeof setupStore>;
