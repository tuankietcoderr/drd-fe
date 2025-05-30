import {AccessTokenUtils} from '@/utils/token-utils';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const recruiterApi = createApi({
  reducerPath: 'recruiterApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
  tagTypes: ['Recruiter'],
  endpoints: builder => ({
    getRecruiters: builder.query({
      query: payload => ({
        url: '/v1/recruiter/search',
        params: payload,
      }),
      transformResponse: res => res.data,
    }),
    getRecruiterDetail: builder.query({
      query: payload => ({
        url: `/v1/recruiter/${payload.recruiterId}`,
      }),
      transformResponse: res => res.data,
      providesTags: (result, error, arg) => [
        {type: 'Recruiter', id: arg.recruiterId},
      ],
    }),
    getRecruiterInfo: builder.query({
      query: () => ({
        url: '/v1/recruiter',
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      transformResponse: res => res.data,
      providesTags: [{type: 'Recruiter', id: 'Info'}],
    }),
    updateRecruiterProfile: builder.mutation({
      query: payload => ({
        url: '/v1/recruiter',
        method: 'PUT',
        body: payload,
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      invalidatesTags: [{type: 'Recruiter', id: 'Info'}],
    }),
  }),
});

export default recruiterApi;
