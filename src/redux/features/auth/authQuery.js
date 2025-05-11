import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
  tagTypes: ['Auth'],
  endpoints: builder => ({
    signUp: builder.mutation({
      query: payload => ({
        body: payload,
        method: 'POST',
        url: '/v1/auth/signup',
      }),
      transformResponse: res => res.data,
    }),
    signIn: builder.mutation({
      query: payload => ({
        body: payload,
        method: 'POST',
        url: '/v1/auth/signin',
      }),
      transformResponse: res => res.data,
    }),
  }),
});

export default authApi;
