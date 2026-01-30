import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';

import type { SpecialistsResponse, SpecialistsQueryParams } from '../types/specialist';

const API_URL = import.meta.env.VITE_API_URL;

console.log('API_URL >>> ', API_URL);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const specialistsApi = createApi({
  reducerPath: 'specialistsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Specialists'],
  endpoints: (builder) => ({
    getSpecialists: builder.query<SpecialistsResponse, SpecialistsQueryParams>({
      query: (params) => {
        const queryString = qs.stringify(params, {
          addQueryPrefix: true,
          skipNulls: true,
        });

        return {
          url: `/specialists${queryString}`,
          method: 'GET',
        };
      },
      providesTags: ['Specialists'],
    }),
  }),
});

export const { useGetSpecialistsQuery } = specialistsApi;
