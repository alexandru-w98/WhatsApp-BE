import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly socketService: SocketService) {}

  afterInit(server: Server) {
    this.socketService.server = server;
  }

  handleConnection(socket: Socket): void {
    this.socketService.onConnection(socket);
  }

  @SubscribeMessage('request-qr')
  handleRequestQr(socket: Socket): void {
    this.socketService.onRequestQr(socket);
  }

  @SubscribeMessage('update-socketId')
  async handleUpdateSocketId(socket: Socket, data) {
    const { token } = data;
    await this.socketService.onUpdateSocketId(socket, token);
  }
}
