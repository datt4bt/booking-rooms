import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  IsArray,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

export class ImagesDto {
  @IsString()
  path: string;
}

class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsString()
  @IsNotEmpty()
  public type!: string;

  @IsString()
  @IsNotEmpty()
  public description!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagesDto)
  images: ImagesDto[];

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  public price!: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  public quantity!: number;
}

export default CreateRoomDto;
