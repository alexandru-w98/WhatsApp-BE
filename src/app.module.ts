// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { Countries } from './countries/countries.entity';
import { UsersModule } from './users/users.module';
import { SocketModule } from './sockets/socket.module';
import { CountriesModule } from './countries/countries.module';
import { Otps } from './otps/otps.entity';
import { OtpsModule } from './otps/otps.module';
import { AuthModule } from './auth/auth.module';
import APP_CREDENTIALS from './app.credentials';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...APP_CREDENTIALS.DB,
      entities: [Users, Countries, Otps],
    }),
    UsersModule,
    SocketModule,
    CountriesModule,
    OtpsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
