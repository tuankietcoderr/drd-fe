import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getPosts: builder.query({
      query: payload => ({
        url: '/v1/post',
        params: payload,
      }),
      transformResponse: res => res.data,
    }),
    getPostDetail: builder.query({
      query: payload => ({
        url: `/v1/post/${payload.postId}`,
      }),
      transformResponse: res => res.data,
    }),
  }),
});

export default postApi;
