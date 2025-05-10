import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {serialize} from 'object-to-formdata';

const cvReviewApi = createApi({
  reducerPath: 'cvReviewApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_AI_URL}),
  tagTypes: ['CvReview'],
  endpoints: builder => ({
    preReview: builder.mutation({
      query: payload => {
        const formData = serialize(payload);
        return {
          body: formData,
          method: 'POST',
          url: '/cv-review/pre-review',
        };
      },
    }),
    review: builder.mutation({
      query: payload => {
        const formData = serialize(payload);
        return {
          body: formData,
          method: 'POST',
          url: '/cv-review/review',
        };
      },
    }),
    reviewSuggest: builder.mutation({
      query: payload => {
        const formData = serialize(payload);
        return {
          body: formData,
          method: 'POST',
          url: '/cv-review/review-suggest',
        };
      },
    }),
    fixCV: builder.mutation({
      query: payload => ({
        body: payload,
        method: 'POST',
        url: '/cv-review/fix-with-suggest',
        responseHandler: 'blob',
      }),
    }),
    fixCVToPdf: builder.mutation({
      query: payload => ({
        body: payload,
        method: 'POST',
        url: '/cv-review/fix-with-suggest',
        responseHandler: async response => {
          return await response.blob();
        },
      }),
    }),
  }),
});

export default cvReviewApi;
