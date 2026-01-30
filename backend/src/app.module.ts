import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpecialistsModule } from './specialists/specialists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SpecialistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
