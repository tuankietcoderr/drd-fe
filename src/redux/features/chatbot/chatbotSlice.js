import {createSlice} from '@reduxjs/toolkit';
import {v4} from 'uuid';

const initialState = {
  chatSessionId: null,
  message: '',
  chatMessages: [
    {
      chat_id: v4(),
      answer: 'Xin chào! Tôi có thể giúp gì cho bạn hôm nay?',
    },
  ],
  isChatLoading: false,
};

const chatbotSlice = createSlice({
  name: 'chatbot',
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
        state.chatMessages[lastIndex] = {
          ...state.chatMessages[lastIndex],
          ...action.payload,
        };
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

export const chatbotActions = chatbotSlice.actions;

export default chatbotSlice;
