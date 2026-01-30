export interface Specialist {
  id: number;
  name: string;
  avatar: string;
  country: string;
  countryFlag: string;
  isVerified: boolean;
  isSuperSpecialist: boolean;
  price: number;
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

export interface SpecialistsResponse {
  items: Specialist[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SpecialistsQueryParams {
  page?: number;
  limit?: number;
  ageMin?: number;
  ageMax?: number;
  gender?: 'man' | 'woman';
  priceMin?: number;
  priceMax?: number;
}

export interface FiltersState {
  ageMin: number;
  ageMax: number;
  gender: 'man' | 'woman' | null;
  priceMin: number;
  priceMax: number;
}
