import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/users')
  async findAllUsers(): Promise<Users[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @Get('/users/:id')
  async findUserById(@Param() pathParams) {
    const { id } = pathParams;
    const user = await this.userService.findById(id);
    return user;
  }
}
