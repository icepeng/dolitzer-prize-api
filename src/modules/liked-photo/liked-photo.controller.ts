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
import { PhotoService } from '../photo/photo.service';
import { User } from '../user/user.entity';
import { CreateLikedPhotoDto } from './dto/create-liked-photo.dto';
import { LikedPhotoService } from './liked-photo.service';

@Controller('users/:userId/liked-photos')
export class LikedPhotoController {
  constructor(
    private readonly likedPhotoService: LikedPhotoService,
    private readonly photoService: PhotoService,
  ) {}

  @Get()
  public async getLikedPhotos(@Param('userId') userId: string) {
    return this.likedPhotoService.findLikedPhotos(userId);
  }

  @Post()
  public async like(
    @Param('userId') userId: string,
    @Auth() user: User,
    @Body() createLikedPhotoDto: CreateLikedPhotoDto,
  ) {
    const photo = await this.photoService.findOne(createLikedPhotoDto.id);
    if (!photo) {
      throw new BadRequestException();
    }

    if (user.id !== userId) {
      throw new BadRequestException();
    }

    const isLiked = await this.likedPhotoService.isLiked(user, photo);
    if (isLiked) {
      throw new BadRequestException('이미 추천한 사진입니다.');
    }

    if (photo.user.id === user.id) {
      throw new BadRequestException('자신의 사진은 추천할 수 없습니다.');
    }

    await this.likedPhotoService.like(user, photo);
    return {
      message: 'Success',
    };
  }

  @Delete('/:id')
  public async cancelLike(
    @Param('userId') userId: string,
    @Param('id', new ParseIntPipe())
    id: number,
    @Auth() user: User,
  ) {
    const photo = await this.photoService.findOne(id);
    if (!photo) {
      throw new NotFoundException();
    }

    if (user.id !== userId) {
      throw new BadRequestException();
    }

    const isLiked = await this.likedPhotoService.isLiked(user, photo);
    if (!isLiked) {
      throw new BadRequestException();
    }

    await this.likedPhotoService.cancelLike(user, photo);
    return {
      message: 'Success',
    };
  }
}
