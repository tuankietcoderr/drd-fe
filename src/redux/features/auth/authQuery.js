import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
  tagTypes: ['Auth'],
  endpoints: builder => ({}),
});

export default authApi;
