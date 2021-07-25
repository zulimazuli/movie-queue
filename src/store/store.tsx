
import { configureStore } from '@reduxjs/toolkit';
import { queueSlice } from './queue';


export const store = configureStore({
    reducer: { queue: queueSlice.reducer } 
});