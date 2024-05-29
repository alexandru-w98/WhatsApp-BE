import { Controller, Get } from '@nestjs/common';
import { Countries } from './countries.entity';
import { CountriesService } from './countries.service';

@Controller()
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('/countries')
  async findAllCountries(): Promise<Countries[]> {
    const countries = await this.countriesService.findAll();
    return countries;
  }
}
