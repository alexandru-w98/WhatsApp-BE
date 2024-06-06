import { Controller, Get, Post, Body } from '@nestjs/common';
import { OtpsService } from './otps.service';
import { Otps } from './otps.entity';

@Controller()
export class OtpsController {
  constructor(private readonly otpsService: OtpsService) {}

  @Get('/otps')
  async findAllCountries(): Promise<Otps[]> {
    const otps = await this.otpsService.findAll();
    return otps;
  }

  @Post('/otps/send')
  async sendOtp(@Body() reqBody) {
    const { socketId, phone } = reqBody;
    await this.otpsService.sendOtp(socketId, phone);

    return { ok: true };
  }

  @Post('/otps/verify')
  async verifyOtp(@Body() reqBody) {
    const { socketId, pin, phone } = reqBody;
    await this.otpsService.verifyOtp(socketId, pin, phone);

    return {
      valid: false,
    };
  }
}
