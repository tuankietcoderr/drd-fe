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
      providesTags: [{type: 'Candidate', id: 'CV'}],
    }),
    updateCv: builder.mutation({
      query: payload => ({
        url: '/v1/candidate/cv',
        method: 'PUT',
        body: payload,
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      transformResponse: res => res.data,
      invalidatesTags: [{type: 'Candidate', id: 'CV'}],
    }),
    deleteCv: builder.mutation({
      query: () => ({
        url: '/v1/candidate/cv',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      transformResponse: res => res.data,
      invalidatesTags: [{type: 'Candidate', id: 'CV'}],
    }),
    addWorkExperience: builder.mutation({
      query: payload => ({
        url: '/v1/candidate/work',
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      transformResponse: res => res.data,
      invalidatesTags: [{type: 'Candidate', id: 'WORK'}],
    }),
    getWorkExperience: builder.query({
      query: () => ({
        url: '/v1/candidate/work',
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      transformResponse: res => res.data,
      providesTags: [{type: 'Candidate', id: 'WORK'}],
    }),
    updateWorkExperience: builder.mutation({
      query: payload => ({
        url: `/v1/candidate/work/${payload.id}`,
        method: 'PUT',
        body: payload,
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      transformResponse: res => res.data,
      invalidatesTags: [{type: 'Candidate', id: 'WORK'}],
    }),
    deleteWorkExperience: builder.mutation({
      query: payload => ({
        url: `/v1/candidate/work/${payload.id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      transformResponse: res => res.data,
      invalidatesTags: [{type: 'Candidate', id: 'WORK'}],
    }),
    addStudyExperience: builder.mutation({
      query: payload => ({
        url: '/v1/candidate/study',
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      transformResponse: res => res.data,
      invalidatesTags: [{type: 'Candidate', id: 'STUDY'}],
    }),
    getStudyExperience: builder.query({
      query: () => ({
        url: '/v1/candidate/study',
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      transformResponse: res => res.data,
      providesTags: [{type: 'Candidate', id: 'STUDY'}],
    }),
    updateStudyExperience: builder.mutation({
      query: payload => ({
        url: `/v1/candidate/study/${payload.id}`,
        method: 'PUT',
        body: payload,
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      transformResponse: res => res.data,
      invalidatesTags: [{type: 'Candidate', id: 'STUDY'}],
    }),
    deleteStudyExperience: builder.mutation({
      query: payload => ({
        url: `/v1/candidate/study/${payload.id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
        },
      }),
      transformResponse: res => res.data,
      invalidatesTags: [{type: 'Candidate', id: 'STUDY'}],
    }),
  }),
});

export default candidateApi;
