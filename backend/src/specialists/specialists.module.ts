import { Module } from '@nestjs/common';
import { SpecialistsController } from './specialists.controller';
import { SpecialistsService } from './specialists.service';
import { SpecialistsRepository } from './repositories/specialists.repository';

@Module({
  controllers: [SpecialistsController],
  providers: [SpecialistsService, SpecialistsRepository],
  exports: [SpecialistsService],
})
export class SpecialistsModule {}
