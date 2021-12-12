import { createSlice } from '@reduxjs/toolkit';
import {
  AnyAsyncThunk,
  RejectedWithValueActionFromAsyncThunk,
} from '@reduxjs/toolkit/dist/matchers';
import { addError } from '../helpers/Notifications';
import { fetchUsersData } from './admin-actions';
import { fetchQueueData } from './queue-actions';

interface AllQueueState {
  allQueues: any[];
  users: any[];
}

const initialQueueStore: AllQueueState = { allQueues: [], users: [] };

const adminSlice = createSlice({
  name: 'queue',
  initialState: initialQueueStore,
  reducers: {
    clearQueue(state) {
      state.allQueues = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueueData.fulfilled, (state, action) => {
        state.allQueues = action.payload;
      })
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addMatcher(
        (
          action
        ): action is RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk> =>
          action.type.endsWith('/rejected'),
        (_state, action) => {
          addError('Wystąpił błąd!');
          console.error(action.payload);
        }
      );
  },
});

export const queueActions = adminSlice.actions;
export default adminSlice;
