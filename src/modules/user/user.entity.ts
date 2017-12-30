import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { Photo } from '../photo/photo.entity';

@Entity()
export class User {
  @PrimaryColumn() id: string;

  @CreateDateColumn() createTime: string;

  @Column() battletag: string;

  @OneToMany(type => Photo, photo => photo.user)
  photos: Photo[];

  @ManyToMany(type => Photo, photo => photo.likedUsers)
  likedPhotos: Photo[];
}
