import { Photo } from '../photo/photo.entity';
import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn() id: string;

  @Column() battletag: string;

  @OneToMany(type => Photo, photo => photo.user)
  photos: Photo[];
}
