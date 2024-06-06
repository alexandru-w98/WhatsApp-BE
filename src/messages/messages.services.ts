import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Messages } from './messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private messagesRepository: Repository<Messages>,
  ) {}

  async findAll() {
    return await this.messagesRepository.find();
  }

  async findAllByUsersIds(from, to) {
    return await this.messagesRepository.find({
      where: {
        from: In([from, to]),
        to: In([from, to]),
      },
      order: {
        id: 'DESC',
      },
    });
  }
}
