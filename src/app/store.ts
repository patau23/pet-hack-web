import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice'

import { setupListeners } from '@reduxjs/toolkit/query/react'
import { authApi } from '../services/api/modules/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultmiddleware) => getDefaultmiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);