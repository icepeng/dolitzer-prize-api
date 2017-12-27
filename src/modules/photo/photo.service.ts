import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './photo.entity';

@Component()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async findAll() {
    return this.photoRepository.find({ relations: ['user'] });
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
