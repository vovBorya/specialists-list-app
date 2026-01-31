import { baseApi } from '@/shared/api';

import type { SpecialistsResponse, SpecialistsQueryParams } from '../types';

export const specialistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpecialists: builder.query<SpecialistsResponse, SpecialistsQueryParams>({
      query: (params) => ({
        url: '/specialists',
        params,
      }),
      providesTags: ['Specialists'],
    }),
  }),
});

export const { useGetSpecialistsQuery } = specialistsApi;
