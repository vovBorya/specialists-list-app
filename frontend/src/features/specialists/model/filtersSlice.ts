import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FILTER_DEFAULTS } from '@/shared/config';
import type { FiltersState } from '../types';

const initialState: FiltersState = {
  ageMin: FILTER_DEFAULTS.AGE_MIN,
  ageMax: FILTER_DEFAULTS.AGE_MAX,
  gender: null,
  priceMin: FILTER_DEFAULTS.PRICE_MIN,
  priceMax: FILTER_DEFAULTS.PRICE_MAX,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setAgeRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.ageMin = action.payload.min;
      state.ageMax = action.payload.max;
    },
    setGender: (state, action: PayloadAction<'man' | 'woman' | null>) => {
      state.gender = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.priceMin = action.payload.min;
      state.priceMax = action.payload.max;
    },
    resetFilters: () => initialState,
    applyFilters: (_, action: PayloadAction<FiltersState>) => {
      return action.payload;
    },
  },
  selectors: {
    selectFilters: (state) => state,
    selectActiveFiltersCount: (state) => {
      let count = 0;
      if (state.gender !== null) count++;
      if (state.ageMin !== FILTER_DEFAULTS.AGE_MIN || state.ageMax !== FILTER_DEFAULTS.AGE_MAX)
        count++;
      if (
        state.priceMin !== FILTER_DEFAULTS.PRICE_MIN ||
        state.priceMax !== FILTER_DEFAULTS.PRICE_MAX
      )
        count++;
      return count;
    },
  },
});

export const { 
  setAgeRange, 
  setGender, 
  setPriceRange, 
  resetFilters, 
  applyFilters 
} = filtersSlice.actions;
export const { selectFilters, selectActiveFiltersCount } = filtersSlice.selectors;
export const filtersReducer = filtersSlice.reducer;
