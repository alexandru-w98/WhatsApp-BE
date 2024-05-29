import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async verifyToken(token) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);

      return decoded;
    } catch {
      return null;
    }
  }

  async signToken(info) {
    const jwtToken = await this.jwtService.signAsync(info);

    return jwtToken;
  }
}
