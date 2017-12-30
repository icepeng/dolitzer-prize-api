import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { Secret } from '../../../secrets/secret';
import { User } from '../user/user.entity';

@Component()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createToken(user: { id: string; battletag: string }) {
    const expiresIn = 60 * 60 * 4;
    const info = { id: user.id, battletag: user.battletag };
    const token = jwt.sign(info, Secret.jwtSecret, { expiresIn });
    return token;
  }

  async validateUser(user: { id: string; battletag: string; }) {
    return this.userRepository.findOne(user.id);
  }
}
