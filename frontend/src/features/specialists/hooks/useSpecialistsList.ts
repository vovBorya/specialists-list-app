import { useState, useCallback, useEffect, useRef, useMemo } from 'react';

import { useAppSelector } from '@/app/store';
import { useDebounce } from '@/shared/hooks';
import { PAGINATION, DEBOUNCE_DELAY } from '@/shared/config';
import { useGetSpecialistsQuery } from '../api/specialistsApi';
import { selectFilters } from '../model/filtersSlice';
import type { Specialist, SpecialistsQueryParams } from '../types';

interface UseSpecialistsListReturn {
  specialists: Specialist[];
  isLoading: boolean;
  isLoadingMore: boolean;
  isError: boolean;
  hasMore: boolean;
  total: number;
  loadMore: () => void;
}

export function useSpecialistsList(): UseSpecialistsListReturn {
  const filters = useAppSelector(selectFilters);

  const [page, setPage] = useState(1);
  const [allSpecialists, setAllSpecialists] = useState<Specialist[]>([]);
  const [isInfiniteDisabled, setIsInfiniteDisabled] = useState(false);

  // Debounce filters to avoid excessive API calls
  const debouncedFilters = useDebounce(filters, DEBOUNCE_DELAY.FILTERS);

  // Track if this is the initial render to avoid unnecessary resets
  const isInitialMount = useRef(true);

  const queryParams: SpecialistsQueryParams = useMemo(
    () => ({
      page,
      limit: PAGINATION.DEFAULT_PAGE_SIZE,
      ...(debouncedFilters.gender && { gender: debouncedFilters.gender }),
      ageMin: debouncedFilters.ageMin,
      ageMax: debouncedFilters.ageMax,
      priceMin: debouncedFilters.priceMin,
      priceMax: debouncedFilters.priceMax,
    }),
    [page, debouncedFilters]
  );

  const { data, isLoading, isError, isFetching } = useGetSpecialistsQuery(queryParams);

  // Reset list when debounced filters change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setPage(1);
    setAllSpecialists([]);
    setIsInfiniteDisabled(false);
  }, [debouncedFilters]);

  // Update specialists list when data changes
  useEffect(() => {
    if (data?.items) {
      if (data.meta.page === 1) {
        setAllSpecialists(data.items);
      } else {
        setAllSpecialists((prev) => [...prev, ...data.items]);
      }

      // Check if we've loaded all items
      if (!data.meta.hasNextPage) {
        setIsInfiniteDisabled(true);
      }
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (data?.meta.hasNextPage && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [data, isFetching]);

  return {
    specialists: allSpecialists,
    isLoading: isLoading && page === 1,
    isLoadingMore: isFetching && page > 1,
    isError,
    hasMore: !isInfiniteDisabled && !isLoading,
    total: data?.meta.total ?? 0,
    loadMore,
  };
}
