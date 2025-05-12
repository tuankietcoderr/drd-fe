import {AccessTokenUtils} from '@/utils/token-utils';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const candidateApi = createApi({
  reducerPath: 'candidateApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
  tagTypes: ['Candidate'],
  endpoints: builder => ({
    getCandidateCv: builder.query({
      query: () => ({
        url: '/v1/candidate/cv',
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      transformResponse: res => res.data,
    }),
  }),
});

export default candidateApi;
