import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  markdownContent: '',
  file: null,
  suggestions: {},
};

const cvReviewSlice = createSlice({
  name: 'cvReview',
  initialState,
  reducers: {
    setMarkdownContent: (state, action) => {
      state.markdownContent = action.payload;
    },
    clearMarkdownContent: state => {
      state.markdownContent = '';
    },
    setFile: (state, action) => {
      state.file = action.payload;
    },
    clearFile: state => {
      state.file = null;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    clearSuggestions: state => {
      state.suggestions = {};
    },
  },
});

export const cvReviewActions = cvReviewSlice.actions;

export default cvReviewSlice;
