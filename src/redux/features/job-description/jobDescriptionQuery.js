import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const jobDescriptionApi = createApi({
  reducerPath: 'jobDescriptionApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_AI_URL}),
  tagTypes: ['JobDescription'],
  endpoints: builder => ({
    chat: builder.mutation({
      query: payload => ({
        body: payload,
        method: 'POST',
        url: '/job-description/chat',
      }),
    }),
  }),
});

export default jobDescriptionApi;
