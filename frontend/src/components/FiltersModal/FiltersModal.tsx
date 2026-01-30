import React, { useState, useEffect } from 'react';
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
import { applyFilters, resetFilters } from '../../store/slices/filtersSlice';
import { closeFiltersModal } from '../../store/slices/uiSlice';
import type { FiltersState } from '../../types/specialist';
import './FiltersModal.css';

interface FiltersModalProps {
  isOpen: boolean;
  onApply: (filters: FiltersState) => void;
  totalResults: number;
}

const FiltersModal: React.FC<FiltersModalProps> = ({ isOpen, onApply, totalResults }) => {
  const dispatch = useAppDispatch();
  const currentFilters = useAppSelector((state) => state.filters);

  // Local state for the modal
  const [localFilters, setLocalFilters] = useState<FiltersState>(currentFilters);

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  const handleClose = () => {
    dispatch(closeFiltersModal());
  };

  const handleApply = () => {
    dispatch(applyFilters(localFilters));
    onApply(localFilters);
    dispatch(closeFiltersModal());
  };

  const handleReset = () => {
    const defaultFilters: FiltersState = {
      ageMin: 22,
      ageMax: 55,
      gender: null,
      priceMin: 10,
      priceMax: 70,
    };
    setLocalFilters(defaultFilters);
    dispatch(resetFilters());
  };

  const handleGenderSelect = (gender: 'man' | 'woman') => {
    setLocalFilters((prev) => ({
      ...prev,
      gender: prev.gender === gender ? null : gender,
    }));
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleClose}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleClose}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Filters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="filters-content">
        <div className="filters-container">
          {/* Price Range */}
          <div className="filter-section">
            <h3 className="filter-section-title">Price per session</h3>
            <div className="range-display">
              ${localFilters.priceMin} – ${localFilters.priceMax}
            </div>
            <IonRange
              dualKnobs
              min={10}
              max={70}
              step={5}
              value={{ lower: localFilters.priceMin, upper: localFilters.priceMax }}
              onIonChange={(e) => {
                const value = e.detail.value as { lower: number; upper: number };
                setLocalFilters((prev) => ({
                  ...prev,
                  priceMin: value.lower,
                  priceMax: value.upper,
                }));
              }}
            />
          </div>

          {/* Gender */}
          <div className="filter-section">
            <h3 className="filter-section-title">Gender</h3>
            <div className="gender-buttons">
              <button
                className={`gender-button ${localFilters.gender === 'man' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('man')}
              >
                <span className="emoji">👨</span>
                <span>Man</span>
              </button>
              <button
                className={`gender-button ${localFilters.gender === 'woman' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('woman')}
              >
                <span className="emoji">👩</span>
                <span>Woman</span>
              </button>
            </div>
          </div>

          {/* Age Range */}
          <div className="filter-section">
            <h3 className="filter-section-title">Age</h3>
            <div className="range-display">
              {localFilters.ageMin} – {localFilters.ageMax}+
            </div>
            <IonRange
              dualKnobs
              min={22}
              max={55}
              step={1}
              value={{ lower: localFilters.ageMin, upper: localFilters.ageMax }}
              onIonChange={(e) => {
                const value = e.detail.value as { lower: number; upper: number };
                setLocalFilters((prev) => ({
                  ...prev,
                  ageMin: value.lower,
                  ageMax: value.upper,
                }));
              }}
            />
          </div>
        </div>

        <div className="filter-actions">
          <button className="clear-button" onClick={handleReset}>
            Clear all
          </button>
          <button className="show-button" onClick={handleApply}>
            Show ({totalResults})
          </button>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default FiltersModal;
