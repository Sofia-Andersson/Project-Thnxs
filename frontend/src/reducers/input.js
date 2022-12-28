import { createSlice } from '@reduxjs/toolkit'

export const input = createSlice({
  name: 'input',
  initialState: {
    error: null,
    textOne: '',
    text2: '',
    text3: ''
  },
  reducers: {
    setError: (store, action) => {
      store.error = action.payload;
    },
    setTextOne: (store, action) => {
      store.textOne = action.payload;
    },
    setText2: (store, action) => {
      store.text2 = action.payload;
    },
    setText3: (store, action) => {
      store.text3 = action.payload;
    }
  }
});

