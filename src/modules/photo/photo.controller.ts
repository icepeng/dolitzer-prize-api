import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { Auth } from '../common/auth.decorator';
import { User } from '../user/user.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { PhotoService } from './photo.service';

@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  public async getAll() {
    return this.photoService.findAll();
  }

  @Get('/:id')
  public async getOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    const photo = await this.photoService.findOne(id);
    if (!photo) {
      throw new NotFoundException();
    }

    return photo;
  }

  @Post()
  public async create(
    @Body() createPhotoDto: CreatePhotoDto,
    @Auth() user: User,
  ) {
    const photo = await this.photoService.create(createPhotoDto, user);
    return { id: photo.id };
  }

  @Delete('/:id')
  public async remove(
    @Param('id', new ParseIntPipe())
    id: number,
    @Auth() user: User,
  ) {
    const photo = await this.photoService.findOne(id);
    if (!photo) {
      throw new NotFoundException();
    }

    if (photo.user.id !== user.id) {
      throw new BadRequestException();
    }

    return this.photoService.remove(photo);
  }
}
