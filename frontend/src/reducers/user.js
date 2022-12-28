import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
  name: 'user',
  initialState: {
    error: null,
    username: null,
    userId: null,
    accessToken: null, 
    isLoading: false
  },
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setLoading: (store, action) => {
      store.isLoading = action.payload;
    }
  }
});

