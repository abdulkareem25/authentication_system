import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/states/auth.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/login/fulfilled', 'auth/register/fulfilled', 'auth/fetchDashboard/fulfilled'],
      },
    }),
});

export default store;