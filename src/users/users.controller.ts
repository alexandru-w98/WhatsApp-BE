import { Controller, Get, Req } from '@nestjs/common';
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

  @Get('/user-profile')
  async findUserById(@Req() request) {
    const { authToken } = request.cookies;
    const profile = await this.userService.getUserProfile(authToken);
    return profile;
  }
}
