import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    private authService: AuthService,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find({
      relations: {
        contacts: true,
      },
    });
  }

  async findById(id) {
    return await this.usersRepository.find({
      relations: {
        contacts: true,
      },
      where: { id },
    });
  }

  async getUserProfile(token) {
    const { phone } = await this.authService.verifyToken(token);

    return await this.usersRepository.findOne({
      relations: {
        contacts: true,
      },
      where: { phone },
    });
  }
}
