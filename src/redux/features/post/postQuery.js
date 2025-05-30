import {AccessTokenUtils} from '@/utils/token-utils';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getPosts: builder.query({
      query: payload => {
        const accessToken = AccessTokenUtils.getToken();
        return {
          url: '/v1/post',
          params: payload,
          headers: !!accessToken
            ? {
                Authorization: `Bearer ${accessToken}`,
              }
            : {},
        };
      },
      transformResponse: res => res.data,
      providesTags: [{type: 'Post', id: 'List'}],
    }),
    getPostDetail: builder.query({
      query: payload => {
        const accessToken = AccessTokenUtils.getToken();
        return {
          url: `/v1/post/${payload.postId}`,
          headers: !!accessToken
            ? {
                Authorization: `Bearer ${accessToken}`,
              }
            : {},
        };
      },
      transformResponse: res => res.data,
      providesTags: (result, error, arg) => [{type: 'Post', id: arg.postId}],
    }),
    apply: builder.mutation({
      query: payload => ({
        url: `/v1/post/${payload.postId}/apply`,
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{type: 'Post', id: arg.postId}],
    }),
    unApply: builder.mutation({
      query: payload => ({
        url: `/v1/post/${payload.postId}/apply`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        {type: 'Post', id: arg.postId},
        {type: 'Post', id: 'AppliedPosts'},
      ],
    }),
    getRelatedPosts: builder.query({
      query: payload => {
        const accessToken = AccessTokenUtils.getToken();
        return !!accessToken
          ? {
              url: `/v1/post/${payload.postId}/related`,
              params: payload,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          : {};
      },
      transformResponse: res => res.data,
    }),
    getSuitableJobs: builder.query({
      query: payload => ({
        method: 'POST',
        url: `/v1/post/suitable_job`,
        params: payload,
        body: payload,
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      transformResponse: res => res.data,
    }),
    getAppliedPosts: builder.query({
      query: () => ({
        url: '/v1/post/applied',
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      transformResponse: res => res.data,
      providesTags: [{type: 'Post', id: 'AppliedPosts'}],
    }),

    createPost: builder.mutation({
      query: payload => ({
        url: '/v1/post',
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      invalidatesTags: [{type: 'Post', id: 'List'}],
    }),
    updatePost: builder.mutation({
      query: payload => ({
        url: `/v1/post/${payload.postId}`,
        method: 'PUT',
        body: payload,
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        {type: 'Post', id: arg.postId},
        {type: 'Post', id: 'List'},
      ],
    }),

    getPostCandidates: builder.query({
      query: payload => ({
        url: `/v1/post/${payload.postId}/candidates`,
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      transformResponse: res => res.data,
    }),

    deletePost: builder.mutation({
      query: payload => ({
        url: `/v1/post/${payload.postId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        {type: 'Post', id: 'List'},
        {type: 'Post', id: arg.postId},
      ],
    }),
  }),
});

export default postApi;
