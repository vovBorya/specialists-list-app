import { IsOptional, IsNumber, IsString, Min, Max } from 'class-validator';

export class GetSpecialistsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsNumber()
  @Min(18)
  ageMin?: number;

  @IsOptional()
  @IsNumber()
  @Max(100)
  ageMax?: number;

  @IsOptional()
  @IsString()
  gender?: 'man' | 'woman';

  @IsOptional()
  @IsNumber()
  @Min(0)
  priceMin?: number;

  @IsOptional()
  @IsNumber()
  priceMax?: number;
}

export class SpecialistsResponseDto {
  items: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
