import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApi } from '../features/api/userApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import storage from 'redux-persist/lib/storage';
import { persistReducer, PERSIST } from 'redux-persist';
import authReducer from '../features/auth/authSlice'
import { authApi } from '../features/api/authApi';
import { orderApi } from '../features/api/orderApi';
import { dishApi } from '../features/api/dishApi';

const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const reducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [dishApi.reducerPath]: dishApi.reducer,
  auth: authReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }).concat(
        userApi.middleware, authApi.middleware, orderApi.middleware,
        dishApi.middleware
      )
});

setupListeners(store.dispatch);
