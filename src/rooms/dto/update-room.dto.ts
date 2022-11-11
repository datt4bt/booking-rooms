import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  Min,
  IsArray,
  IsOptional,
  ValidateNested
} from 'class-validator';
import { ImagesDto } from './create-room.dto';

export class UpdateRoomDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsOptional()
  public type?: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ImagesDto)
  images?: ImagesDto[];

  @IsNumber()
  @IsOptional()
  @Min(0)
  public price?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  public quantity?: number;
}
