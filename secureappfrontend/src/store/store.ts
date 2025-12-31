import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../features/auth/slices/authSlice';
import sessionReducer from '../features/session/slices/sessionSlice';
import dashboardReducer from '../features/dashboard/slices/dashboardSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    session: sessionReducer,
    dashboard: dashboardReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);

// 🔹 Typed helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
