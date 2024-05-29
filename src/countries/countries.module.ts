import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Countries } from './countries.entity';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Countries])],
  providers: [CountriesService],
  controllers: [CountriesController],
  exports: [CountriesService],
})
export class CountriesModule {}
