import { memo, useCallback } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonRange,
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';

import { useAppSelector, useAppDispatch } from '@/app/store';
import { FILTER_DEFAULTS } from '@/shared/config';
import { cn } from '@/shared/lib';
import {
  selectFilters,
  setAgeRange,
  setGender,
  setPriceRange,
  resetFilters,
  closeFiltersModal,
} from '../../model';
import styles from './FiltersModal.module.css';

interface FiltersModalProps {
  isOpen: boolean;
  totalResults: number;
}

export const FiltersModal = memo(function FiltersModal({
  isOpen,
  totalResults,
}: FiltersModalProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const handleClose = useCallback(() => {
    dispatch(closeFiltersModal());
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(resetFilters());
    handleClose();
  }, [dispatch, handleClose]);

  const handlePriceChange = useCallback(
    (lower: number, upper: number) => {
      dispatch(setPriceRange({ min: lower, max: upper }));
    },
    [dispatch]
  );

  const handleAgeChange = useCallback(
    (lower: number, upper: number) => {
      dispatch(setAgeRange({ min: lower, max: upper }));
    },
    [dispatch]
  );

  const handleGenderSelect = useCallback(
    (gender: 'man' | 'woman') => {
      dispatch(setGender(filters.gender === gender ? null : gender));
    },
    [dispatch, filters.gender]
  );

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleClose}>
      <IonHeader color="primary">
        <IonToolbar className={styles.filterToolbar}>
          <IonButtons slot="start">
            <IonButton onClick={handleClose}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Filters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.filtersContent}>
        <div className={styles.filtersContainer}>
          {/* Price Range */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterSectionTitle}>Price per session</h3>
            <div className={styles.rangeDisplay}>
              {filters.priceMin} ₴ – {filters.priceMax} ₴
            </div>
            <IonRange
              dualKnobs
              min={FILTER_DEFAULTS.PRICE_MIN}
              max={FILTER_DEFAULTS.PRICE_MAX}
              step={100}
              value={{ lower: filters.priceMin, upper: filters.priceMax }}
              onIonChange={(e) => {
                const value = e.detail.value as { lower: number; upper: number };
                handlePriceChange(value.lower, value.upper);
              }}
            />
          </div>

          <div className={styles.filterDivider} />

          {/* Gender */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterSectionTitle}>Gender</h3>
            <div className={styles.genderButtons}>
              <button
                className={cn(styles.genderButton, filters.gender === 'man' && styles.selected)}
                onClick={() => handleGenderSelect('man')}
              >
                <span className={styles.emoji}>👨</span>
                <span>Man</span>
              </button>
              <button
                className={cn(styles.genderButton, filters.gender === 'woman' && styles.selected)}
                onClick={() => handleGenderSelect('woman')}
              >
                <span className={styles.emoji}>👩</span>
                <span>Woman</span>
              </button>
            </div>
          </div>

          <div className={styles.filterDivider} />

          {/* Age Range */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterSectionTitle}>Age</h3>
            <div className={styles.rangeDisplay}>
              {filters.ageMin} – {filters.ageMax}+
            </div>
            <IonRange
              dualKnobs
              min={FILTER_DEFAULTS.AGE_MIN}
              max={FILTER_DEFAULTS.AGE_MAX}
              step={1}
              value={{ lower: filters.ageMin, upper: filters.ageMax }}
              onIonChange={(e) => {
                const value = e.detail.value as { lower: number; upper: number };
                handleAgeChange(value.lower, value.upper);
              }}
            />
          </div>
        </div>

        <div className={styles.filterActions}>
          <button className={styles.clearButton} onClick={handleReset}>
            Clear all
          </button>
          <button className={styles.showButton} onClick={handleClose}>
            Show ({totalResults})
          </button>
        </div>
      </IonContent>
    </IonModal>
  );
});
