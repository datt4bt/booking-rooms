import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  IsArray,
  ValidateNested,
  IsDateString,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate
} from 'class-validator';
import { Type } from 'class-transformer';

export class BookDetailDto {
  @IsString()
  @IsNotEmpty()
  room_id: number;

  @IsDateString()
  @IsNotEmpty()
  from_date: Date;

  @IsDateString()
  @IsNotEmpty()
  to_date: Date;
}

export class CreateBookingDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookDetailDto)
  data: BookDetailDto[];
}
