import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn() id: number;

  @Column() imgLink: string;

  @Column() like: number;

  @Column() userId: string;

  @ManyToOne(type => User, user => user.photos)
  @JoinColumn({ name: 'userId' })
  user: User;
}
