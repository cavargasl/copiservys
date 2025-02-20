
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';
import { env } from '@/config/env.mjs';

export const store = configureStore({
  reducer: rootReducer,
  devTools: env.NEXT_PUBLIC_NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch