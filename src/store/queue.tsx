import { createSlice } from '@reduxjs/toolkit';
import { IMovieQueueItem } from '../interfaces/MovieQueue';

interface QueueState {
    queue : IMovieQueueItem[]
}

const initialQueueStore : QueueState = { queue: [] };

export const queueSlice = createSlice({
    name: 'queue',
    initialState: initialQueueStore,
    reducers: {
        getQueue(state) {
            const item: IMovieQueueItem = { id: 'uniqId000', url: 'http://testwebiste.com', created: 13456789987456, userId: 'userId000' };
            // api call?
            state.queue = [item, item];
        },
        addItem(state, action) {
            //api call, add action.payload to db?
            state.queue = [...state.queue, action.payload]
        },
        removeItem(state, action) {
            //api call, remove from db
            //get new queue
            state.queue = state.queue;
        }

    }
});


