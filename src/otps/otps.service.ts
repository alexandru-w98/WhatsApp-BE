import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Otps } from './otps.entity';
import { sendOtp, verifyOtp } from './otps.utils';
import { Users } from 'src/users/users.entity';
import { SocketService } from 'src/sockets/socket.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class OtpsService {
  constructor(
    @InjectRepository(Otps)
    private otpsRepository: Repository<Otps>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    private socketService: SocketService,
    private authService: AuthService,
  ) {}

  findAll(): Promise<Otps[]> {
    return this.otpsRepository.find();
  }

  async sendOtp(socketId, phone) {
    const otpResponse = await sendOtp({ phone });
    const { pinId } = await otpResponse.json();

    const otpEntry = {
      pinId,
      phone,
      socketId,
    };

    this.otpsRepository.save(otpEntry);
  }

  async verifyOtp(socketId, pin, phone) {
    const otp = await this.otpsRepository.findOneBy({ socketId });
    const verifyResponse = await verifyOtp({ pin, pinId: otp.pinId });
    const jsonResponse = await verifyResponse.json();

    if (!jsonResponse.verified) {
      return false;
    }

    const user = await this.usersRepository.findOneBy({ phone });

    const jwtToken = await this.authService.signToken({ phone });

    if (user) {
      await this.usersRepository.update(
        { id: user.id },
        {
          jwtToken,
          socketId,
        },
      );
    } else {
      await this.usersRepository.save({
        phone,
        socketId,
        jwtToken,
      });
    }

    await this.otpsRepository.delete({ phone });

    this.socketService.server.to(socketId).emit('enable-login', {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjQwNzI0NjQwMzI0IiwiaWF0IjoxNzE2OTA1OTY0fQ.5xkvWtu1iUGH8F6dhDjknnFaouf7Y2nwDVuxY5SVmT0',
    });

    return true;
  }
}
