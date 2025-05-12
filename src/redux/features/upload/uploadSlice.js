import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    reset: () => initialState,
  },
});

export const uploadActions = uploadSlice.actions;

export default uploadSlice;
