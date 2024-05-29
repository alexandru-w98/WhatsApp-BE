import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Countries } from './countries.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Countries)
    private countriesRepository: Repository<Countries>,
  ) {}

  findAll(): Promise<Countries[]> {
    return this.countriesRepository.find();
  }
}
