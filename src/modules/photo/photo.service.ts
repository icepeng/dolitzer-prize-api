import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Photo } from './photo.entity';

@Component()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async findAll() {
    return this.photoRepository.find();
  }

  async findOne(id: string) {
    return this.photoRepository.findOne(id);
  }

  async like(id: string) {
    return this.photoRepository.query(
      'UPDATE photo SET like = like + 1 WHERE id = $1',
      [id],
    );
  }
}
