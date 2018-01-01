import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { PhotoQueryDto } from './dto/photo-query.dto';
import { Photo } from './photo.entity';

@Component()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async findAll(query: PhotoQueryDto) {
    return this.photoRepository
      .createQueryBuilder('photo')
      .leftJoinAndSelect('photo.user', 'user')
      .where('photo.createTime >= :fromDate', { fromDate: query.fromDate })
      .andWhere('photo.createTime <= :toDate', { toDate: query.toDate })
      .skip(query.skip)
      .take(query.take)
      .orderBy('photo.createTime', 'DESC')
      .getMany();
  }

  async findOne(id: number) {
    return this.photoRepository.findOne(id, { relations: ['user'] });
  }

  async create(createPhotoDto: CreatePhotoDto, user: User) {
    const Photo = this.photoRepository.create({
      user,
      like: 0,
      ...createPhotoDto,
    });
    return this.photoRepository.save(Photo);
  }

  async remove(photo: Photo) {
    return this.photoRepository.remove(photo);
  }
}
