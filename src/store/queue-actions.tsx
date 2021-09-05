import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddedItem, RemovedItem } from '../interfaces/Dtos';
import {
  addMovieLink,
  getMovieQueue,
  removeMovieLink,
} from '../services/firestore';

export const fetchQueueData = createAsyncThunk(
  'queue/fetchData',
  async (userId: string) => {
    const querySnapshot = await getMovieQueue(userId);

    return querySnapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
  }
);

export const addItemToQueue = createAsyncThunk(
  'queue/addData',
  async (model: AddedItem, { dispatch, rejectWithValue }) => {
    try {
      await addMovieLink(model.url, model.userId);
      dispatch(fetchQueueData(model.userId));
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  }
);

export const removeItemFromQueue = createAsyncThunk(
  'queue/deleteData',
  async (model: RemovedItem, { dispatch, rejectWithValue }) => {
    try {
      await removeMovieLink(model.itemId);

      dispatch(fetchQueueData(model.userId));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

