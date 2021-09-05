import { createSlice } from '@reduxjs/toolkit';
import { fetchQueueData } from './queue-actions';

interface UIStore {
  isInitial: boolean;
  loading: boolean;
}

const initialUiStore: UIStore = {
  isInitial: true,
  loading: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiStore,
  reducers: {
    showLoader(state) {
      state.loading = true;
    },
    hideLoader(state) {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueueData.pending, (state) => {
        if (state.isInitial) {
          state.loading = true;
          state.isInitial = false;
        }
      })
      .addCase(fetchQueueData.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
