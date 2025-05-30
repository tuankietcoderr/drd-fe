import {AccessTokenUtils} from '@/utils/token-utils';
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
      providesTags: [{type: 'Location', id: 'LIST'}],
    }),
    getLocationDetail: builder.query({
      query: ({locationId}) => ({
        url: `/v1/location/${locationId}`,
      }),
      transformResponse: res => res.data,
      providesTags: (result, error, arg) => [
        {type: 'Location', id: arg.locationId},
      ],
    }),
    createLocation: builder.mutation({
      query: payload => ({
        url: '/v1/location',
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      invalidatesTags: [{type: 'Location', id: 'LIST'}],
    }),
    updateLocation: builder.mutation({
      query: ({locationId, ...payload}) => ({
        url: `/v1/location/${locationId}`,
        method: 'PUT',
        body: payload,
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        {type: 'Location', id: 'LIST'},
        {type: 'Location', id: arg.locationId},
      ],
    }),
    deleteLocation: builder.mutation({
      query: ({locationId}) => ({
        url: `/v1/location/${locationId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        {type: 'Location', id: 'LIST'},
        {type: 'Location', id: arg.locationId},
      ],
    }),
  }),
});

export default locationApi;
