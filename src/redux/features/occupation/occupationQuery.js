import {AccessTokenUtils} from '@/utils/token-utils';
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
    getOccupationDetail: builder.query({
      query: ({occupationId}) => ({
        url: `/v1/occupation/${occupationId}`,
      }),
      transformResponse: res => res.data,
      providesTags: (result, error, arg) => [
        {type: 'Occupation', id: arg.occupationId},
      ],
    }),
    createOccupation: builder.mutation({
      query: payload => ({
        url: '/v1/occupation',
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      invalidatesTags: [{type: 'Occupation', id: 'LIST'}],
    }),
    updateOccupation: builder.mutation({
      query: ({occupationId, ...payload}) => ({
        url: `/v1/occupation/${occupationId}`,
        method: 'PUT',
        body: payload,
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        {type: 'Occupation', id: 'LIST'},
        {type: 'Occupation', id: arg.occupationId},
      ],
    }),
    deleteOccupation: builder.mutation({
      query: ({occupationId}) => ({
        url: `/v1/occupation/${occupationId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        {type: 'Occupation', id: 'LIST'},
        {type: 'Occupation', id: arg.occupationId},
      ],
    }),
  }),
});

export default occupationApi;
