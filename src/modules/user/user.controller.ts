import { Controller, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAll() {
    return this.userService.findAll();
  }

  @Get('/:id/photos')
  public async getPhotos(@Param('id') id: string) {
    return this.userService.findPhotos(id);
  }
}
