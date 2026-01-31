import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { SpecialistsService } from './specialists.service';
import { SpecialistQueryDto } from './dto/specialist-query.dto';
import type { Specialist } from './entities/specialist.entity';
import type { PaginatedResponse } from '../common/interfaces/paginated-response.interface';

@Controller('specialists')
export class SpecialistsController {
  constructor(private readonly specialistsService: SpecialistsService) {}

  @Get()
  findAll(@Query() query: SpecialistQueryDto): PaginatedResponse<Specialist> {
    return this.specialistsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Specialist {
    return this.specialistsService.findOne(id);
  }
}
