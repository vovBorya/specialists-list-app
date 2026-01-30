import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { SpecialistsQueryDto } from './dto/specialists-query.dto';
import {
  Specialist,
  SpecialistsResponse,
} from './interfaces/specialist.interface';

@Injectable()
export class SpecialistsService {
  private specialists: Specialist[];

  constructor() {
    this.loadSpecialists();
  }

  private loadSpecialists(): void {
    const dataPath = join(__dirname, '../../data/specialists.json');
    const rawData = readFileSync(dataPath, 'utf-8');
    this.specialists = JSON.parse(rawData);
  }

  findAll(query: SpecialistsQueryDto): SpecialistsResponse {
    const {
      page = 1,
      limit = 10,
      ageMin,
      ageMax,
      gender,
      priceMin,
      priceMax,
    } = query;

    // Filter specialists
    let filtered = [...this.specialists];

    if (gender) {
      filtered = filtered.filter((s) => s.gender === gender);
    }

    if (ageMin !== undefined) {
      filtered = filtered.filter((s) => s.age >= ageMin);
    }

    if (ageMax !== undefined) {
      filtered = filtered.filter((s) => s.age <= ageMax);
    }

    if (priceMin !== undefined) {
      filtered = filtered.filter((s) => s.priceUSD >= priceMin);
    }

    if (priceMax !== undefined) {
      filtered = filtered.filter((s) => s.priceUSD <= priceMax);
    }

    // Calculate pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Get paginated items
    const items = filtered.slice(startIndex, endIndex);

    return {
      items,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages,
    };
  }
}
