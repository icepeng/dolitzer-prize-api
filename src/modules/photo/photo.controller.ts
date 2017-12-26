import { Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';

import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  public async getAll() {
    return this.photoService.findAll();
  }

  @Get('/:id')
  public async getOne(@Param('id') id: string) {
    const photo = this.photoService.findOne(id);
    if (!photo) {
      throw new NotFoundException();
    }
  }

  @Post('/:id/like')
  public async like(@Param('id') id: string) {
    return this.photoService.like(id);
  }
}
