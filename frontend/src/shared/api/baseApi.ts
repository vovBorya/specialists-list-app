import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ENV } from '@/shared/config';

/**
 * Base API configuration for RTK Query
 * Feature-specific endpoints should use `baseApi.injectEndpoints()`
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.API_URL,
    prepareHeaders: (headers) => {
      // Add auth token or other headers here when needed
      return headers;
    },
  }),
  tagTypes: ['Specialists'],
  endpoints: () => ({}),
});
