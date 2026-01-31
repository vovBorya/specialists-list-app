import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SpecialistsModule } from './specialists/specialists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SpecialistsModule,
  ],
})
export class AppModule {}
