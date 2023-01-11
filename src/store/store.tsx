import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { localSliceReducer, appSliceReducer } from './slice';

const rootReducer = combineReducers({
  local: persistReducer({
    key: 'root',
    storage,
  }, localSliceReducer),
  app: appSliceReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootReducerType>) => {
  return configureStore({
    reducer: rootReducer,
    //middleware refers to:
    //https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    preloadedState
  })
}

export const store = setupStore();
export const persistor = persistStore(store);

export type RootStoreStateType = ReturnType<typeof store.getState>;
export type RootReducerType = ReturnType<typeof rootReducer>
export type AppStoreType = ReturnType<typeof setupStore>