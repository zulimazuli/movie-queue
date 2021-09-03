import { configureStore } from '@reduxjs/toolkit';
import queueSlice from './queue-slice';
import uiSlice from './ui-slice';

export const store = configureStore({
  reducer: { ui: uiSlice.reducer, queue: queueSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
