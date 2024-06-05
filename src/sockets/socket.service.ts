// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { isNil, prop } from 'ramda';
import { Messages } from 'src/messages/messages.entity';

@Injectable()
export class SocketService {
  public server: Server = null;
  private readonly connectedClients: Map<string, Socket> = new Map();

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    @InjectRepository(Messages)
    private messagesRepository: Repository<Messages>,

    private authService: AuthService,
  ) {}

  onConnection(socket: Socket): void {
    const { id: socketId } = socket;

    this.connectedClients.set(socketId, socket);

    console.log(`⚡: User ${socket.id} just connected!`);

    socket.on('disconnect', () => {
      console.log(`🔥: User ${socket.id} disconnected`);
    });
  }

  onRequestQr(socket: Socket): void {
    this.server.to(socket.id).emit('qr-update', { qrToken: socket.id });
  }

  async onUpdateSocketId(socket: Socket, token) {
    if (token) {
      try {
        const { phone } = await this.authService.verifyToken(token);

        const user = await this.usersRepository.findOneBy({ phone });

        if (isNil(user)) {
          return;
        }

        await this.usersRepository.update(
          { id: user.id },
          {
            phone,
            socketId: socket.id,
          },
        );
      } catch (err) {}
    }
  }

  async onMessage(socket: Socket, content, from, to) {
    const newMessage = {
      from,
      to,
      content,
      // todo: convert to user locale on fe?
      createdAt: new Date().getTime().toString(),
      status: 'SENT',
    };

    const addedMessage = await this.messagesRepository.save(newMessage);

    const { socketId: toSocketId } = await this.usersRepository.findOneBy({
      id: to,
    });
    const { socketId: fromSocketId } = await this.usersRepository.findOneBy({
      id: from,
    });

    this.server.to(fromSocketId).emit('message-sent', addedMessage);
    this.server.to(toSocketId).emit('message-received', addedMessage);
  }

  async onMessageDelivered(id) {
    const { affected } = await this.messagesRepository.update(
      { id },
      {
        status: 'DELIVERED',
      },
    );

    if (affected) {
      const updatedRecord = await this.messagesRepository.findOneBy({ id });
      const { socketId } = await this.usersRepository.findOneBy({
        id: prop('from')(updatedRecord),
      });

      this.server.to(socketId).emit('message-delivered', updatedRecord);
    }
  }

  async onMessageRead(from, to) {
    await this.messagesRepository.update(
      { from: In([from, to]), to: In([from, to]) },
      {
        status: 'READ',
      },
    );

    const { socketId } = await this.usersRepository.findOneBy({
      id: from,
    });

    this.server.to(socketId).emit('message-read', {});
  }
}
