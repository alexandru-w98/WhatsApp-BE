import { Module, Global } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Messages } from 'src/messages/messages.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Users, Messages]), AuthModule],
  providers: [SocketService, SocketGateway],
  exports: [SocketService],
})
export class SocketModule {}
