import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
  tagTypes: ['Upload'],
  endpoints: builder => ({
    uploadFile: builder.mutation({
      query: payload => ({
        body: payload,
        method: 'POST',
        url: '/v1/upload-image/upload',
      }),
      transformResponse: res => res.data,
    }),
  }),
});

export default uploadApi;
