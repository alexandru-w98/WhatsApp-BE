import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: number;

  @Column()
  to: number;

  @Column()
  content: string;

  @Column()
  createdAt: string;

  @Column()
  status: string;
}
