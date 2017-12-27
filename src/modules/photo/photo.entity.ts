import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @Column() imgLink: string;

  @Column() like: number;

  @ManyToMany(type => User, user => user.likedPhotos)
  @JoinTable()
  likedUsers: User[];

  @ManyToOne(type => User, user => user.photos)
  @JoinColumn()
  user: User;
}
