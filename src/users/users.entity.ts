import { Contacts } from 'src/contacts/contacts.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  JoinColumn,
} from 'typeorm';

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

  @OneToMany(() => Contacts, (x) => x.contactInfo)
  @JoinColumn({
    name: 'id',
  })
  userInfo: Contacts[];
}
