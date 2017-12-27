import { Photo } from '../photo/photo.entity';
import { Column, Entity, PrimaryColumn, OneToMany, ManyToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn() id: string;

  @Column() battletag: string;

  @OneToMany(type => Photo, photo => photo.user)
  photos: Photo[];

  @ManyToMany(type => Photo, photo => photo.likedUsers)
  likedPhotos: Photo[];
}
