import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  chatSessionId: null,
  message: '',
  chatMessages: [],
  isChatLoading: false,
};

const jobDescripitonSlice = createSlice({
  name: 'jobDescription',
  initialState,
  reducers: {
    setChatSessionId: (state, action) => {
      state.chatSessionId = action.payload;
    },
    clearChatSessionId: state => {
      state.chatSessionId = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: state => {
      state.message = '';
    },
    addChatMessage: (state, action) => {
      state.chatMessages.push(action.payload);
    },
    replaceLastChatMessage: (state, action) => {
      const lastIndex = state.chatMessages.length - 1;
      if (lastIndex >= 0) {
        state.chatMessages[lastIndex] = action.payload;
      }
    },
    clearChatMessages: state => {
      state.chatMessages = [];
    },
    setChatLoading: (state, action) => {
      state.isChatLoading = action.payload;
    },

    reset: () => initialState,
  },
});

export const jobDescriptionActions = jobDescripitonSlice.actions;

export default jobDescripitonSlice;
