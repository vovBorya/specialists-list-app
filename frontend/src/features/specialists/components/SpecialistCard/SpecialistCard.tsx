import { memo } from 'react';
import { IonCard, IonIcon } from '@ionic/react';
import { star } from 'ionicons/icons';

import { Icon, Text } from '@/shared/ui';
import type { Specialist } from '../../types';
import styles from './SpecialistCard.module.css';

interface SpecialistCardProps {
  specialist: Specialist;
}

export const SpecialistCard = memo(function SpecialistCard({ specialist }: SpecialistCardProps) {
  return (
    <IonCard className={styles.specialistCard}>
      <div className={styles.specialistCardContent}>
        <div className={styles.specialistHeader}>
          <div className={styles.specialistAvatar}>
            <img src={specialist.avatar} alt={specialist.name} />
          </div>
          <div className={styles.specialistInfo}>
            <div className={styles.specialistNameRow}>
              <Text as="h3" size="lg" weight="semibold" className={styles.specialistName}>
                {specialist.name} {specialist.countryFlag}
                {specialist.isVerified && (
                  <Icon size={16} name="shieldAndCheck" color="var(--color-success)" />
                )}
              </Text>
              <button className={styles.favoriteBtn} aria-label="Add to favorites">
                <Icon size={24} name="heartOutline" />
              </button>
            </div>
            {specialist.isSuperSpecialist && (
              <Text as="span" size="sm" weight="semibold" className={styles.superSpecialistBadge}>
                <span role="img" aria-label="trophy">
                  🏆
                </span>
                Super Specialist
              </Text>
            )}
            <div className={styles.specialistPricing}>
              <Text as="span" size="lg" weight="semibold" className={styles.price}>
                {specialist.price} ₴
              </Text>

              <Text
                as="span"
                size="lg"
                weight="semibold"
                color="secondary"
                className={styles.rating}
              >
                <IonIcon icon={star} className={styles.starIcon} />
                {specialist.rating.toFixed(1)}
              </Text>

              <Text as="span" size="md" color="muted" className={styles.duration}>
                {specialist.sessionDuration} min
              </Text>

              <Text as="span" size="md" color="muted" className={styles.reviews}>
                {specialist.reviewsCount.toLocaleString()} reviews
              </Text>
            </div>
          </div>
        </div>

        <p className={styles.specialistDescription}>{specialist.description}</p>

        <div className={styles.specialistStats}>
          <span className={styles.stat}>
            <Icon size={12} name="portfolio" color="var(--color-text-secondary)" />
            {specialist.yearsOfExperience} years of experience
          </span>
        </div>

        <div className={styles.specialistClients}>
          <Icon size={12} name="person" color="var(--color-text-secondary)" />
          <Text as="span" size="sm" color="muted">
            {specialist.clientsCount} clients • {specialist.sessionsCount} sessions
          </Text>
        </div>

        <div className={styles.availableSlots}>
          {specialist.availableSlots.slice(0, 3).map((slot, index) => (
            <span key={index} className={styles.slotChip}>
              {slot}
            </span>
          ))}
        </div>
      </div>
    </IonCard>
  );
});
