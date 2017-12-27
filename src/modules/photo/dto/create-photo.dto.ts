import { IsString, IsUrl, MaxLength } from 'class-validator';

export class CreatePhotoDto {
  @IsUrl() readonly imgLink: string;

  @IsString()
  @MaxLength(255)
  readonly title: string;
}
