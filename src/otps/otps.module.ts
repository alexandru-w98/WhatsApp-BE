import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Otps } from './otps.entity';
import { OtpsService } from './otps.service';
import { OtpsController } from './otps.controller';
import { Users } from 'src/users/users.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Otps, Users]), AuthModule],
  providers: [OtpsService],
  controllers: [OtpsController],
  exports: [OtpsService],
})
export class OtpsModule {}
