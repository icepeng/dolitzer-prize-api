import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { Secret } from '../../../secrets/secret';
import { User } from './user.entity';

@Component()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async saveUser(info: { id: string; battletag: string }) {
    return this.userRepository.save({
      id: info.id,
      battletag: info.battletag,
    });
  }

  async findAll() {
    return this.userRepository.find();
  }
}
