import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
  tagTypes: ['Location'],
  endpoints: builder => ({
    getLocations: builder.query({
      query: payload => ({
        url: '/v1/location',
        params: payload,
      }),
      transformResponse: res => res.data,
    }),
  }),
});

export default locationApi;
