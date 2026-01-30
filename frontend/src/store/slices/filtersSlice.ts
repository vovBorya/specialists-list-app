import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FiltersState } from '../../types/specialist';

const initialState: FiltersState = {
  ageMin: 22,
  ageMax: 55,
  gender: null,
  priceMin: 800,
  priceMax: 2800,
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
    applyFilters: (state, action: PayloadAction<FiltersState>) => {
      return action.payload;
    },
  },
});

export const { setAgeRange, setGender, setPriceRange, resetFilters, applyFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
