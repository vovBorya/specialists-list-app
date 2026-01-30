import React, { useState, useCallback, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSpinner,
  IonIcon,
  IonToast,
} from '@ionic/react';
import { filterOutline, swapVerticalOutline, heartOutline, searchOutline } from 'ionicons/icons';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useGetSpecialistsQuery } from '../../api/specialistsApi';
import { openFiltersModal } from '../../store/slices/uiSlice';
import SpecialistCard from '../../components/SpecialistCard';
import FiltersModal from '../../components/FiltersModal';
import type { Specialist, FiltersState } from '../../types/specialist';
import './SpecialistsPage.css';

const SpecialistsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const isFiltersModalOpen = useAppSelector((state) => state.ui.isFiltersModalOpen);
  
  const [page, setPage] = useState(1);
  const [allSpecialists, setAllSpecialists] = useState<Specialist[]>([]);
  const [isInfiniteDisabled, setIsInfiniteDisabled] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  // Build query params from filters
  const queryParams = {
    page,
    limit: 10,
    ...(filters.gender && { gender: filters.gender }),
    ageMin: filters.ageMin,
    ageMax: filters.ageMax,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
  };

  const { data, isLoading, isError, isFetching } = useGetSpecialistsQuery(queryParams);

  // Reset list when filters change
  useEffect(() => {
    setPage(1);
    setAllSpecialists([]);
    setIsInfiniteDisabled(false);
  }, [filters]);

  // Update specialists list when data changes
  useEffect(() => {
    if (data?.items) {
      if (page === 1) {
        setAllSpecialists(data.items);
      } else {
        setAllSpecialists((prev) => [...prev, ...data.items]);
      }
      
      // Check if we've loaded all items
      if (page >= data.totalPages) {
        setIsInfiniteDisabled(true);
      }
    }
  }, [data, page]);

  // Show error toast
  useEffect(() => {
    if (isError) {
      setShowErrorToast(true);
    }
  }, [isError]);

  const handleInfiniteScroll = useCallback(
    async (event: CustomEvent<void>) => {
      if (data && page < data.totalPages && !isFetching) {
        setPage((prev) => prev + 1);
      }
      
      // Complete the infinite scroll
      setTimeout(() => {
        (event.target as HTMLIonInfiniteScrollElement).complete();
      }, 500);
    },
    [data, page, isFetching]
  );

  const handleOpenFilters = () => {
    dispatch(openFiltersModal());
  };

  const handleApplyFilters = (_newFilters: FiltersState) => {
    // Filters are already applied via Redux, just reset pagination
    setPage(1);
    setAllSpecialists([]);
    setIsInfiniteDisabled(false);
  };

  // Count active filters
  const activeFiltersCount = [
    filters.gender !== null,
    filters.ageMin !== 22 || filters.ageMax !== 55,
    filters.priceMin !== 10 || filters.priceMax !== 70,
  ].filter(Boolean).length;

  return (
    <IonPage>
      <IonContent>
        <div className="specialists-page">
          {/* Header */}
          <div className="page-header">
            <h1 className="page-title">
              Build healthy relationships with your partner
            </h1>
            <p className="page-subtitle">
              {data?.total || 0} providers are currently available
            </p>
          </div>

          {/* Action Bar */}
          <div className="action-bar">
            <button className="action-button" onClick={handleOpenFilters}>
              <IonIcon icon={filterOutline} />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="badge">{activeFiltersCount}</span>
              )}
            </button>
            <button className="action-button">
              <IonIcon icon={swapVerticalOutline} />
              <span>Sort</span>
            </button>
            <button className="action-button">
              <IonIcon icon={heartOutline} />
              <span>Favorites</span>
              <span className="badge badge-green">3</span>
            </button>
          </div>

          {/* Specialists List */}
          <div className="specialists-list">
            {isLoading && page === 1 ? (
              <div className="loading-container">
                <IonSpinner name="crescent" />
                <p>Loading specialists...</p>
              </div>
            ) : allSpecialists.length === 0 && !isLoading ? (
              <div className="empty-state">
                <IonIcon icon={searchOutline} />
                <h3>No specialists found</h3>
                <p>Try adjusting your filters to see more results</p>
              </div>
            ) : (
              allSpecialists.map((specialist) => (
                <SpecialistCard key={specialist.id} specialist={specialist} />
              ))
            )}
          </div>

          {/* Infinite Scroll */}
          <IonInfiniteScroll
            onIonInfinite={handleInfiniteScroll}
            threshold="100px"
            disabled={isInfiniteDisabled || isLoading}
          >
            <IonInfiniteScrollContent
              loadingSpinner="crescent"
              loadingText="Loading more specialists..."
            />
          </IonInfiniteScroll>
        </div>

        {/* Filters Modal */}
        <FiltersModal
          isOpen={isFiltersModalOpen}
          onApply={handleApplyFilters}
          totalResults={data?.total || 0}
        />

        {/* Error Toast */}
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message="Failed to load specialists. Please try again."
          duration={3000}
          color="danger"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default SpecialistsPage;
