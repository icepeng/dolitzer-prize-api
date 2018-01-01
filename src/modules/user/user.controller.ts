import { Controller, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  public async getOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('/:id/photos')
  public async getPhotos(@Param('id') id: string) {
    return this.userService.findPhotos(id);
  }
}
