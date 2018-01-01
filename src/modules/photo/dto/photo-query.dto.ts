import { IsInt, IsNumberString, IsPositive, Min, IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class PhotoQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly skip?: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @IsPositive()
  readonly take?: number;

  @IsDateString()
  readonly fromDate: string;

  @IsDateString()
  readonly toDate: string;
}
