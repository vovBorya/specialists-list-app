import { Injectable, NotFoundException } from '@nestjs/common';
import { SpecialistsRepository } from './repositories/specialists.repository';
import { SpecialistQueryDto } from './dto/specialist-query.dto';
import { Specialist } from './entities/specialist.entity';
import { PaginatedResponse } from '../common/interfaces/paginated-response.interface';
import { Gender } from '../common/enums/gender.enum';

interface SpecialistFilters {
  ageMin?: number;
  ageMax?: number;
  gender?: Gender;
  priceMin?: number;
  priceMax?: number;
}

@Injectable()
export class SpecialistsService {
  constructor(private readonly specialistsRepository: SpecialistsRepository) {}

  findAll(query: SpecialistQueryDto): PaginatedResponse<Specialist> {
    const { page, limit, ageMin, ageMax, gender, priceMin, priceMax } = query;

    const allSpecialists = this.specialistsRepository.findAll();
    const filtered = this.applyFilters(allSpecialists, {
      ageMin,
      ageMax,
      gender,
      priceMin,
      priceMax,
    });

    return this.paginate(filtered, page, limit);
  }

  findOne(id: number): Specialist {
    const specialist = this.specialistsRepository.findById(id);

    if (!specialist) {
      throw new NotFoundException(`Specialist with ID ${id} not found`);
    }

    return specialist;
  }

  private applyFilters(
    specialists: Specialist[],
    filters: SpecialistFilters,
  ): Specialist[] {
    const { ageMin, ageMax, gender, priceMin, priceMax } = filters;

    return specialists.filter((specialist) => {
      if (gender != null && specialist.gender !== gender) {
        return false;
      }

      if (ageMin != null && specialist.age < ageMin) {
        return false;
      }

      if (ageMax != null && specialist.age > ageMax) {
        return false;
      }

      if (priceMin != null && specialist.price < priceMin) {
        return false;
      }

      if (priceMax != null && specialist.price > priceMax) {
        return false;
      }

      return true;
    });
  }

  private paginate<T>(
    items: T[],
    page: number,
    limit: number,
  ): PaginatedResponse<T> {
    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedItems = items.slice(startIndex, startIndex + limit);

    return {
      items: paginatedItems,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}
