import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { isNil } from 'ramda';

@Injectable()
export class SocketService {
  public server: Server = null;
  private readonly connectedClients: Map<string, Socket> = new Map();

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

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
}
