import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  isFiltersModalOpen: boolean;
}

const initialState: UIState = {
  isFiltersModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openFiltersModal: (state) => {
      state.isFiltersModalOpen = true;
    },
    closeFiltersModal: (state) => {
      state.isFiltersModalOpen = false;
    },
  },
  selectors: {
    selectIsFiltersModalOpen: (state) => state.isFiltersModalOpen,
  },
});

export const { openFiltersModal, closeFiltersModal } = uiSlice.actions;
export const { selectIsFiltersModalOpen } = uiSlice.selectors;
export const uiReducer = uiSlice.reducer;
