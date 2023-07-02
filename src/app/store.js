import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApi } from '../features/api/userApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const reducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
      },
    }).concat(
        userApi.middleware
      )
});

setupListeners(store.dispatch);
