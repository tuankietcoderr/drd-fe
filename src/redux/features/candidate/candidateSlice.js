import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cv: null,
  candidate: null,
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
    setCandidate: (state, action) => {
      state.candidate = action.payload;
    },
    clearCandidate: state => {
      state.candidate = null;
    },
    reset: () => initialState,
  },
});

export const candidateActions = candidateSlice.actions;

export default candidateSlice;
