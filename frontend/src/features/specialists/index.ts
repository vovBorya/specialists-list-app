// Public API for the specialists feature module

// Pages
export { SpecialistsPage } from './pages';

// Components (if needed outside the feature)
export { SpecialistCard, FiltersModal } from './components';

// Hooks
export { useSpecialistsList } from './hooks';

// API
export { useGetSpecialistsQuery } from './api/specialistsApi';

// Model (actions and selectors)
export {
  filtersReducer,
  setAgeRange,
  setGender,
  setPriceRange,
  resetFilters,
  selectFilters,
  selectActiveFiltersCount,
  uiReducer,
  openFiltersModal,
  closeFiltersModal,
  selectIsFiltersModalOpen,
} from './model';

// Types
export type {
  Specialist,
  SpecialistsResponse,
  SpecialistsQueryParams,
  FiltersState,
} from './types';
