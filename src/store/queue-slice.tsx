import { createSlice } from '@reduxjs/toolkit';
import {
  AnyAsyncThunk,
  RejectedWithValueActionFromAsyncThunk,
} from '@reduxjs/toolkit/dist/matchers';
import { addError, addInfo, addSuccess } from '../helpers/Notifications';
import { AddedItem } from '../interfaces/Dtos';
import {
  addItemToQueue,
  fetchQueueData,
  removeItemFromQueue,
} from './queue-actions';

interface QueueState {
  queue: any[];
}

const initialQueueStore: QueueState = { queue: [] };

const queueSlice = createSlice({
  name: 'queue',
  initialState: initialQueueStore,
  reducers: {
    clearQueue(state) {
      state.queue = [];
    },
    addLinkToQueue(state, action) {
      const newItem: AddedItem = action.payload;
      newItem.id = 'temp-' + new Date().toISOString();
      state.queue.unshift(action.payload);
    },
    removeItemFromQueue(state, action) {
      state.queue = state.queue.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueueData.fulfilled, (state, action) => {
        state.queue = action.payload;
      })
      .addCase(addItemToQueue.fulfilled, () => {
        addSuccess('Dodano link do listy');
      })
      .addCase(removeItemFromQueue.fulfilled, () => {
        addInfo('Usunięto link z listy');
      })
      .addMatcher(
        (
          action
        ): action is RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk> =>
          action.type.endsWith('/rejected'),
        (_state, action) => {
          addError('Wystąpił bład!');
          console.error(action.payload);
        }
      );
  },
});

export const queueActions = queueSlice.actions;
export default queueSlice;
