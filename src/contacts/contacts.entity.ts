import { Users } from 'src/users/users.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Contacts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  contactId: number;

  @ManyToOne(() => Users, (x) => x.userInfo)
  @JoinColumn({
    name: 'contactId',
  })
  contactInfo: Users;
}
