import { Controller, Get, Query } from '@nestjs/common';
import { SpecialistsService } from './specialists.service';
import { SpecialistsQueryDto } from './dto/specialists-query.dto';
import type { SpecialistsResponse } from './interfaces/specialist.interface';

@Controller('specialists')
export class SpecialistsController {
  constructor(private readonly specialistsService: SpecialistsService) {}

  @Get()
  findAll(@Query() query: SpecialistsQueryDto): SpecialistsResponse {
    // Convert string query params to numbers
    const parsedQuery: SpecialistsQueryDto = {
      page: query.page ? Number(query.page) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
      ageMin: query.ageMin ? Number(query.ageMin) : undefined,
      ageMax: query.ageMax ? Number(query.ageMax) : undefined,
      gender: query.gender,
      priceMin: query.priceMin ? Number(query.priceMin) : undefined,
      priceMax: query.priceMax ? Number(query.priceMax) : undefined,
    };

    return this.specialistsService.findAll(parsedQuery);
  }
}
