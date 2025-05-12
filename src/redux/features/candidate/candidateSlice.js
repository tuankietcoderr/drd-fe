import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cv: null,
};

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    setCV: (state, action) => {
      state.cv = action.payload;
    },
    clearCV: state => {
      state.cv = null;
    },
    reset: () => initialState,
  },
});

export const candidateActions = candidateSlice.actions;

export default candidateSlice;
