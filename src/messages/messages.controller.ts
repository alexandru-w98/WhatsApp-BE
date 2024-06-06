import { Controller, Get, Query } from '@nestjs/common';
import { MessagesService } from './messages.services';

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('/messages')
  async findAllMessages(@Query() queryParams) {
    const { to, from } = queryParams;
    const messages = await this.messagesService.findAllByUsersIds(from, to);
    return messages;
  }
}
