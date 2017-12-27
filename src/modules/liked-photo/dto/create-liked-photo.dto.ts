import { IsNumber } from 'class-validator';

export class CreateLikedPhotoDto {
  @IsNumber() readonly id: number;
}
