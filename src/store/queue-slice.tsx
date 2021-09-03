import { createSlice } from '@reduxjs/toolkit';
import {
  AnyAsyncThunk,
  RejectedActionFromAsyncThunk,
} from '@reduxjs/toolkit/dist/matchers';
import { addError, addInfo, addSuccess } from '../helpers/Notifications';
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueueData.fulfilled, (state, action) => {
        state.queue = action.payload;
      })
      .addCase(addItemToQueue.fulfilled, (state, action) => {
        state.queue.unshift(action.payload);
        addSuccess('Dodano link');
      })
      .addCase(removeItemFromQueue.fulfilled, (state, action) => {
        state.queue = state.queue.filter((item) => item.id !== action.payload);
        addInfo('Usunięto link');
      })
      .addMatcher(
        (action): action is RejectedActionFromAsyncThunk<AnyAsyncThunk> =>
          action.type.endsWith('/rejected'),
        (state, action) => {
          addError('Wystąpił bład!');
        }
      );
  },
});

export const queueActions = queueSlice.actions;
export default queueSlice;
