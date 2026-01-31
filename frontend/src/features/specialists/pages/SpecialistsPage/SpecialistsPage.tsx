import { useCallback } from 'react';
import {
  IonPage,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSpinner,
  IonIcon,
  IonToast,
} from '@ionic/react';
import { searchOutline } from 'ionicons/icons';

import { useAppSelector, useAppDispatch } from '@/app/store';
import { Icon, Text } from '@/shared/ui';
import { PAGINATION } from '@/shared/config';
import { useSpecialistsList } from '../../hooks';
import { selectActiveFiltersCount, selectIsFiltersModalOpen, openFiltersModal } from '../../model';
import { SpecialistCard, FiltersModal } from '../../components';
import styles from './SpecialistsPage.module.css';

export function SpecialistsPage() {
  const dispatch = useAppDispatch();
  const isFiltersModalOpen = useAppSelector(selectIsFiltersModalOpen);
  const activeFiltersCount = useAppSelector(selectActiveFiltersCount);

  const { 
    specialists, 
    isLoading, 
    isError, 
    hasMore, 
    total, 
    loadMore, 
    scrollKey 
  } = useSpecialistsList();

  const handleInfiniteScroll = useCallback(
    async (event: CustomEvent<void>) => {
      loadMore();
      // Complete the infinite scroll
      setTimeout(() => {
        (event.target as HTMLIonInfiniteScrollElement).complete();
      }, 500);
    },
    [loadMore]
  );

  const handleOpenFilters = useCallback(() => {
    dispatch(openFiltersModal());
  }, [dispatch]);

  return (
    <IonPage>
      <IonContent>
        <div className={styles.specialistsPage}>
          {/* Header */}
          <header className={styles.pageHeader}>
            <Text as="h3" size="xl" weight="semibold">
              Build healthy relationships with your partner
            </Text>
            <Text as="h6" size="lg" weight="semibold" color="muted">
              {total} providers are currently available
            </Text>
          </header>

          {/* Action Bar */}
          <div className={styles.actionBar}>
            <button className={styles.actionButton} onClick={handleOpenFilters}>
              <Icon size={16} name="filters" badge={activeFiltersCount || undefined} />
              <Text size="md" weight="semibold">
                Filters
              </Text>
            </button>
            <button className={styles.actionButton}>
              <Icon size={16} name="upDownArrows" />
              <Text size="md" weight="semibold">
                Sort
              </Text>
            </button>
            <button className={styles.actionButton}>
              <Icon size={16} name="heartOutline" badge={3} />
              <Text size="md" weight="semibold">
                Favorites
              </Text>
            </button>
          </div>

          {/* Specialists List */}
          <main className={styles.specialistsList}>
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <IonSpinner name="crescent" />
                <p>Loading specialists...</p>
              </div>
            ) : specialists.length === 0 ? (
              <div className={styles.emptyState}>
                <IonIcon icon={searchOutline} />
                <h3>No specialists found</h3>
                <p>Try adjusting your filters to see more results</p>
              </div>
            ) : (
              specialists.map((specialist) => (
                <SpecialistCard key={specialist.id} specialist={specialist} />
              ))
            )}
          </main>

          {/* Infinite Scroll */}
          <IonInfiniteScroll
            key={scrollKey}
            onIonInfinite={handleInfiniteScroll}
            threshold={PAGINATION.INFINITE_SCROLL_THRESHOLD}
            disabled={!hasMore || isLoading}
          >
            <IonInfiniteScrollContent
              loadingSpinner="crescent"
              loadingText="Loading more specialists..."
            />
          </IonInfiniteScroll>
        </div>

        <FiltersModal isOpen={isFiltersModalOpen} totalResults={total} />

        <IonToast
          isOpen={isError}
          message="Failed to load specialists. Please try again."
          duration={3000}
          color="danger"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
}
