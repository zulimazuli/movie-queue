import { createSlice } from '@reduxjs/toolkit';
import { fetchQueueData } from './queue-actions';

interface UIStore {
  loading: boolean;
}

const initialUiStore: UIStore = { loading: false };

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiStore,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   .addCase(addItemToQueue.pending, (state) => {
      //     state.loading = true;
      //   })
      //   .addCase(addItemToQueue.fulfilled, (state) => {
      //     state.loading = false;
      //   })
      .addCase(fetchQueueData.pending, (state) => {
        //state.loading = true;
      })
      .addCase(fetchQueueData.fulfilled, (state) => {
        //state.loading = false;
      });
  },
});

export default uiSlice;
