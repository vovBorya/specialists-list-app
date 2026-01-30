export class SpecialistsQueryDto {
  page?: number;
  limit?: number;
  ageMin?: number;
  ageMax?: number;
  gender?: 'man' | 'woman';
  priceMin?: number;
  priceMax?: number;
}
