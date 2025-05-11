import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  locations: [],
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    clearLocations: state => {
      state.locations = [];
    },
    reset: () => initialState,
  },
});

export const locationActions = locationSlice.actions;

export default locationSlice;
