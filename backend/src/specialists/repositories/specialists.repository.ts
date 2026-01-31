import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { Specialist } from '../entities/specialist.entity';

@Injectable()
export class SpecialistsRepository implements OnModuleInit {
  private readonly logger = new Logger(SpecialistsRepository.name);
  private specialists: Specialist[] = [];
  private readonly dataPath = join(
    __dirname,
    '../../../data/specialists.json',
  );

  async onModuleInit(): Promise<void> {
    await this.loadSpecialists();
  }

  private async loadSpecialists(): Promise<void> {
    try {
      const rawData = await fs.readFile(this.dataPath, 'utf-8');
      this.specialists = JSON.parse(rawData);
      this.logger.log(`Loaded ${this.specialists.length} specialists`);
    } catch (error) {
      this.logger.error('Failed to load specialists data', error);
      throw new Error('Failed to initialize specialists data');
    }
  }

  findAll(): Specialist[] {
    return [...this.specialists];
  }

  findById(id: number): Specialist | undefined {
    return this.specialists.find((specialist) => specialist.id === id);
  }

  count(): number {
    return this.specialists.length;
  }
}
