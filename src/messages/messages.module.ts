import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { Messages } from './messages.entity';
import { MessagesService } from './messages.services';
import { MessagesController } from './messages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Messages]), AuthModule],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export class MessagesModule {}
