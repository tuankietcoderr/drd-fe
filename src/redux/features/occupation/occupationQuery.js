import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const occupationApi = createApi({
  reducerPath: 'occupationApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
  tagTypes: ['Occupation'],
  endpoints: builder => ({
    getOccupations: builder.query({
      query: payload => ({
        url: '/v1/occupation',
        params: payload,
      }),
      transformResponse: res => res.data,
    }),
  }),
});

export default occupationApi;
