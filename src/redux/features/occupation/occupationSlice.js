import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  occupations: [],
};

const occupationSlice = createSlice({
  name: 'occupation',
  initialState,
  reducers: {
    setOccupations: (state, action) => {
      state.occupations = action.payload;
    },
    clearOccupations: state => {
      state.occupations = [];
    },
    reset: () => initialState,
  },
});

export const occupationActions = occupationSlice.actions;

export default occupationSlice;
