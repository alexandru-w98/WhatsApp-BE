import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import isNotEmptyOrNil from '../utils/is-not-empty-or-nil';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth/verify')
  async verifyAuthToken(@Req() request) {
    const { authToken } = request.cookies;
    const decodedToken = await this.authService.verifyToken(authToken);

    return { valid: isNotEmptyOrNil(decodedToken) };
  }
}
