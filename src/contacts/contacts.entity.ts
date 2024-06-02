import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Contacts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  contactId: number;
}
