export interface Specialist {
  id: number;
  name: string;
  avatar: string;
  country: string;
  countryFlag: string;
  isVerified: boolean;
  isSuperSpecialist: boolean;
  priceUSD: number;
  sessionDuration: number;
  rating: number;
  reviewsCount: number;
  description: string;
  yearsOfExperience: number;
  clientsCount: number;
  sessionsCount: number;
  gender: 'man' | 'woman';
  age: number;
  availableSlots: string[];
}
