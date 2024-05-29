import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickName: string;

  @Column()
  phone: string;

  @Column()
  jwtToken: string;

  @Column()
  socketId: string;
}
