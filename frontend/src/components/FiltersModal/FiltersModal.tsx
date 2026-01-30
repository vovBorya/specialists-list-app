import React from 'react';
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

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  setAgeRange,
  setGender,
  setPriceRange,
  resetFilters,
} from '../../store/slices/filtersSlice';
import { closeFiltersModal } from '../../store/slices/uiSlice';

import styles from './FiltersModal.module.css';

type FiltersModalProps = {
  isOpen: boolean;
  totalResults: number;
}

const FiltersModal: React.FC<FiltersModalProps> = ({ isOpen, totalResults }) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  const handleClose = () => {
    dispatch(closeFiltersModal());
  };

  const handleReset = () => {
    dispatch(resetFilters());
    handleClose()
  };

  const handlePriceChange = (lower: number, upper: number) => {
    dispatch(setPriceRange({ min: lower, max: upper }));
  };

  const handleAgeChange = (lower: number, upper: number) => {
    dispatch(setAgeRange({ min: lower, max: upper }));
  };

  const handleGenderSelect = (gender: 'man' | 'woman') => {
    dispatch(setGender(filters.gender === gender ? null : gender));
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleClose}>
      <IonHeader color='primary'>
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
              min={800}
              max={2800}
              step={100}
              value={{ lower: filters.priceMin, upper: filters.priceMax }}
              onIonChange={(e) => {
                const value = e.detail.value as { lower: number; upper: number };
                handlePriceChange(value.lower, value.upper);
              }}
            />
          </div>

          {/* Gender */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterSectionTitle}>Gender</h3>
            <div className={styles.genderButtons}>
              <button
                className={`${styles.genderButton} ${filters.gender === 'man' ? styles.selected : ''}`}
                onClick={() => handleGenderSelect('man')}
              >
                <span className={styles.emoji}>👨</span>
                <span>Man</span>
              </button>
              <button
                className={`${styles.genderButton} ${filters.gender === 'woman' ? styles.selected : ''}`}
                onClick={() => handleGenderSelect('woman')}
              >
                <span className={styles.emoji}>👩</span>
                <span>Woman</span>
              </button>
            </div>
          </div>

          {/* Age Range */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterSectionTitle}>Age</h3>
            <div className={styles.rangeDisplay}>
              {filters.ageMin} – {filters.ageMax}+
            </div>
            <IonRange
              dualKnobs
              min={22}
              max={55}
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
};

export default FiltersModal;
