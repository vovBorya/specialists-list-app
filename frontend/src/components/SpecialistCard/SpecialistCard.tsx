import React from 'react';
import { IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { heartOutline, checkmarkCircle, star } from 'ionicons/icons';
import type { Specialist } from '../../types/specialist';
import './SpecialistCard.css';

interface SpecialistCardProps {
  specialist: Specialist;
}

const SpecialistCard: React.FC<SpecialistCardProps> = ({ specialist }) => {
  return (
    <IonCard className="specialist-card">
      <IonCardContent className="specialist-card-content">
        <div className="specialist-header">
          <div className="specialist-avatar">
            <img src={specialist.avatar} alt={specialist.name} />
          </div>
          <div className="specialist-info">
            <div className="specialist-name-row">
              <h3 className="specialist-name">
                {specialist.name} {specialist.countryFlag}
                {specialist.isVerified && (
                  <IonIcon icon={checkmarkCircle} className="verified-icon" />
                )}
              </h3>
              <button className="favorite-btn" aria-label="Add to favorites">
                <IonIcon icon={heartOutline} />
              </button>
            </div>
            {specialist.isSuperSpecialist && (
              <span className="super-specialist-badge">
                <span role="img" aria-label="trophy">🏆</span> Super Specialist
              </span>
            )}
            <div className="specialist-pricing">
              <span className="price">${specialist.priceUSD} USD</span>
              <span className="duration">{specialist.sessionDuration} min</span>
              <span className="rating">
                <IonIcon icon={star} className="star-icon" />
                {specialist.rating.toFixed(1)}
              </span>
              <span className="reviews">{specialist.reviewsCount.toLocaleString()} reviews</span>
            </div>
          </div>
        </div>

        <p className="specialist-description">{specialist.description}</p>

        <div className="specialist-stats">
          <span className="stat">
            <span role="img" aria-label="briefcase">💼</span> {specialist.yearsOfExperience} years of experience
          </span>
        </div>

        <div className="specialist-clients">
          <span role="img" aria-label="person">👤</span> {specialist.clientsCount} clients • {specialist.sessionsCount} sessions
        </div>

        <div className="available-slots">
          {specialist.availableSlots.slice(0, 3).map((slot, index) => (
            <span key={index} className="slot-chip">
              {slot}
            </span>
          ))}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default SpecialistCard;
