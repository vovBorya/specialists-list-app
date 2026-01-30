import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isFiltersModalOpen: boolean;
  toastMessage: string | null;
}

const initialState: UIState = {
  isFiltersModalOpen: false,
  toastMessage: null,
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
    showToast: (state, action: PayloadAction<string>) => {
      state.toastMessage = action.payload;
    },
    hideToast: (state) => {
      state.toastMessage = null;
    },
  },
});

export const { openFiltersModal, closeFiltersModal, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
