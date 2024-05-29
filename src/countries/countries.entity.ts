import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Countries {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  countryCode: string;

  @Column()
  phoneCode: string;
}
