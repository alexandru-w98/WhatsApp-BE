import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Otps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  pinId: string;

  @Column()
  socketId: string;
}
