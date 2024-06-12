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

  @SubscribeMessage('message')
  async handleMessage(socket: Socket, data) {
    const { content, to, from } = data;
    await this.socketService.onMessage(socket, content, from, to);
  }

  @SubscribeMessage('message-delivered')
  async handleMessageDelivered(socket: Socket, data) {
    const { id } = data;
    await this.socketService.onMessageDelivered(id);
  }

  @SubscribeMessage('message-read')
  async handleMessageRead(socket: Socket, data) {
    const { to, from } = data;
    await this.socketService.onMessageRead(from, to);
  }

  @SubscribeMessage('message-delivered-all')
  async handleMessageDeliveredAll(socket: Socket, data) {
    const { to } = data;
    await this.socketService.onMessageDeliveredAll(to);
  }

  @SubscribeMessage('message-typing')
  async handleMessageTyping(socket: Socket, data) {
    const { from, to } = data;
    await this.socketService.onMessageTyping(from, to);
  }

  // VIDEO CALL
  @SubscribeMessage('videocall')
  async handleVideoCall(socket: Socket, data) {
    const { from, to, streamData } = data;
    await this.socketService.onVideoCall(from, to, streamData);
  }

  @SubscribeMessage('videocall-accepted')
  async handleVideoCallAnswer(socket: Socket, data) {
    const { from, streamData } = data;
    await this.socketService.onVideoCallAccepted(from, streamData);
  }
}
