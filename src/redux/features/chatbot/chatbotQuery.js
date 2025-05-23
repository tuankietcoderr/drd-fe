import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const chatbotApi = createApi({
  reducerPath: 'chatbotApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_AI_URL}),
  tagTypes: ['Chatbot'],
  endpoints: builder => ({
    chat: builder.mutation({
      query: payload => ({
        body: payload,
        method: 'POST',
        url: '/chatbot/chat',
      }),
    }),
    chatStream: builder.mutation({
      query: payload => ({
        body: payload,
        method: 'POST',
        url: '/chatbot/chat-stream',
        responseHandler: res => res,
      }),
    }),
    getSuggestQuestions: builder.query({
      query: () => '/chatbot/chat/get-suggest-questions',
    }),
  }),
});

export default chatbotApi;
