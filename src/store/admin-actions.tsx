import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../services/firestore';

export const fetchUsersData = createAsyncThunk('queue/getUsers', async () => {
  const querySnapshot = await getUsers();

  return querySnapshot.docs.map((doc: any) => {
    return { id: doc.id, ...doc.data() };
  });
});
