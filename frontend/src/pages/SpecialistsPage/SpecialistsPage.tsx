import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  IonPage,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSpinner,
  IonIcon,
  IonToast,
} from '@ionic/react';
import { swapVerticalOutline, heartOutline, searchOutline } from 'ionicons/icons';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { openFiltersModal } from '../../store/slices/uiSlice';

import { useGetSpecialistsQuery } from '../../api/specialistsApi';

import { useDebounce } from '../../hooks';

import SpecialistCard from '../../components/SpecialistCard';
import FiltersModal from '../../components/FiltersModal';
import Icon from '../../components/Icon';
import Text from '../../components/Text';

import type { Specialist } from '../../types/specialist';
import styles from './SpecialistsPage.module.css';

const SpecialistsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const isFiltersModalOpen = useAppSelector((state) => state.ui.isFiltersModalOpen);
  
  const [page, setPage] = useState(1);
  const [allSpecialists, setAllSpecialists] = useState<Specialist[]>([]);
  const [isInfiniteDisabled, setIsInfiniteDisabled] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  // Debounce filters to avoid excessive API calls (500ms delay)
  const debouncedFilters = useDebounce(filters, 500);

  // Track if this is the initial render to avoid unnecessary resets
  const isInitialMount = useRef(true);

  const queryParams = {
    page,
    limit: 10,
    ...(debouncedFilters.gender && { gender: debouncedFilters.gender }),
    ageMin: debouncedFilters.ageMin,
    ageMax: debouncedFilters.ageMax,
    priceMin: debouncedFilters.priceMin,
    priceMax: debouncedFilters.priceMax,
  };

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
      if (data.page === 1) {
        setAllSpecialists(data.items);
      } else {
        setAllSpecialists((prev) => [...prev, ...data.items]);
      }
      
      // Check if we've loaded all items
      if (data.page >= data.totalPages) {
        setIsInfiniteDisabled(true);
      }
    }
  }, [data]);

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

  // Count active filters
  const activeFiltersCount = [
    filters.gender !== null,
    filters.ageMin !== 22 || filters.ageMax !== 55,
    filters.priceMin !== 10 || filters.priceMax !== 70,
  ].filter(Boolean).length;

  return (
    <IonPage>
      <IonContent>
        <div className={styles.specialistsPage}>
          {/* Header */}
          <div className={styles.pageHeader}>
            <Text 
              size={20} 
              as="h3"
              color="var(--color-text-primary)"
              weight={600}
            >
              Build healthy relationships with your partner
            </Text>
            <Text 
              as="h6"
              size={15}
              weight={600}
              color="var(--color-text-muted)"
            >
              {data?.total || 0} providers are currently available
            </Text>
          </div>

          {/* Action Bar */}
          <div className={styles.actionBar}>
            <button className={styles.actionButton} onClick={handleOpenFilters}>
              <Icon 
                size={16}
                name="filters" 
                badge={activeFiltersCount}
              />
              <Text
                size={14}
                weight={600}
                color="var(--color-text-primary)"
              >
                Filters
              </Text>
            </button>
            <button className={styles.actionButton}>
              <Icon 
                size={16}
                name="upDownArrows"
              />
              <Text
                size={14}
                weight={600}
                color="var(--color-text-primary)"
              >
                Sort
              </Text>
            </button>
            <button className={styles.actionButton}>
              <Icon 
                size={16}
                name="heartOutline"
                badge={3}
              />
              <Text
                size={14}
                weight={600}
                color="var(--color-text-primary)"
              >
                Favorites
              </Text>
            </button>
          </div>

          {/* Specialists List */}
          <div className={styles.specialistsList}>
            {isLoading && page === 1 ? (
              <div className={styles.loadingContainer}>
                <IonSpinner name="crescent" />
                <p>Loading specialists...</p>
              </div>
            ) : allSpecialists.length === 0 && !isLoading ? (
              <div className={styles.emptyState}>
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

        <FiltersModal
          isOpen={isFiltersModalOpen}
          totalResults={data?.total || 0}
        />

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
