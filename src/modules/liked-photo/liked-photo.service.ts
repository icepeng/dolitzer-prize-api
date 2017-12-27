import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Photo } from '../photo/photo.entity';
import { User } from '../user/user.entity';

@Component()
export class LikedPhotoService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findLikedPhotos(id: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .relation('likedPhotos')
      .of(id)
      .loadMany();
  }

  async isLiked(user: User, photo: Photo) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.likedPhotos', 'likedPhotos')
      .where('user.id = :id', { id: user.id })
      .andWhere('likedPhotos.id = :photoId', { photoId: photo.id })
      .getOne()
      .then(res => !!res);
  }

  async like(user: User, photo: Photo) {
    // TODO: Transaction
    await this.userRepository.query(
      'UPDATE photo SET "like" = "like" + 1 WHERE id = $1',
      [photo.id],
    );
    return this.userRepository
      .createQueryBuilder('user')
      .relation('likedPhotos')
      .of(user)
      .add(photo);
  }

  async cancelLike(user: User, photo: Photo) {
    await this.userRepository.query(
      'UPDATE photo SET "like" = "like" - 1 WHERE id = $1',
      [photo.id],
    );
    return this.userRepository
      .createQueryBuilder('user')
      .relation('likedPhotos')
      .of(user)
      .remove(photo);
  }
}
