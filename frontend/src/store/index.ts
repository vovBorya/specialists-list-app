import { configureStore } from '@reduxjs/toolkit';
import { specialistsApi } from '../api/specialistsApi';
import filtersReducer from './slices/filtersSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    [specialistsApi.reducerPath]: specialistsApi.reducer,
    filters: filtersReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(specialistsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
