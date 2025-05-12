import {AccessTokenUtils} from '@/utils/token-utils';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {serialize} from 'object-to-formdata';

const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
  tagTypes: ['Upload'],
  endpoints: builder => ({
    uploadFile: builder.mutation({
      query: payload => {
        const formData = serialize(payload);
        return {
          body: formData,
          method: 'POST',
          url: '/v1/upload-image/upload',
          headers: {
            Authorization: `Bearer ${AccessTokenUtils.getToken()}`,
          },
        };
      },
      transformResponse: res => res.data,
    }),
  }),
});

export default uploadApi;
