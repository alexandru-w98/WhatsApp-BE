import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/users')
  async findAllUsers(): Promise<Users[]> {
    const users = await this.userService.findAll();
    console.log('test', users);
    return users;
  }
}
