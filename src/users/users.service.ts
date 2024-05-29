import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }
}
