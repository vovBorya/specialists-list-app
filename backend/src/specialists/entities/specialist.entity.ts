import { Gender } from '../../common/enums/gender.enum';

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
  gender: Gender;
  age: number;
  availableSlots: string[];
}
