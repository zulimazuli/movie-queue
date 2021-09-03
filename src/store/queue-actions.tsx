import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addMovieLink,
  getMovieQueue,
  removeMovieLink,
} from '../services/firestore';

export interface addItemToQueueModel {
  link: string;
  userId: string;
}

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
  async (model: addItemToQueueModel) => {
    await addMovieLink(model.link, model.userId);
    return { url: model.link, userId: model.userId };
  }
);

export const removeItemFromQueue = createAsyncThunk(
  'queue/deleteData',
  async (itemId: string) => {
    await removeMovieLink(itemId);
    return itemId;
  }
);
